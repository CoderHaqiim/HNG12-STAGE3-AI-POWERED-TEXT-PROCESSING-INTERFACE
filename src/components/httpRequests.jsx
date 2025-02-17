import { addDialogue } from "../redux/states/dialogue"
import { setReplyIsLoading } from "../redux/states/replyIsLoading"
import { useSelector, useDispatch } from "react-redux"
import { setError } from "../redux/states/error"

export default function usehttpRequest() {
    const dialogue = useSelector((state => state.dialogue.value))
    const dispatch = useDispatch()

    //interface to send users' questions and get the reply from the backend
    //This http request expects a json object that has a property called: message=""


    async function summarizeText(text) {
      if ('summarizer' in navigator) {
        const text = "Your lengthy text here.";
        navigator.summarizer.summarize(text)
          .then(summary => {
            console.log("Summary:", summary);
          })
          .catch(error => {
            console.error("Summarization error:", error);
          });
      } else {
        console.error("Summarizer API not supported in this browser.");
      }
    }
    
    // Example Usage
    summarizeText("Your long text goes here...");
    


    const detectLanguage = async(query) =>{
        const detector = await window.ai.languageDetector.create();
        const results = await detector.detect(query);
        const language = results[0]
        console.log(language)
    }

  return{detectLanguage, summarizeText}
}