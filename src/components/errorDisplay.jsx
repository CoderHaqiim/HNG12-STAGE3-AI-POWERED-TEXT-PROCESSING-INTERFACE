import React from 'react'
import { useSelector} from 'react-redux'
import LoadingAnimation from './loadingAnimation'

export default function ErrorDisplay() {
  const error = useSelector(state => state.error.value)
  const replyIsLoading = useSelector(state => state.replyIsLoading.value)

  return (
    <div className={`${error?.length >= 1 || replyIsLoading? "flex" : "hidden"} w-full z-[1000] fixed h-[max-content] top-[70px] justify-center items-center left-0`}>
        <div className={`${error?.length >= 1? "flex":"hidden"} w-[max-content] itens-center text-[red] justify-center text-[0.8rem] md:text-[1rem] h-[max-content] px-[20px] py-[10px] rounded-[15px] border-[1px] border-[red] bg-[#fbe9e9]`}>{error[error.length - 1]?.message}</div>
        <div className={`${replyIsLoading && error.length == 0? "flex":"hidden"}`}>
          <LoadingAnimation/>
        </div>
    </div>
  )
}
