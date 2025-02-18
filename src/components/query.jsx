import { useSelector } from "react-redux"
import { useState, useEffect} from "react"
import usehttpRequest from "./httpRequests"


export default function Query({query,time}) {
  // const language = useSelector((state => state.language.value))
  const {translateLanguage} = usehttpRequest()
  const {detectLanguage} = usehttpRequest()
  const [detectedLanguage, setDetectedLanguage] = useState(null)
  const [showSummaryBtn, setShowSummaryBtn] = useState(false)

  const checkLength = () => {
    if(query.length >= 150 && detectedLanguage === "English"){
      setShowSummaryBtn(true)
    }else{
      setShowSummaryBtn(false)
    }
  }

  useEffect(()=>{
    checkLength()
    detectLanguage(query, setDetectedLanguage)
  },[])

  return (
    <div className='w-full h-auto flex justify-end relative query'>
      <div className={`py-[8px] relative text-[1.1rem] px-[10px] query2 max-w-[300px] font-[400] shadow-shadow1 rounded-[10px] break-words leading-[1.2] bg-bluelight lg:max-w-[500px]`}>
        <p className="text-[#191964]">{query}</p>
        <div className="w-full relative h-[max-content] mt-[10px] text-[0.6rem] font-bold gap-[10px] flex justify-start">
          <button className={`${showSummaryBtn? "block":"hidden"} w-[max-content] cursor-pointer border-[1px] border-[#191964] px-[8px] rounded-[5px] text-[#191964] py-[4px] h-[30px]`}>Summarize</button>
          <button onClick={() =>{translateLanguage(query)}} className={`w-[max-content] cursor-pointer border-[1px] border-[#191964] bg-[#191964] px-[8px] rounded-[5px] text-[white] py-[4px] h-[30px]`}>Translate</button>
        </div>
        <div className={`${detectedLanguage? "flex" : 'hidden'} absolute bottom-[-20px] items-center gap-[5px] left-0 w-[max-content] h-[15px] text-[#191964] text-[0.8rem]`}>
          <span className="w-[5px] h-[5px] bg-[#b909c9]"></span>
          <span className="w-[max-content] text-[0.6rem]">
            <span>lang: </span>
            <span className="font-bold">{detectedLanguage}</span>
          </span>
        </div>
      </div>
    </div>
  )
}

{/* <div className=" w-[max-content] flex cursor-pointer border-[1px] border-[#191964] px-[8px] rounded-[5px] text-[white] py-[4px] flex items-center justify-center h-[max-content]">
            <select className="w-[50px] cursor-pointer bg-[white] text-[#191964] font-bold text-[0.6rem] px-[8px] py-[4px] h-[30px]">
              <option className="Translate" value="English">lang</option>
              <option value="English">English</option>
              <option value="Portugese">Portugese</option>
              <option value="Spanish">Spanish</option>
              <option value="Russian">Russian</option>
              <option value="French">French</option>
            </select>
            <button className={` w-[max-content] cursor-pointer border-[1px] border-[#191964] text-[0.6rem] bg-[#191964] px-[5px] rounded-[5px] text-[white] py-[3px] h-[max-content]`}>Translate</button>
          </div> */}