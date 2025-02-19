import { addDialogue } from "../redux/states/dialogue"
import { setReplyIsLoading } from "../redux/states/replyIsLoading"
import { useSelector, useDispatch } from "react-redux"
import { addMessageToDialogue } from "../redux/states/dialogue"
import { changeTranslation } from "../redux/states/dialogue"
import { languages } from "../utils/languages"
import { setError } from "../redux/states/error"
import { useState } from "react"

export default function usehttpRequest(){
    const [count, setCount] = useState(0)
    const dialogue = useSelector((state => state.dialogue.value))
    const error = useSelector((state => state.error.value))
    const dispatch = useDispatch()

    async function summarizeText(query ="This is the summary",id,summarized) {
      // if ('ai' in self && 'summarizer' in self.ai) {
      //   console.log("The Summarizer API is supported.")
      // }else{
      //   console.log("The Summarizer API is not supported on your device")
      // }


      if(summarized){
        return
      }else{
        dispatch(addMessageToDialogue({index:id, payload:{id:`${id}c`, author:'ai', message:"Summary", time:"100"}}))
        console.log(dialogue)
      }
    }

    const detectLanguage = async(query, setDetectedLanguage) =>{
      if ('ai' in self && 'languageDetector' in self.ai) {
        const languageDetectorCapabilities = await self.ai.languageDetector.capabilities()
        const canDetect = languageDetectorCapabilities.capabilities
        let detector;

        if(1 == 1){
          detector = await self.ai.languageDetector.create()
          const results = await detector.detect(query) 
          const suspectedLanguage = results[0]
          console.log(suspectedLanguage)

          if(suspectedLanguage.confidence < 0.6){
            setDetectedLanguage('uncertain' + suspectedLanguage.detectedLanguage)
          }else{
            const langCode = suspectedLanguage.detectedLanguage
            setDetectedLanguage(languages[langCode] ?? langCode)
          }
        }else{
          dispatch(setError([...error, {id:error.length, message: "Language detector not found"}]))
        }
      }else{
        dispatch(setError([...error, {id: error.length, message:"Language detection is unavailable on this device"}]))
        return
      }
    }


    const translateLanguage = async (query, id, translated) => {
      setCount(prev => prev + 1)

      if ('ai' in self && 'translator' in self.ai) {
        console.log("The translator API is supported.");
        
        const translatorCapabilities = await self.ai.translator.capabilities();
        const canTranslate = translatorCapabilities.languagePairAvailable("en","es");

        if (canTranslate === "no") {
          dispatch(setError([...error, { id:error.length, message: "The language pair is not yet supported" }]));
          console.log("Language pair not yet supported");
          return;
        } else if (canTranslate === "after-download") {
          dispatch(setError([...error, { id:error.length, message: "The language pair is not yet supported" }]));
          console.log("Waiting for download...");
          return;
        } else if (canTranslate === "readily") {
          const translator = await self.ai.translator.create({ sourceLanguage:"en", targetLanguage:"es" });
          const translatedText = await translator.translate("hello");
          console.log(translatedText)

          if(!translated){
            dispatch(addMessageToDialogue({index:id, payload:{id:`${id}b`, author:'ai', message: translatedText, time:"100"}}))
            console.log(dialogue)
          }else{
            dispatch(changeTranslation({index:id, payload:{id:`${id}b`, author:'ai', message:"changedMessage", time:"100"}}))
            console.log(dialogue)
          }
        }
      } else {
        dispatch(setError([...error, { id:error.length, message: "The Translator API is not supported on your device" }]));
        console.log("The translator API is not supported on your device");
      }
    };
    

    const detectDownload = async() =>{
      const summarizer = await ai.summarizer.create({
        monitor(m) {
          m.addEventListener('downloadprogress', (e) => {
            console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
          });
        }
      });
    }


  return{detectLanguage, summarizeText, detectDownload, translateLanguage}
}