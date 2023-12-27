import React, { useState } from 'react';

export default function StudentForm(props) {
    const [studentInfo, setStudentInfo] = useState({
        name: '',
        no: '',
        email: ''
    });

    // Validation of forms
    const [whatsNOStyle, setWhatsNOStyle] = useState({
        borderColor: '', // set to your default borderColor
        color: '',        // set to your default text color
      });
    const [emailStyle, setEmailStyle] = useState({
    borderColor: '', // set to your default borderColor
    color: '',        // set to your default text color
    });

    const handleForm = (event) => {
        const { name, value } = event.target;
        setStudentInfo((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const formSubmit = () => {
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(studentInfo.email) && /^(\+\d{1,3}[- ]?)?\d{10}$/.test(studentInfo.no)){
            fetch(`https://chatbot-nmce.vercel.app/post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(studentInfo),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Form submitted successfully:', data);
                // Optionally, you can perform additional actions after a successful request
                setStudentInfo({
                    name: '',
                    no: '',
                    email: ''
                });
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                // Handle errors or provide feedback to the user
            });
        } else if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(studentInfo.email))){
            setEmailStyle({
                borderColor: 'red',
                color: 'red',
              });
        }else{
            setWhatsNOStyle({
                borderColor: 'red',
                color: 'red',
              });
        }
    };

    return (
        <div className='form bot-message '>
            <h3>Enter your details below.</h3>
            <input
                className='in1'
                name='name'
                type='text'
                placeholder='Name'
                value={studentInfo.name}
                onChange={handleForm}
            />
            <input
                className='in2'
                type='text'
                name='no'
                placeholder='Whatsapp Number'
                style={whatsNOStyle}
                value={studentInfo.no}
                onChange={handleForm}
            />
            <input
                className='in3'
                type='email'
                name='email'
                placeholder='Email'
                style={emailStyle}
                value={studentInfo.email}
                onChange={handleForm}
            />
            <div className='buttons'>
                <button type='button' onClick={formSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
}
