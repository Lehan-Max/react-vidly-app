import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';

class RegisterForm extends Form {
    state = { data: {username: '', password: '', email: ''}, errors: {}
    }

    schema = {
        username: Joi.string()
            .required()
            .label('Name'),
        password: Joi.string()
            .min(5)
            .required()
            .label('Password'),
        email: Joi.string()
            .required()
            .email()
            .label('email')
    }

    doSubmit = () => {
        //Call the Server
        console.log('Submitted!!')
    }

    render() { 
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('email', 'Email')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderInput('username', 'User Name')}
                    {this.renderButton('Register')}
                </form>
            </div>
        );
    }
}
 
export default RegisterForm;
