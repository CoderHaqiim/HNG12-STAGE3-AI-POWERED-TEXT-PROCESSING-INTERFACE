import Container from "./container"
import { useContext } from "react"
import { backgroundContext } from "../redux/states/background"

export default function Nav() {
    const background = useContext(backgroundContext)
    const style = {
      background: background
    }
    
  return (
    <div className={` w-full h-[60px] left-0 z-20`} style={style}>
        <Container>
            <div className="flex w-full h-full items-center justify-between">
              {
                <div className="font-[900] w-auto h-full text-[white] flex items-center">Textify</div>
              }
            </div>
        </Container>
    </div>
  )
}
