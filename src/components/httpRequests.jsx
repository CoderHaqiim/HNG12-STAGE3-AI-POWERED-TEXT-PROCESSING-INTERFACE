import { addDialogue } from "../redux/states/dialogue"
import { setReplyIsLoading } from "../redux/states/replyIsLoading"
import { useSelector, useDispatch } from "react-redux"
import { setError } from "../redux/states/error"

export default function usehttpRequest() {
    const dialogue = useSelector((state => state.dialogue.value))
    const dispatch = useDispatch()

    //interface to send users' questions and get the reply from the backend
    //This http request expects a json object that has a property called: message=""
    const getAiReply = async(query,currentTime) =>{
        function handleError(Er){
            dispatch(setReplyIsLoading(false))
            dispatch(setError(true))
            dispatch(addDialogue({id: dialogue.length + 1, author:'ai', message:Er, time:currentTime }))
        }

        try {
            const URL = 'http://localhost:8080/fakeapi' /*input real URL here*/

            const res = await fetch(URL,{
                method:'POST',
                body:JSON.stringify({userId:"userId",query:query,time:currentTime}),
                headers:{
                    'Content-type': 'application/json'
                }
            })

            if(res.status === 200){
                const response = await res.json()
                dispatch(setReplyIsLoading(false))
                dispatch(addDialogue({id: dialogue.length + 1, author:'ai', message:response.data, time:currentTime }))
            }else{
                const response = await res.json()
                handleError(response.error)
            }
        } catch (error) {
            // if(!navigator.onLine){       /*uncomment before deployment*/
            //     handleError("Check your network connection")
            //     return
            // }
            handleError(error.message)
        }
    }

  return{getAiReply}
}