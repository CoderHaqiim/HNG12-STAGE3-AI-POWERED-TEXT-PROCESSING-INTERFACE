import { useState, useEffect, useRef} from "react"
import usehttpRequests from "./httpRequests"
import { languages } from "../utils/languages"
import { useDispatch, useSelector } from "react-redux"
import { setReplyIsLoading } from "../redux/states/replyIsLoading"

export default function Query({query,id, time}) {
  const error = useSelector (state => state.error.value)
  const [targetLanguage, setTargetLanguage] = useState(null)
  const {translateLanguage, detectLanguage, summarizeText} = usehttpRequests()
  const [detectedLanguage, setDetectedLanguage] = useState(null)
  const [showSummaryBtn, setShowSummaryBtn] = useState(false)
  const [translated, setTranslated] = useState(false)
  const [summarized, setSummarized] = useState(false)
  const languageSelectorRef = useRef(null)
  const dispatch = useDispatch()


  const checkLength = () => {
    if(query.length >= 150){
      setShowSummaryBtn(true)
    }else{
      setShowSummaryBtn(false)
    }
  }

  const runTranslation = () => {
    translateLanguage(query, id, translated, setTranslated, targetLanguage, detectedLanguage)
    dispatch(setReplyIsLoading(true))
  }

  const runSummary = () => {
    setSummarized(true)
    summarizeText(query,id,summarized)
    dispatch(setReplyIsLoading(true))
  }

  const getTargetLanguage = () => {
    const value = languageSelectorRef.current.value
    setTargetLanguage(value)
  }

  useEffect(()=>{
    detectLanguage(query, setDetectedLanguage)
    checkLength()
  },[])

  return (
    <div className='w-full h-auto flex justify-end relative query'>
      <div className={`py-[10px] min-w-[200px] relative text-[1.1rem] px-[10px] query2 max-w-[300px] font-[400] shadow-shadow1 rounded-[10px] break-words leading-[1.2] bg-bluelight lg:max-w-[600px]`}>
        <p className="text-[#191964]">{query}</p>
        <div className="w-full relative h-[max-content] mt-[20px] text-[0.6rem] font-bold gap-[10px] flex justify-start">
          <button onClick={runSummary} className={`${showSummaryBtn? (detectedLanguage == "en"? "block":"hidden") :"hidden"} w-[max-content] cursor-pointer border-[1px] border-[#191964] px-[8px] rounded-[5px]  bg-[#191964] text-[white] py-[4px] h-[30px]`}>Summarize</button>
          <div className=" w-[max-content] flex cursor-pointer border-[1px] border-[#191964] p-[3px] rounded-[5px] text-[white] flex items-center justify-center h-[max-content]">
            <select ref={languageSelectorRef} onChange={getTargetLanguage} className="w-[70px] cursor-pointer bg-[transparent] text-[#191964] font-bold text-[0.5rem] p-[3px] h-[24px]">
              <option value="en">English</option>
              <option value="pt">Portugese</option>
              <option value="es">Spanish</option>
              <option value="ru">Russian</option>
              <option value="tr">Turkish</option>
              <option value="fr">French</option>
            </select>
            <button onClick={runTranslation} className={`w-[max-content] cursor-pointer border-[1px] border-[#191964] text-[0.5rem] px-[8px] rounded-[5px] bg-[#191964] text-[white] py-[3px] h-[24px]`}>Translate</button>
          </div>
        </div>
        <div className={`text-[0.6rem] flex items-end justify-end text-[#777777] font-[700]`}>{time}</div>
        <div className={`${detectedLanguage? "flex" : 'hidden'} absolute bottom-[-20px] items-center gap-[5px] left-0 w-[max-content] h-[15px] text-[#191964] text-[0.8rem]`}>
          <span className="w-[5px] h-[5px] bg-[#b909c9]"></span>
          <span className="w-[max-content] text-[0.6rem]">
            <span>detected language: </span>
            <span className="font-bold">{languages[detectedLanguage] ?? detectedLanguage}</span>
          </span>
        </div>
      </div>
    </div>
  )
}