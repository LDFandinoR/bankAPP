import React, { useState } from "react";
import { useForm } from "../hooks/useForm";
import { Form, InputGroup, Button, Container, Col, Card } from "react-bootstrap";
import { Field, useFormik, Feedback } from "formik";


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


export default function AccountComponent(){

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
      
      <Card
        bgcolor="primary"
        header="Create Account"
        status={status}
        body={show ? (<>

          <form onSubmit={handleSubmit}>
            <div>
            <input 
            type='text' 
            name="name" 
            placeholder="Name" 
             
            onChange={handleChange} 
            value={form.name} 
             />
            {errors.name && <p>{errors.name}</p>}
            </div>

            <div>
            <input 
            type='text' 
            name="email" 
            placeholder="Email" 
            onBlur={handleBlur} 
            onChange={handleChange} 
            value={form.email} 
             />
            {errors.email && <p>{errors.email}</p>}
            </div>

            <div>
            <input 
            type='text' 
            name="password" 
            placeholder="Password" 
            onBlur={handleBlur} 
            onChange={handleChange} 
            value={form.password} 
             />
            {errors.password && <p>{errors.password}</p>}
            </div>
            <Button
            variant="success"
            as="input"
            size="lg"
            type="submit"
            value="Create Account"
            onClick={handleCreate}
        />
            
        </form>
        
        
        
        </>) : (<>

          <Button
            variant="success"
            as="input"
            size="lg"
            type="submit"
            value="Create New Account"
            onClick={clearForm}
        />
        </>)}>
        </Card>

    </Container>
  
);



}