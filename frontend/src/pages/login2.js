import React from "react";
//import { UserContext } from "../App";

export default function Login2(){
    //const ctx = React.useContext(UserContext);
    console.log(ctx)
    const users = ctx.users;
    //console.log(JSON.stringify([ctx]))


    users.map((user, index) => {
      
      console.log(index)
      console.log(user.name)
      console.log(user.email)
      console.log(user.password)
      console.log(user.deposit)

  })

    return (
      
      <h5>Login
        console.log(ctx)
      console.log(JSON.stringify([ctx]))
      </h5>
    
    );
  }