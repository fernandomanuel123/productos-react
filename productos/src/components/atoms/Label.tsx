import React from 'react'

type props ={
    value: String
}
const Label = ({value}:props) => {
  return (
    <label className='GenericLabel'>{value}</label>
  )
}

export default Label