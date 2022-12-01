import React, { useState } from "react";
import { Form, InputGroup, Button, Container, Col, Card } from "react-bootstrap";
import { Field, useFormik, Feedback } from "formik";

export default function FormCA(){

    //const [form, setForm] = useState({});
    //const [errors, setErrors] = useState({});


    const formik = useFormik({
      initialValues: {
        name:'',
        email: '',
        password:''
      },

      handleSubmit: event => {
        event.preventDefault();
      },
  
      onSubmit: (values) => {
          //alert(JSON.stringify(values, null, 2));
          alert('Thank you for signing up!')
        }, 
      
      validate: values => {
        let re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        let errors = {};
        if (!values.name) errors.name = 'Field required';
        if (values.password.length < 8) errors.password = 'it must contain at least 8 characters';
        if (!values.email) errors.email = 'Field required';
        else if (!re.test(values.email)) errors.email = 'Username should be an email';
        return errors;
      }
  
    });

    return (
      <Container>
        
        <Form onSubmit={formik.handleSubmit}>

        <Form.Group>
            <Form.Label>Name</Form.Label>
            <InputGroup>
                <Form.Control 
                    id="nameField" 
                    name="name" 
                    type="text" 
                    onChange={formik.handleChange} 
                    value={formik.values.name}
                    isInvalid = {formik.errors.name}
                    />
                <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
            </InputGroup>
        </Form.Group>

        <Form.Group>
            <Form.Label>Email</Form.Label>
            <InputGroup>
                <Form.Control 
                    id="emailField" 
                    name="email" 
                    type="text" 
                    onChange={formik.handleChange} 
                    value={formik.values.email}
                    isInvalid = {formik.errors.email}
                    />
                <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
            </InputGroup>
        </Form.Group>

        <Form.Group>
            <Form.Label>Password</Form.Label>
            <InputGroup>
                <Form.Control 
                    id="passwordField" 
                    name="password" 
                    type="text" 
                    onChange={formik.handleChange} 
                    value={formik.values.password}
                    isInvalid = {formik.errors.password}
                    />
                <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
            </InputGroup>
        </Form.Group>

        <Col>
            <Button
                disabled={!formik.isValid || formik.isSubmitting}
                variant="success"
                as="input"
                size="lg"
                type="submit"
                value="Submit"
            />
            </Col>
  
        </Form>
        
      </Container>
    );
  }
