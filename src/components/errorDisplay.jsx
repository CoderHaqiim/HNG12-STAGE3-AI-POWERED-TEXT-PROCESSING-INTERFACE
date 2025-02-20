import React from 'react'
import { useSelector} from 'react-redux'

export default function ErrorDisplay() {
  const error = useSelector(state => state.error.value)

  return (
    <div className={`${error?.length >= 1? "flex" : "hidden"} w-full z-[1000] fixed h-[max-content] top-[70px] justify-center items-center left-0`}>
        <div className='w-[max-content] flex itens-center text-[red] justify-center text-[0.8rem] md:text-[1rem] h-[max-content] px-[20px] py-[10px] rounded-[15px] border-[1px] border-[red] bg-[#fbe9e9]' >{error[error.length - 1]?.message}</div>
    </div>
  )
}
