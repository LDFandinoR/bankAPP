import React, { useEffect } from "react";
import { Button, Card, Container, Form, InputGroup } from "react-bootstrap";
import { UserContext } from "../App";
import { useState } from "react";
import { boolean } from "yup";
import { useAuth } from "../context/authContext";
import axios from "axios";


const validateWithdraw = (withdraw, balance) => {
  let errors = {};

  if(!withdraw){
    errors.error = 'Required Field';
  } 
  if (isNaN(withdraw)){
    errors.error = 'This is not a valid number';
  }
  if (withdraw > balance) {
    errors.error = 'You are introducing a number greater than the balance';
  } 
  return errors;
}


export default function WithdrawC(){

  const { user } = useAuth();

  let newTotal;  
  const [withdraw, setWithdraw] = React.useState(0); // form values 0
  const [errors, setErrors] = React.useState({});
  const [balance, setBalance] = React.useState(null);

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

  /*useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/user/${user.email}`)
    .then(function(response){
      console.log(response)
    }).catch(function(error){
      console.log(error)
    })

  }, [user])*/

  const handleChange = (e) => {
    setWithdraw(e.target.value);
    console.log('hola change');
    newTotal = (Number(balance) - Math.abs(Number(withdraw)));
    setBalance(newTotal);
      //setErrors(validatewithdraw(withdraw));
  }

  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validateWithdraw(withdraw, balance));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //setUpdating(true);
    //console.log("updating ",updating)
    console.log("balance before axios ", balance)
    axios.put(`${process.env.REACT_APP_API_URL}/user/${user.email}`, {balance})
    alert('Successful Withdraw!');
    //navigate('/deposit')
    setWithdraw('')
  }

    /*
    //setErrors(validateWithdraw(withdraw, balance))
    //newTotal = (Number(balance) - Math.abs(Number(withdraw)));
    //ctx.users[0].balance = newTotal;
    if (Object.keys(errors).length === 0){
      setBalance(newTotal)
      //setBalance(Number(ctx.users[0].balance) + Number(withdraw));
      alert('Successful withdraw!');
  } 
    console.log('hola submit');
    console.log('withdraw' + withdraw)
  }*/

//Cuerrent page 71 {ctx.users[0].name}, this is your balance {balance}
  return (
    <Card className="text-center">
      <Card.Header>Withdraw</Card.Header>
      <Card.Body>
        <Card.Title>Balance</Card.Title>
        <Card.Text>
        
        </Card.Text>

        <Form onSubmit={handleSubmit}>

        <Form.Group>
            <Form.Label>Withdraw Amount</Form.Label>
            <InputGroup>
                <Form.Control 
                    id="nameField" 
                    name="withdraw" 
                    type="text"
                    placeholder="Introduce a value" 
                    onBlur={handleBlur}
                    onChange={handleChange} 
                    value={withdraw}
                    isInvalid = {!!errors.error}
                    />
              <Form.Control.Feedback type="invalid">{errors.error}</Form.Control.Feedback>
            </InputGroup>
        </Form.Group>
        


        <Button
        disabled={!!errors.error || withdraw == ''}
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