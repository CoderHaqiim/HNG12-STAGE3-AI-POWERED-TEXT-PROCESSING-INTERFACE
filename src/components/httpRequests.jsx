import { addDialogue } from "../redux/states/dialogue"
import { setReplyIsLoading } from "../redux/states/replyIsLoading"
import { useSelector, useDispatch } from "react-redux"
import { setError } from "../redux/states/error"

export default function usehttpRequest() {
    const dialogue = useSelector((state => state.dialogue.value))
    const dispatch = useDispatch()

    //interface to send users' questions and get the reply from the backend
    //This http request expects a json object that has a property called: message=""


    const detectLanguage = async(query) =>{
        const detector = await window.ai.languageDetector.create();
        text = query
        const results = await detector.detect(text);
        const language = results[0]
        console.log(language)
    }

  return{detectLanguage}
}