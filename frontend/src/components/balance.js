import React from "react";
import { useState } from "react";
//import { UserContext } from "../App";
import { Container } from "react-bootstrap";


export default function Balance(){

    let valueOfTransaction = 0; // state of this transaction
    const [totalState, setTotalState] = React.useState(0);  // GLOBAL total account 
    const [isDeposit, setIsDeposit]   = React.useState(true);

    let status = `Account Balance $ ${totalState} `;
    console.log(`Account Rendered with isDeposit: ${isDeposit}`);
    const handleChange = event => {
        console.log(`handleChange ${event.target.value}`);
        transactionValue = Number(event.target.value);
    };
    const handleSubmit = () => {
        let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
        setTotalState(newTotal);
        event.preventDefault();
    };
    

  return (
      <Container>
        
      </Container>
    
  );
}