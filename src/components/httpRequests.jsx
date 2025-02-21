import { useSelector, useDispatch } from "react-redux"
import { addMessageToDialogue } from "../redux/states/dialogue"
import { changeTranslation } from "../redux/states/dialogue"
import { setError } from "../redux/states/error"
import { setReplyIsLoading } from "../redux/states/replyIsLoading"
import { setPair } from "../redux/states/translatePair"
import { languages } from "../utils/languages"

export default function usehttpRequests(){
    const dialogue = useSelector((state => state.dialogue.value))
    const error = useSelector((state => state.error.value))
    const dispatch = useDispatch()


    // summary logic
    async function summarizeText(query,id,summarized) {
      const options = {
        sharedContext:'This article is intended for a tech-savvy audience.',
        type: 'key-points',
        format: 'plain-text',
        length: 'medium',
      };

      try{
        if ('ai' in self && 'summarizer' in self.ai) {
          const summaizerAvailable = (await self.ai.summarizer.capabilities()).available
          let summarizer;
  
          if (summaizerAvailable === 'no') {
            dispatch(setError([...error, {id: error.length, message:"The summarizer API is not permitted on your device"}]))
            return;
          }else if (summaizerAvailable === 'readily') {
            if(summarized){
              dispatch(setError([...error, {id: error.length, message: "Text has already been summarized"}]))
            }else{
              summarizer = await self.ai.summarizer.create(options);
  
              const summary = await summarizer.summarize(query, {
                context: 'This article is intended for a tech-savvy audience.',
              });

              dispatch(addMessageToDialogue({index:id, payload:{id:`${id}c`, author:'ai', message:summary, type:"summary"}}))
            }
          } else {
            dispatch(setError([...error, {id: error.length, message: "The summarizer API needs to be downloaded on your device"}]))
            return
          }
        }else{
          dispatch(setError([...error, {id: error.length, message:"The summarizer API is not supported on your device"}]))
        }
      }
      catch(error){
        dispatch(setError([...error, {id: error.length, message:error?.message}]))
      }
      finally{
        setTimeout(()=>{dispatch(setError([]))},3000)
        dispatch(setReplyIsLoading(false))
      }
    }


    //language detection logic
    const detectLanguage = async(query, setDetectedLanguage) =>{
      try{
        if ('ai' in self && 'languageDetector' in self.ai) {
          const languageDetectorCapabilities = await self.ai.languageDetector.capabilities()
          const canDetect = languageDetectorCapabilities.available
          let detector;
  
          if( canDetect === 'readily'){
            detector = await self.ai.languageDetector.create()
            const results = await detector.detect(query) 
            const suspectedLanguage = results[0]
  
            if(suspectedLanguage.confidence < 0.6){
              setDetectedLanguage('uncertain')
            }else{
              const langCode = suspectedLanguage.detectedLanguage
              setDetectedLanguage(langCode)
            }
          }else if(canDetect === 'after-download'){
            dispatch(setError([...error, {id:error.length, message: "Language detector model needs to be downloaded"}]))
            return
          }else{
            dispatch(setError([...error, {id:error.length, message: "Language detector not found"}]))
          }
        }else{
          dispatch(setError([...error, {id: error.length, message:"Language detection is unavailable on this device"}]))
          return
        }
      }
      catch(error){
        dispatch(setError([...error, {id: error.length, message:error.message}]))
      }
      finally{
        setTimeout(()=>{dispatch(setError([]))},3000)
        dispatch(setReplyIsLoading(false))
      }
    }



//translation logic
    const translateLanguage = async (query, id, translated, setTranslated, targetLanguage, detectedLanguage) => {
      try{
        if ('ai' in self && 'translator' in self.ai) {

          if(!detectedLanguage){
            dispatch(setError([...error, { id:error.length, message: "Language detector must be available for translator to function" }]));
            return
          }

          if(detectedLanguage === 'uncertain'){
            dispatch(setError([...error, { id:error.length, message: "Can't translate text because language was not detected" }]));
            return
          }

          const translatorCapabilities = await self.ai.translator.capabilities();
          const canTranslate = await translatorCapabilities.languagePairAvailable(detectedLanguage, targetLanguage);
  
          if (canTranslate === "no") {

            if(!targetLanguage){
              dispatch(setError([...error, { id:error.length, message: `Choose a valid language` }]));
              return
            }

            if(targetLanguage == 'null'){
              dispatch(setError([...error, { id:error.length, message: `Choose a valid language` }]));
              return
            }



            if(detectedLanguage == targetLanguage){
              console.log(detectedLanguage, targetLanguage)
              dispatch(setReplyIsLoading(false))
              dispatch(setError([...error, { id:error.length, message: `Text is already ${languages[detectedLanguage] ?? detectedLanguage}` }]));
              return
            }

            dispatch(setError([...error, { id:error.length, message: "The language pair is not yet supported" }]));
          } else if (canTranslate === "after-download") {
            dispatch(setError([...error, { id:error.length, message: "The language pair needs to be downloaded" }]));
          } else if (canTranslate == "readily") {
            setTranslated(true)
            const translator = await self.ai.translator.create({ 
              sourceLanguage: detectedLanguage,
              targetLanguage: targetLanguage,
            });

            dispatch(setPair(`${detectedLanguage} - ${targetLanguage}`))
  
            const translatedText = await translator.translate(query);
            if(!translated){
              dispatch(setReplyIsLoading(false))
              dispatch(addMessageToDialogue({index:id, payload:{id:`${id}b`, author:'ai', message: translatedText, type:"translation"}}))
              console.log(dialogue)
            }else{
              dispatch(setReplyIsLoading(false))
              dispatch(changeTranslation({index:id, payload:{id:`${id}b`, author:'ai', message:translatedText, type:"translation"}}))
              console.log(dialogue)
            }
  
          }
        } else {
          dispatch(setReplyIsLoading(false))
          dispatch(setError([...error, { id:error.length, message: "The Translator API is not supported on your device" }]));
        }
      }
      catch(error){
        dispatch(setError([...error,{id:error.length, message: error.message}]))
      }
      finally{
        dispatch(setReplyIsLoading(false))
        setTimeout(()=>{
          dispatch(setError([]))
        },3000)
      }
    };
    


  return{detectLanguage, summarizeText, translateLanguage}
}