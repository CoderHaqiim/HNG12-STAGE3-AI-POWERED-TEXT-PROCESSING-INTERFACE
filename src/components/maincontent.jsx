import Container from './container'
import Query from './query'
import Reply from './reply'
import LoadingAnimation from "./loadingAnimation"
import { useSelector } from 'react-redux'

export default function Maincontent(){
  const dialogue = useSelector((state => state.dialogue.value))

  return (
    <div className='content relative w-full h-auto flex-1 overflow-y-scroll'>
      <div className={`${dialogue?.length >= 1? "hidden" : "flex"} absolute w-full h-full items-center flex-col justify-center`}>
        <img className='w-[80px] h-[80px]' src="/robot.svg" alt="robot image" />
        <h1 className='text-center text-[1.8rem] font-bold mt-[20px] text-[#555555]'>Welcome to Textify</h1>
        <p className='text-center text-[0.9rem] word-break text-[#888888]'>Enter your text in the input below to translate or summarize them.</p>
      </div>
        <Container>
            <div className='w-full h-auto flex gap-[70px] lg:gap-[50px] flex-col py-[20px]'>
                {
                  dialogue?.map((dialog, index) => 
                    dialog?.map((convo) =>
                      convo.author === 'user'? <Query key={convo.id} id={index} time={convo.time} query={convo.message}/> : <Reply id={index} type={convo.type} reply={convo.message} key={convo.id}/>
                    )
                  )
                }
            </div>
        </Container>
    </div>
  )
}
