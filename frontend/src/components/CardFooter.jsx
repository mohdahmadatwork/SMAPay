import React from 'react'
import { classesForWrapperInputField } from './InputFieldWithLabels'
import { Link } from 'react-router-dom'
const CardFooter = (props) => {
  return (
    <div className={` ${classesForWrapperInputField}  justify-center `} style={{marginBottom:0}}>
        <button className='bg-black rounded p-2 text-white' onClick={props.onclick}>{props.heading}</button>
        <span className='flex justify-center text-sm'>
            <span >{props.secondarytext} &nbsp; </span>
            <span className='underline font-bold'>
              <Link to={props.link}> {props.linkTitle}</Link>
            </span>
        </span>
    </div>
  )
}

export default CardFooter