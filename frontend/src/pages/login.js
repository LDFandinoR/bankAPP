//require('dotenv').config();
//import * as dotenv from 'dotenv'
import React from "react";
import { Card, Container, Button, Form, InputGroup, Col, ButtonGroup, ButtonToolbar } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useAuth } from "../context/authContext";
import axios from 'axios'


export default function Login(){

    //const [email, setEmail]      = React.useState('');
    //const [password,setPassword] = React.useState('');
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });
    const [show, setShow]     = React.useState(true);
    const [status, setStatus] = React.useState('');   
    const [error, setError] = React.useState('');   


    const { login, loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser({
            ...user, 
            [name]:value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(user.email, user.password)
            alert('You are successfully logged in!');
            navigate('/home')
        }catch(error){
            setError(error.message);
            alert(error);
        }
        setShow(false);
    };

    const handleGoogleLogin = async () => {
        await loginWithGoogle()
        .then((userA) => { 
            //console.log("en el then ", userA.user.displayName)
            axios.post(`${process.env.REACT_APP_API_URL}/user`, {
            name: userA.user.displayName,
            email: userA.user.email
        }).then(function (response) { 
            console.log(response)       
        }).catch(function(error) {
            console.log("Error en handleGoogleLogin: ",error);
        });
        navigate('/home')
        })

        /*try {
            await loginWithGoogle().
            navigate('/home')
        } catch (error) {
            setError(error.message)
        }*/

    }

        

    /*fetch(`/account/login/${email}/${password}`)
        .then(response => response.text())
        .then(text => {
            try {
                const data = JSON.parse(text);
                setStatus('');
                setShow(false);
                console.log('JSON:', data);
            } catch(err) {
                setStatus(text)
                console.log('err:', text);
            }
        });*/

    return (
        <Container>
            {show ? (<>
            <Card>
                <Card.Header className="text-center" as="h5">Login</Card.Header>
                <Card.Body>
                <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <InputGroup>
                        <Form.Control 
                            id="emailField" 
                            name="email" 
                            type="text" 
                            placeholder="Email" 
                            //onBlur={handleBlur}  
                            value={user.email}
                            onChange = {handleChange}
                            //onChange={e => setEmail(e.currentTarget.value)}
                            //isInvalid = {!!errors.email}
                            />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                        <Form.Control 
                            id="passwordField" 
                            name="password" 
                            type="password" 
                            placeholder="Password" 
                            //onBlur={handleBlur}
                            value={user.password}
                            onChange = {handleChange}
                            //onChange={e => setPassword(e.currentTarget.value)}
                            //isInvalid = {!!errors.password}
                            />
                        
                    </InputGroup>
                </Form.Group>
                <ButtonToolbar className="mb-3">
                <ButtonGroup>
                <Button
                    variant="primary"
                    as="input"
                    size="lg"
                    type="submit"
                    value="Login"
                    onClick={handleLogin}
                ></Button>
                </ButtonGroup>
                </ButtonToolbar>
                </Form>

                <ButtonToolbar className="mb-3">
                <ButtonGroup>
                <Button
                    variant="primary"
                    as="input"
                    size="lg"
                    type="submit"
                    value="Login with Google"
                    onClick={handleGoogleLogin}
                ></Button> {' '}
                </ButtonGroup>
                </ButtonToolbar>

                </Card.Body>
            </Card>
            </>
            ):(<>
                <Card className="text-center" >
                <Card.Header as="h5">Invalid User</Card.Header>
                <Card.Body>
                <Card.Title>Try again</Card.Title>
                <Card.Text>
                The entered email does not exit or the password is incorrect. Please, complete the login form again
                </Card.Text>
                  <Button
                    variant="success"
                    as="input"
                    size="lg"
                    type="submit"
                    value="Authenticate again"
                    onClick={() => {setShow(true)}}
                />
                </Card.Body>
                </Card>
                </>)
                }
        </Container>
    )
}
