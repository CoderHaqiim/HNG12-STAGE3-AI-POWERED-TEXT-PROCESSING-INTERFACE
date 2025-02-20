import { useState, useRef } from 'react'
import Container from './container'
import useTimestamp from './usetimestamp'
import sendIcon from "../assets/send.svg"
import stopIcon from "../assets/stop.svg"
import { addDialogue } from '../redux/states/dialogue.js'
// import { setReplyIsLoading } from '../redux/states/replyIsLoading.js'
import { useSelector, useDispatch } from 'react-redux'
import { useContext } from 'react'
import { backgroundContext } from '../redux/states/background.js'
import { setError } from '../redux/states/error.js'

export default function Searchbar() {
    const background = useContext(backgroundContext)
    const showName = 'Textify'
    const [active, setActive] = useState(false)
    const [query, setQuery] = useState('')
    const placeholder = `translate and summarize with ${showName}`
    const inputRef = useRef(null)
    const currentTime = useTimestamp()

    const dispatch = useDispatch()

    const error = useSelector(state => state.error.value)
    const dialogue = useSelector((state => state.dialogue.value))
    const replyIsLoading = useSelector((state => state.replyIsLoading.value))

    const sendQuery =(e) =>{
        e.preventDefault()
        console.log(typeof(query))
        if(!query){
            dispatch(setError([...error, { id:error.length, message: "Please enter a valid text" }]));
            return
        }
        dispatch(addDialogue([...dialogue, [{id:dialogue.length + 'user', author:'user', message:query, time:currentTime}]]))
        setQuery('')
        inputRef.current.value = ""

    }

    const sendWithEnter = (e) => {
           if (e.key === 'Enter' && e.code === 'Enter'){
            e.preventDefault()
            sendQuery(e)
        }
    }

    const deactivateInput=()=>{
        setActive(false)
    }

    const activateInput =()=>{
        setActive(true)
    }

    const setValueToQuery = () =>{
        setQuery(inputRef.current.value)
    }

  return (
    <div className='w-full min-h-[80px] h-[auto] z-20 '>
        <Container>
            <div className='w-full flex justify-center items-center'>
                <div className={`lg:w-[90%] w-full h-auto flex items-center justify-center`}>
                    <div onClick={activateInput} className={`${active? "border-[2px] border-[#0a338d]":'border-[1px] border-[#949393]'} w-full caret-[#0a338d] transition-[0.3s] h-[80px] min-h-[80px] bg-bluelight rounded-[15px] border-[solid] items-center flex-wrap justify-center relative flex`}>
                        <textarea onChange={setValueToQuery} ref={inputRef} onFocus={activateInput} onBlur={deactivateInput} onKeyDown={(e)=>{sendWithEnter(e)}} placeholder={placeholder} className={`textarea text-[#191964] resize-no text-[1.1rem] query-paragraph transition-[0.4s] h-full max-h-[150px] relative p-[10px] pl-[20px] mr-[50px] w-full border-0 outline-0 break-word flex items-center font-[400] flex-wrap overflow-y-scroll`}></textarea>
                        <button type="submit" onClick={(e)=>{sendQuery(e)}} className={`w-[42px] h-[42px] flex items-center justify-center absolute rounded-[10px] right-[7px] bottom-[6px] cursor-pointer`}
                        style={{background}}>
                            <span className={`${replyIsLoading? "hover:rotate-0" : "hover:rotate-[-30deg]" } p-[10px] transition-[0.4s] w-full h-full transform`}>
                                {
                                    !replyIsLoading? <img className="w-full h-full" src={sendIcon} alt="sendIcon" /> : <img className='w-full h-full' src={stopIcon} alt="stopIcon"/>
                                }
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </Container>
    </div>
  )
}
