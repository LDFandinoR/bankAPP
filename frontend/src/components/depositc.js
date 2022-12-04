import React, { useEffect } from "react";
import { Button, Card, Container, Form, InputGroup } from "react-bootstrap";
//import { UserContext } from "../App";
import { useDesposit } from "../hooks/useDeposit";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router";



const validateDeposit = (deposit) => {
  let errors = {};

  if(!deposit){
    errors.error = 'Required Field';
  } 
  if (isNaN(deposit)){
    errors.error = 'This is not a valid number';
  }
  if (deposit < 0) {
    errors.error = 'You are introducing a negative number';
  } 
  /*if(!deposit.trim()){
    errors.error = 'Required Field';
  }*/
  return errors;
}


export default function DepositC(){

  const { user } = useAuth();
  
  const [errors, setErrors] = React.useState({});
  const [balance, setBalance] = React.useState(null);
  const [values, setValues] = React.useState({
    deposit: 0
  });
  let newBalance;


  useEffect(() => {

    user.getIdToken()
    .then( idToken => {
    axios.get(`${process.env.REACT_APP_API_URL}/user/${user.email}`, {headers: { 'Authorization' : idToken }})
    .then(function(response){
      console.log("el balance inicial esta en: ", response.data.balance)
      setBalance(response.data.balance)
    })
  }).catch(function(error){
      console.log(error)
    })

  }, [balance])


  const handleChange = (e) => {
    const {name, value} = e.target;
    setValues({
        ...values, 
        [name]: value,
    });
  }


  const handleBlur = (e) => {
    
    setErrors('')
    handleChange(e);
    setErrors(validateDeposit(values.deposit));

  };

  const handleSubmit = (e) => {
    
    newBalance = (Number(balance) + Number(values.deposit));
    console.log("newBalance: ",newBalance)
    axios.put(`${process.env.REACT_APP_API_URL}/user/${user.email}`, {balance: newBalance})
    setBalance(() => Number(balance) + Number(values.deposit))
    alert('Successful Deposit!');
    e.preventDefault()

  }

  return (
    <Card className="text-center">
      <Card.Header>Deposit</Card.Header>
      <Card.Body>
        <Card.Title>Balance: {balance}</Card.Title>
        <Card.Text>
        
        </Card.Text>

        <Form onSubmit={handleSubmit}>

        <Form.Group>
            <Form.Label>Deposit Amount</Form.Label>
            <InputGroup>
                <Form.Control 
                    id="nameFieldD" 
                    name="deposit" 
                    type="number"
                    placeholder="Introduce a value" 
                    onBlur={handleBlur}
                    onChange={handleChange} 
                    value={values.deposit}
                    isInvalid = {!!errors.error}
                    />
              <Form.Control.Feedback type="invalid">{errors.error}</Form.Control.Feedback>
            </InputGroup>
        </Form.Group>


        <Button
        disabled={!!errors.error || values.deposit == ''}
            variant="primary"
            as="input"
            size="lg"
            type="submit"
            value="Deposit"
            onClick={handleSubmit}
        />
        </Form>

      </Card.Body>
      <Card.Footer className="text-muted">With this action your balance will be updated</Card.Footer>
    </Card>


  );
}