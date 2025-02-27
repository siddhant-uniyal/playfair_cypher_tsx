import React from 'react'

type InputPropsType = {
    idDiv : string,
    idInput : string
    label : string,
    value : string,
    onChange : React.ChangeEventHandler<HTMLInputElement>
    placeholder : string
}

const Input = ({idDiv , idInput , label , value , onChange , placeholder} : InputPropsType) => {
  return (
    <>
        <div
          id={idDiv}
          className="flex flex-auto justify-center items-center  gap-x-2"
        >
        <label className="text-3xl">{label} 
            <input id={idInput} type="text" placeholder = {placeholder} value={value} 
                className="border border-black rounded-xl text-3xl" 
                onChange={onChange}>
            </input>
        </label>
        </div>
    </>
  )
}

export default Input