import React from 'react'

export const CardHeader = (props) => {
  return (
    <div className='flex flex-col text-center mb-2'>
        <span className='text-black text-3xl font-bold'>{props.heading}</span>
        <span className='font-light text-sm font-sans mt-1 px-3'>{props.secondaryinfotext}</span>
    </div>
  )
}
