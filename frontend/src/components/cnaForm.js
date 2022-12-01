import { useForm } from "../hooks/useForm";
import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { initialForm, validationsForm } from "../components/caForm";


export default function CNAForm(){
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
        <Card> 
        <Button
            variant="success"
            as="input"
            size="lg"
            type="submit"
            value="Create New Account"
            onClick={clearForm}
        />
        </Card>
    );

}