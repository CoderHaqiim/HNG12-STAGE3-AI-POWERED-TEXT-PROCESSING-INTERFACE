import useTimestamp from "./usetimestamp"
import { useSelector } from "react-redux"

export default function Reply({reply, type, id}) {
  const translatePair = useSelector(state => state.translatePair.value)
  const style={
    border: '1px solid grey',
    color: "#031948"
  }

  const time = useTimestamp()

  return (
    <div className='w-full h-auto flex justify-start gap-[10px]'>
       <div className={`w-[30px] h-[30px] rounded-[50%] flex text-[0.8rem] items-center opacity-[0.6] font-[900] justify-center`} style={style}>AI</div>
      {
          <div className={`p-[15px] text-[1.1rem] min-w-[200px] max-w-[300px] font-[400] rounded-[10px] shadow-shadow1 h-[max-content] leading-[1.2] break-all bg-[#5b046322] lg:max-w-[500px]`}>
            <div className="flex justify-between w-full mb-[10px] p-[3px] border-b-[1px] border-[#999999] ">
              <div className="font-bold text-[0.6rem] text-[#333333]" >{type}</div>
              {
                type === 'summary'? 
                <></>:
                <div className="text-[0.65rem]">{translatePair}</div>
              }
            </div>
            <p>{reply}</p>
            <div className={`mt-[10px] text-[0.6rem] flex items-end justify-end text-[#777777] font-[700]`}>{time}</div>
          </div>
      }
    </div>
  )
}
