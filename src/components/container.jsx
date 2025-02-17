import React from 'react'

export default function Container({children}){
 
  return (
    <div className={`lg:px-[20px] px-[10px] w-full h-full py-[8px]`}>
        {children}
    </div>
  )
}
