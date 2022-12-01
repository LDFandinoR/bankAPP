/*import React, { useState } from "react";
import { UserContext } from "../App";



export function useDesposit(){
    
    const ctx = React.useContext(UserContext);
    //ctx.users.juan.balance
    
    const [deposit, setDeposit] = React.useState(0); // form values
    const [errors, setErrors] = React.useState({});
    const [newTotal, setNewTotal] = React.useState(0);
    //const [balance, setBalance] = React.useState()

    const handleChange = (e) => {
        setDeposit = e.target.value;

        console.log('hola')
        //setErrors(validateDeposit(deposit));
    }
    const handleSubmit = (e) => {
        
        //setErrors(validateDeposit(deposit));
        e.preventDefault();
        console.log('hola');
        
        
        /*if (Object.keys(errors).length === 0){
            alert('Successful deposit');
            
            //ctx.users.push({name: form.name, email: form.email, password:form.password, balance:0});
            //ctx.users.juan.balance = 
        }*/

/*    }
    return (
        deposit,
        errors,
        newTotal, 
        handleChange,
        handleSubmit
        )

};
*/