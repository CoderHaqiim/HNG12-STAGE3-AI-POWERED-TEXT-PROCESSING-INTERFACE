import { addDialogue } from "../redux/states/dialogue"
import { setReplyIsLoading } from "../redux/states/replyIsLoading"
import { useSelector, useDispatch } from "react-redux"
import { languages } from "../utils/languages"
import { setError } from "../redux/states/error"

export default function usehttpRequest(){
    const dialogue = useSelector((state => state.dialogue.value))
    const error = useSelector((state => state.error.value))
    const dispatch = useDispatch()

    async function summarizeText(text) {
      if ('ai' in self && 'summarizer' in self.ai) {
        console.log("The Summarizer API is supported.")
      }else{
        console.log("The Summarizer API is not supported on your device")
      }
    }

    const detectLanguage = async(query, setDetectedLanguage) =>{
      if ('ai' in self && 'languageDetector' in self.ai) {
        console.log('language detection is supported')
        const languageDetectorCapabilities = await self.ai.languageDetector.capabilities()
        const canDetect = languageDetectorCapabilities.capabilities?.supported
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
        dispatch(setError([...error, {id: error.length, message:"Language detector unavailable on this device"}]))
        return
      }
    }


    const translateLanguage = async (query, sourceLanguage = "en", targetLanguage = "fr") => {
      if ('ai' in self && 'translator' in self.ai) {
        console.log("The translator API is supported.");
        
        const translatorCapabilities = await self.ai.translator.capabilities();
        const canTranslate = translatorCapabilities.languagePairAvailable(sourceLanguage, targetLanguage);

        // if (canTranslate === "no") {
        //   dispatch(setError([...error, { id:error.length, message: "The language pair is not yet supported" }]));
        //   console.log("Language pair not yet supported");
        //   return;
        // } else if (canTranslate === "after-download") {
        //   dispatch(setError([...error, { id:error.length, message: "The language pair is not yet supported" }]));
        //   console.log("Waiting for download...");
        //   return;
        // } else 
        if ( 1 === 1) {
          const translator = await self.ai.translator.create({ sourceLanguage, targetLanguage });
          const translatedText = await translator.translate(query);
          console.log("Translated Text:", translatedText);
          return translatedText;
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