import { useSelector } from "react-redux"
import { useState, useEffect } from "react"


export default function Query({query,time}) {
  const [showSummaryBtn, setShowSummaryBtn] = useState(false)

  const checkLength = () => {
    if(query.length >= 150){
      setShowSummaryBtn(true)
    }else{
      setShowSummaryBtn(false)
    }
  }

  useEffect(()=>{
    checkLength()
  })

  return (
    <div className='w-full h-auto flex justify-end relative query'>
      <div className={`py-[8px] text-[1.1rem] px-[10px] query2 max-w-[300px] font-[400] shadow-shadow1 rounded-[10px] break-words leading-[1.2] bg-bluelight lg:max-w-[500px]`}>
        <p className="text-[#191964]">{query}</p>
        <div className="w-full h-[max-content] mt-[10px] text-[0.6rem] font-bold gap-[10px] flex justify-start">
          
          <button className={`${showSummaryBtn? "block":"hidden"} w-[max-content] cursor-pointer border-[1px] border-[#191964] bg-[#191964] px-[8px] rounded-[5px] text-[white] py-[4px] h-[30px]`}>Summarize</button>
          <select className="w-[max-content] cursor-pointer text-[#191964] font-bold border-[1px] border-[#191964] px-[8px] rounded-[5px] py-[4px] h-[30px]">
            <option className="Translate" value="English">Translate</option>
            <option value="English">English</option>
            <option value="Portugese">Portugese</option>
            <option value="Spanish">Spanish</option>
            <option value="Russian">Russian</option>
            <option value="French">French</option>
          </select>
        </div>
      </div>
    </div>
  )
}
