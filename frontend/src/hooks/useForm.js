import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
//import { UserContext } from "../App";
import { useNavigate } from "react-router";
import axios from "axios";
import { useAuth } from "../context/authContext";



export function useForm(initialForm, validateForm){
    
    //const ctx = React.useContext(UserContext);
    const {signup} = useAuth();
    const navigate = useNavigate();
    
    const [form, setForm] = React.useState(initialForm); // form values
    const [errors, setErrors] = React.useState({});
    const [error, setError] = useState(); // este es error de firebase
    const [loading, setLoading] = React.useState(false);
    const [response, setResponse] = React.useState(null);
    const [show, setShow] = React.useState(true);    //
    const [status, setStatus] = React.useState(false); // true: no error, false: error

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm({
            ...form, 
            [name]:value,
        });     
    }

    const handleBlur = (e) => {
        handleChange(e);
        setErrors(validateForm(form));
        if (Object.keys(errors).length === 0){
            setStatus(true);
        } else {setStatus(false)}
    }

    const handleSubmit = (e) => { // This function aparently is never reached
        e.preventDefault();
        console.log('handleSubmit')
        signup(form.email, form.password)

    }

    const handleCreate = async (e) => {
        e.preventDefault();
        setErrors(validateForm(form));
        setError('');
        if (Object.keys(errors).length === 0){
            await signup(form.email, form.password)
            .then(() => {
                axios.post(`${process.env.REACT_APP_API_URL}/user`, {
                    name: form.name,
                    email: form.email
                }).then(function(response){
                    alert('Thank you for signing up!');
                }).catch(function(error){
                    setError(error)
                    alert(error)
                })
            });
            
            /*try {
                await signup(form.email, form.password)
                alert('Thank you for signing up!');
                navigate('/')
            }catch(error){
                setError(error.message);
                alert(error);

            }*/
            //signup(form.email, form.password)
            //alert('Thank you for signing up!');
            /*const url = `/account/create/${form.name}/${form.email}/${form.password}`; // Llamada al back end
                (async () => {
                    var res = await fetch(url);
                    var data = await res.json();
                    console.log(data);
                })();*/ 
        
        setShow(false);
    }};
    /*
    const handleCreate = (e) => {
        e.preventDefault();
        setErrors(validateForm(form));
        if (Object.keys(errors).length === 0){
            alert('Thank you for signing up!');
            setLoading(true);
            ctx.users.push({name: form.name, email: form.email, password:form.password, balance:0});
        }
        //ctx.users.push({name: form.name, email: form.email, password:form.password, balance:0});
        console.log(ctx)
        setShow(false);
    }
    */

    const clearForm = (e) => {
        e.preventDefault();
        setForm(initialForm);
        setShow(true);
        /*let {name, value} = form;
        setForm({[name]: "",})
        console.log(form);*/
    }



    return {
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
    }

};