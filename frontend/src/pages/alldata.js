import React from "react";
import { useState } from "react";
//import FormCA from "../components/formca";
import { Card, Container, Table } from "react-bootstrap";
//import { UserContext } from "../App";



export default function AllData(){
    
    //const ctx = React.useContext(UserContext);
    //const [users, setUsers] = useState(ctx.users);
    //console.log(ctx)
    const [data, setData] = React.useState('');
    /*React.useEffect(() => {
      // Fetch all accounts from API
      fetch('/account/all')
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setData(JSON.stringify(data));
        });
    }, [])*/


  return (
      <Container>
        <Card>
        <Card.Header as="h5">Accounts</Card.Header>
        <Card.Body>
        
          <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, ind) => {
                console.log(user);
                return (
                <tr key={ind}>
                    <td>{ind}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user.balance}</td>
                </tr>
                )

            })}

          </tbody>
        </Table>
        </Card.Body>
    </Card>
      </Container>
    
  );
}