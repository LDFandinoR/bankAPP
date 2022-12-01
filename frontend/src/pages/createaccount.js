import React from "react";
//import FormCA from "../components/formca";
import { Card, Container, Button, Form, InputGroup, Col } from "react-bootstrap";

//import { Field, useFormik, Feedback } from "formik";

//import CNAForm from "../components/cnaForm";
import { useForm } from "../hooks/useForm";
//import { useAuth } from "../context/authContext";
//import { initialForm, validationsForm } from "../components/caForm";
//import { AccountComponent } from "../components/accountcomponent";


const initialForm = {
  name: "", 
  email: "", 
  password: ""
};
const validationsForm = (form) => {
  let errors = {};
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;

  if(!form.name.trim()){
      errors.name = 'Required Field'
  } else if (!regexName.test(form.name.trim())){
      errors.name = 'This field only accepts letters and blanks';
  }

  if(!form.email.trim()){
      errors.email = 'Required Field'
  }else if (!regexEmail.test(form.email.trim())){
      errors.email = 'Username must be an email';
  }

  if(!form.password.trim()){
      errors.password = 'Required Field'
  } else if (form.password.length < 8){
      errors.password = 'It must contain at least 8 characters';
  }
  return errors;

};


export default function CreateAccount(){
  const { 
    form,
    errors, 
    loading, 
    response, 
    show,
    status,
    handleChange, 
    handleBlur, 
    handleSubmit,
    handleCreate,
    clearForm   
    } = useForm(initialForm, validationsForm);




  return (
    
      <Container>
      {show ? (<>

        <Card>
        <Card.Header className="text-center" as="h5">Create Account</Card.Header>
        <Card.Body>
        <Card.Title  className="text-center">Fill out the form</Card.Title>

          <Form onSubmit={handleSubmit}>

          <Form.Group>
            <Form.Label>Name</Form.Label>
            <InputGroup>
                <Form.Control 
                    id="nameField" 
                    name="name" 
                    type="text" 
                    placeholder="Your Name" 
                    onBlur={handleBlur} 
                    onChange={handleChange} 
                    value={form.name}
                    isInvalid = {!!errors.name}
                    />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </InputGroup>
        </Form.Group>

        <Form.Group>
            <Form.Label>Email</Form.Label>
            <InputGroup className="mb-4">
                <Form.Control 
                    id="emailField" 
                    name="email" 
                    type="email" //check later
                    placeholder="YourEmail@mail.com" 
                    onBlur={handleBlur} 
                    onChange={handleChange} 
                    value={form.email}
                    isInvalid = {!!errors.email}
                    />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </InputGroup>
        </Form.Group>

        <Form.Group>
            <Form.Label>Password</Form.Label>
            <InputGroup className="mb-4">
                <Form.Control 
                    id="passwordField" 
                    name="password" 
                    type="password" //check later
                    placeholder="********" 
                    onBlur={handleBlur} 
                    onChange={handleChange} 
                    value={form.password}
                    isInvalid = {!!errors.password}
                    />
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </InputGroup>
        </Form.Group>
        
        <Button
            disabled={errors.name || errors.password || errors.email || form.name === "" || form.email === ""|| form.password === "" }
            variant="primary"
            as="input"
            size="lg"
            type="submit"
            value="Create Account"
            onClick={handleCreate}
        ></Button>
        </Form>
        </Card.Body>
        </Card>

        </>
        
        
        ) : (<>
        <Card className="text-center" >
        <Card.Header as="h5">Create a New Account</Card.Header>
        <Card.Body>
        <Card.Title>The entered email is already in use</Card.Title>
        <Card.Text>
            Click on the button to create a new account
        </Card.Text>
          <Button
            variant="success"
            as="input"
            size="lg"
            type="submit"
            value="Create New Account"
            onClick={clearForm}
        />
        </Card.Body>
        </Card>
        </>)}
        

        </Container>
    
  
);

}
