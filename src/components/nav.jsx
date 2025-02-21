import Container from "./container"
import { useContext } from "react"
import { backgroundContext } from "../redux/states/background"
import { useDispatch } from "react-redux"
import { addDialogue } from '../redux/states/dialogue.js'

export default function Nav() {
    const background = useContext(backgroundContext)
    const dispatch = useDispatch()
    const style = {
      background: background
    }

    const clickAction = () => {
      dispatch(addDialogue([]))
    }
    
  return (
    <div className={` w-full h-[60px] left-0 z-20`} style={style}>
        <Container>
            <div className="flex w-full h-full items-center justify-between">              
              <div className="font-[900] w-auto h-full text-[white] gap-[10px] flex items-center">
                <span className="border-[3px] w-[25px] transform hover:rotate-[-30deg] transition-[.5s] cursor-pointer h-[25px] rounded-[3px] border-[#f098f8]"></span>
                Textify
              </div> 
              <button aria-label="clear chat" className="border-[1px] flex font-bold p-[10px] text-[14px] items-center justify-center text-[#191964] hover:bg-[#d38dda] bg-[#f098f8] w-[max-content] h-[40px] rounded-[5px]" onClick={clickAction}>Clear chat</button>
            </div>
        </Container>
    </div>
  )
}
