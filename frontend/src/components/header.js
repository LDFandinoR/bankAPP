import { Navbar, Nav, Container, Button } from "react-bootstrap"
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Tooltip from 'react-tooltip-lite';
import { useAuth } from "../context/authContext";
import { ProtectedRoute } from "../pages/protectedRoutes";



export default function Header(){

  const [basicActive, setBasicActive] = useState('/');

  const {user, logout, loading} = useAuth();
    //console.log('user from Home')
    //console.log(user)
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout()
            navigate('/login')
        } catch (error) {
            console.log(error);
        }
    }

  if (loading) return <h1>Loading</h1>


  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  };

    //const { location } = props;
    return (
        <>
      <Navbar collapseOnSelect expand="lg" bg="secondary" variant="dark" className="mb-4">
        <Container fluid>
        
          <Navbar.Brand href="#">Your Bank App</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">

            <Nav className="justify.content.center" bg="secondary" defaultActiveKey="/">

              <Tooltip content="Home" 
                direction="bottom"
                tagName="nav-item"
                background="white"
                className="target">
                <Nav.Item>
                  <Nav.Link onClick={() => handleBasicClick('/')} active={basicActive === '/'}as={Link} to="/home">Home</Nav.Link>
                </Nav.Item> 
              </Tooltip> 

              
              <Tooltip content="Desposit" 
                direction="bottom"
                tagName="nav-item"
                background="white"
                className="target">
                <Nav.Item>
                  <Nav.Link onClick={() => handleBasicClick('/deposit')} active={basicActive === '/deposit'} as={Link} to="/deposit">Deposit</Nav.Link>
                </Nav.Item>
              </Tooltip>

              <Tooltip content="Withdraw" 
                direction="bottom"
                tagName="nav-item"
                background="white"
                className="target">
                <Nav.Item>
                  <Nav.Link onClick={() => handleBasicClick('/withdraw')} active={basicActive === '/withdraw'} as={Link} to="/withdraw">Withdraw</Nav.Link>
                </Nav.Item>
              </Tooltip>

            </Nav>
            {user ? <>
              <Navbar.Collapse className="justify-content-end">
                <Nav className="justify.content.center" bg="secondary">
                  <Navbar.Text>
                    Signed in as: {user.displayName || user.email} {' '}
                  </Navbar.Text>
                
                  {' '}

                  <Button 
                    variant="primary"
                    as="input"
                    size="sm"
                    type="submit"
                    value="Log Out"
                    onClick={handleLogout}
                    ></Button>
                </Nav>

              </Navbar.Collapse>
            </>: <>
            <Navbar.Collapse className="justify-content-end">
              <Nav className="justify.content.center" bg="secondary">
                
                <Tooltip content="Login" 
                    direction="bottom"
                    tagName="nav-item"
                    background="white"
                    className="target">
                    <Nav.Item>
                      <Nav.Link onClick={() => handleBasicClick('/login')} active={basicActive === '/login'}as={Link} to="/login">Login</Nav.Link>
                    </Nav.Item> 
                </Tooltip> 
                
                <Tooltip content="Create Account"   
                    direction="bottom"
                    tagName="nav-item"
                    background="white"
                    className="target">
                    <Nav.Item>
                      <Nav.Link onClick={() => handleBasicClick('/createaccount')} active={basicActive === '/createaccount'} as={Link} to="/createaccount">Create Account</Nav.Link>
                    </Nav.Item>
                </Tooltip>

              </Nav>
              </Navbar.Collapse>

            </> }
            
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <section>
        <Outlet>
        </Outlet>
      </section>

      
      </>
    );
  };

/*  <Tooltip content="All Data" 
            direction="bottom"
            tagName="nav-item"
            background="white"
            className="target">
            <Nav.Item>
              <Nav.Link onClick={() => handleBasicClick('/alldata')} active={basicActive === '/alldata'} as={Link} to="/alldata">Data</Nav.Link>
            </Nav.Item>
          </Tooltip>*/
