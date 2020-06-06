import React from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'

export const MyPhoneInput = ({data, setData, servName}) => {

    const setPhoneNum = (value) =>{
        setData({...data, [servName]: value})
    }   

    return(
        <PhoneInput flags={flags} defaultCountry="UA" className="form-control" style={{display: "flex"}}
        placeholder={"Enter phone number"}
        onChange={setPhoneNum}/>
    )
}
  
