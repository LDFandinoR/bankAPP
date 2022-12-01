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
  if(!deposit.trim()){
    errors.error = 'Required Field';
  }
  return errors;
}


export default function DepositC(){

  const { user } = useAuth();

  console.log('user en deposit', user)
  let newTotal;
  const [deposit, setDeposit] = React.useState(''); // form values
  const [errors, setErrors] = React.useState({});
  const [balance, setBalance] = React.useState(null);
  const [updating, setUpdating] = React.useState(false);
  const navigate = useNavigate();


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
    //e.preventDefault(); this cause a delay on the change. Do not use
    setDeposit(e.target.value);
    console.log('hola change');
    newTotal = (Number(balance) + Number(deposit));
    setBalance(newTotal);
      //setErrors(validateDeposit(deposit));
  }

  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validateDeposit(deposit));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //newTotal = (Number(balance) + Number(deposit));
    //setBalance(balance => newTotal);
    setUpdating(true);
    console.log("updating ",updating)
    console.log("balance before axios ", balance)
    axios.put(`${process.env.REACT_APP_API_URL}/user/${user.email}`, {balance})
    alert('Successful Deposit!');
    //navigate('/deposit')
    setDeposit('')
  }

  return (
    <Card className="text-center">
      <Card.Header>Deposit</Card.Header>
      <Card.Body>
        <Card.Title>Balance</Card.Title>
        <Card.Text>
        
        </Card.Text>

        <Form onSubmit={handleSubmit}>

        <Form.Group>
            <Form.Label>Deposit Amount</Form.Label>
            <InputGroup>
                <Form.Control 
                    id="nameField" 
                    name="Deposit" 
                    type="text"
                    placeholder="Introduce a value" 
                    onBlur={handleBlur}
                    onChange={handleChange} 
                    value={deposit}
                    isInvalid = {!!errors.error}
                    />
              <Form.Control.Feedback type="invalid">{errors.error}</Form.Control.Feedback>
            </InputGroup>
        </Form.Group>


        <Button
        disabled={!!errors.error || deposit == ''}
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