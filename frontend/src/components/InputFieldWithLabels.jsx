import React,{useEffect, useState} from 'react';
import clsx from "clsx";
const cclassForLabelsOfInputField = {
  'font-semibold':true,
  'font-sm':true
}
export const classForLabelsOfInputField = clsx(cclassForLabelsOfInputField);
const cclassForInputField = {
  'px-2':true,
  'py-1':true,
  'font-lg':true,
  'border-solid':true,
  'border-2':true,
  'rounded':true,
  'm-0':true,
  'mt-1':true,
  'w-full':true
}
export const classForInputField = clsx(cclassForInputField);
const cclassForWrapperInputField = {
  'flex':true,
  'flex-col':true,
  'flex-start':true,
  'mb-2':true
}
export const classesForWrapperInputField = clsx(cclassForWrapperInputField);
const InputFieldWithLabels = (props) => {
  const [borderColor,setBorderColor] = useState({wtFoccus:"border-grey",onFoccus:"focus:border-black"});
  const [foccus,setFoccus] = useState(false);
  useEffect(() => {
    props.errors[props.id]?props.errors[props.id]===200?setBorderColor({wtFoccus:"border-green-600",onFoccus:"focus:border-green-600 focus:outline-none focus:ring-0"}):setBorderColor({wtFoccus:"border-rose-600",onFoccus:"focus:border-rose-600 focus:outline-none focus:ring-0"}):setBorderColor({wtFoccus:"border-grey",onFoccus:"focus:border-black"});
  },[props.errors]);
  return (
    <div className={classesForWrapperInputField}>
        <label className={`${classForLabelsOfInputField} `} htmlFor={props.id}>{props.label}</label>
        <input onChange={props.onchange} value={props.value} className={`${classForInputField} ${borderColor.wtFoccus}  ${borderColor.onFoccus} `} type={props.type} id={props.id} name={props.name} placeholder={props.placeholder} onFocus={()=>{setFoccus(true)}} onBlur={()=>{setFoccus(false)}}/>
        <span className='text-rose-600 text-sm' dangerouslySetInnerHTML={{ __html: props.errors[props.id]?.message }}></span>
    </div>

  )
}
export default InputFieldWithLabels;