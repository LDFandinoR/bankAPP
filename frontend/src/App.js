import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import { withRouter } from "react-router";
//import bootstrap from 'react-bootstrap';
import Feedback from 'react-bootstrap/Feedback'
//import './App.css';
import { Navbar, Nav } from "react-bootstrap"
import CreateAccount from "./pages/createaccount";
import Home from "./pages/home";
import Login from "./pages/login";
import Header from "./components/header";
import ErrorPage from "./pages/errorpage";
import AllData from "./pages/alldata";
import Deposit from "./pages/deposit";
import Whithdraw from "./pages/withdraw";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./pages/protectedRoutes";


//const HeaderWithRouter = withRouter(Header);
//export const UserContext = React.createContext(null); Replaced by AuthContext, AuthProvider <UserContext.Provider value ={{users:[{name:'juan', email: 'juan@mit.edu', password:'secret', balance:100}, {name:'ana', email: 'ana@mit.edu', password:'secret2', balance:100} ]}}></UserContext.Provider> 
/*<Route path="/deposit"         element={<ProtectedRoute><Deposit /></ProtectedRoute>} />
          <Route path="/withdraw"        element={<ProtectedRoute><Whithdraw /></ProtectedRoute>} />
          <Route path="/alldata"         element={<ProtectedRoute><AllData /></ProtectedRoute>} />
          
          
          

          <Route path="*" element={<ErrorPage />} />*/

function App() {
  return (
    <div className="App">
      <AuthProvider>
    <Router>
    
      <Header />
        <Routes>
          <Route path="/login"           element={<Login />} />
          <Route path="/createaccount"   element={<CreateAccount />} />
          <Route path="/"         element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/home"            element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/deposit"         element={<ProtectedRoute><Deposit /></ProtectedRoute>} />
          <Route path="/withdraw"        element={<ProtectedRoute><Whithdraw /></ProtectedRoute>} />
          <Route path="/alldata"         element={<ProtectedRoute><AllData /></ProtectedRoute>} />
        </Routes>
        
    </Router>
    </AuthProvider>
  </div>
  );
}

export default App;
