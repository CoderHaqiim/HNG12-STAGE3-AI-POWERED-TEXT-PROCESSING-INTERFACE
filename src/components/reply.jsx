import { useSelector } from "react-redux"

export default function Reply({reply,time}) {

  const error = useSelector((state)=> state.error.value)
  const style={
    border: '1px solid grey',
    color: "#031948"
  }


  return (
    <div className='w-full h-auto flex justify-start gap-[10px]'>
      <div className={`w-[30px] h-[30px] rounded-[50%] flex text-[0.8rem] items-center opacity-[0.6] font-[900] justify-center`} style={style}>AI</div>
      <div className={`py-[8px] text-[1.1rem] px-[10px] max-w-[300px] font-[400] rounded-[10px] shadow-shadow1 leading-[1.2] break-all ${error? "bg-[#fff2f2]": "bg-light1"} lg:max-w-[500px]`}>
        {
          error? <p className='text-[red]'>
                    <span className="font-[700]">error: </span>{reply}. <br/>
                    Reload and retry.
                  </p> : 
                  <p>{reply}</p>
        }
        <div className={`mt-[10px] text-[0.75rem] flex items-end justify-end text-[#777777] font-[700]`}>{time}</div>
      </div>
    </div>
  )
}
