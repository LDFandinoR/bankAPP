import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import bank from '../images/AdobeStock_487592829.jpeg';


export default function Home(){

    const {user, logout, loading} = useAuth();
    console.log('user from Home')
    console.log(user)
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout()
            //navigate('/login')
        } catch (error) {
            console.log(error);
        }
    }

    if (loading) return <h1>Loading</h1>

    return (
        <Container>
            <Row>
            <Col>
        <Card className="text-center" style={{ width: '35rem' }}>
            <Card.Header as="h5">Your Bank</Card.Header>
            <Card.Img variant="top" src={bank} />
            {user ? <>
                <Card.Body>
                    <Card.Title>Welcome to your Digital Bank {user.displaName || user.email}</Card.Title>
                    <Card.Text>
                    Here you can check your current balance and perform actions such as deposit and withdraw
                    </Card.Text>
                </Card.Body> 
                </> : <>
                <Card.Body>
                    <Card.Title>Welcome to your Digital Bank</Card.Title>
                    <Card.Text>
                    Please Login or Create a New Account and enjoy different functions like checking your current balance and perform actions such as deposit and withdraw
                    </Card.Text>
                </Card.Body>
                
                </>}
            <Card.Footer className="text-muted">
            Continue exploring your app through the navigation bar
            </Card.Footer>

      </Card>
      </Col>          
      </Row>
      </Container>

    );
}