import Container from './container'
import Query from './query'
import Reply from './reply'
import LoadingAnimation from "./loadingAnimation"
import { useSelector } from 'react-redux'

export default function Maincontent(){
  const dialogue = useSelector((state => state.dialogue.value))
  const replyIsLoading = useSelector((state => state.replyIsLoading.value))

  return (
    <div className='content w-full h-auto flex-1 overflow-y-scroll'>
        <Container>
            <div className='w-full h-auto flex gap-[25px] flex-col py-[20px]'>
                {
                  dialogue.map(convo =>
                    convo.author === 'user'? <Query key={convo.id} time={convo.time} query={convo.message}/> : <Reply time={convo.time} reply={convo.message} key={convo.id}/>
                  )
                }
                {replyIsLoading? <LoadingAnimation/>:<></>}
            </div>
        </Container>
    </div>
  )
}
