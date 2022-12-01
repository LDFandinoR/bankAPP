import React from "react";
import { Card, Button } from "react-bootstrap";
import bank from '../images/AdobeStock_487592829.jpeg';


export default function Home2(){
  
    return (
      <Card className="bg-dark text-white text-center text-strong">
      <Card.Img src= {bank} alt="Card image" />
      <Card.ImgOverlay>
        <Card.Title>BadBank</Card.Title>
        <Card.Title>
        Welcome to your digital bank.
        </Card.Title>
        <Card.Text>
        Here you can check your current balance and perform actions such as deposit and withdraw
        </Card.Text>
        <Card.Text>Continue exploring your app through the navigation bar</Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
  }