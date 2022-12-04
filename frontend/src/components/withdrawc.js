import React, { useEffect } from "react";
import { Button, Card, Container, Form, InputGroup } from "react-bootstrap";
import { UserContext } from "../App";
import { useState } from "react";
import { boolean } from "yup";
import { useAuth } from "../context/authContext";
import axios from "axios";
import { async } from "@firebase/util";


const validateWithdraw = (withdraw, balance) => {
  let errors = {};

  if(!withdraw){
    console.log("entre en !withdraw ")
    errors.error = 'Required Field';
  }
  if (isNaN(withdraw)){
    console.log("entre en isNaN(withdraw)")
    errors.error = 'This is not a valid number';
  }
  if (Math.abs(Number(withdraw)) > balance) {
    console.log("entre en withdraw > balance")
    errors.error = 'You are introducing a number greater than the balance';
  } 
  return errors;
}


export default function WithdrawC(){

  const { user } = useAuth();

  const [errors, setErrors] = React.useState({});
  const [balance, setBalance] = React.useState(null);
  const [values, setValues ] = React.useState({
    withdraw: 0
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
    setErrors(validateWithdraw(values.withdraw, balance));
    
  };

  const handleSubmit = (e) => {
    
    newBalance = (Number(balance) - Math.abs(Number(values.withdraw)));
    console.log("newBalance: ",newBalance)
    axios.put(`${process.env.REACT_APP_API_URL}/user/${user.email}`, {balance: newBalance})
    setBalance(() => Number(balance) - Math.abs(Number(values.withdraw)))
    alert('Successful withdraw!');
    
    e.preventDefault()
  
  }









  return (
    <Card className="text-center">
      <Card.Header>Withdraw</Card.Header>
      <Card.Body>
        <Card.Title>Balance: {balance}</Card.Title>
        <Card.Text>
        
        </Card.Text>

        <Form onSubmit={handleSubmit}>

        <Form.Group>
            <Form.Label>Withdraw Amount</Form.Label>
            <InputGroup>
                <Form.Control 
                    id="nameFieldW" 
                    name="withdraw" 
                    type="number"
                    placeholder="Introduce a value" 
                    onBlur={handleBlur}
                    onChange={handleChange} 
                    value={values.withdraw}
                    isInvalid = {!!errors.error}
                    />
              <Form.Control.Feedback type="invalid">{errors.error}</Form.Control.Feedback>
            </InputGroup>
        </Form.Group>
        


        <Button
            disabled={!!errors.error || values.withdraw == ''}
            variant="primary"
            as="input"
            size="lg"
            type="submit"
            value="withdraw"
            onClick={handleSubmit}
        />
        </Form>

      </Card.Body>
      <Card.Footer className="text-muted">With this action your balance will be updated</Card.Footer>
    </Card>


  );
}