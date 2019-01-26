import React, { Component } from 'react';
import axios from 'axios';
import { SignUpInput } from '.';

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            hasError: false,
            isSignUpSuccessful: false,
            errorMessage: '',
            name: '',
            password: '',
            username: ''
        };
    }

    onNameChange = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    onUsernameChange = (e) => {
        this.setState({
            username: e.target.value
        });
    }

    onPasswordChange = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    onEmailChange = (e) => {
        this.setState({
            email: e.target.value
        });
    }

    onSignUpClick = () => {
        const {
            email,
            name,
            username,
            password
        } = this.state;
        axios.post(
            '/autho/usersignup',
            {
                email,
                name,
                username,
                password
            }
        ).then((response) => {
            const { data, status } = response;
            if (status === 200) {
                if (data.success) {
                    // sign up success
                    this.setState({
                        hasError: false,
                        isSignUpSuccessful: true
                    });
                } else {
                    const { code } = data.error;
                    switch (code) {
                        case 'UsernameExistsException':
                            // username already exist
                            this.setState({
                                hasError: true,
                                errorMessage: `The username [${username}] has been taken. Please choose another one.`
                            });
                            break;
                        case 'InvalidPasswordException':
                            // password does not meet requirement
                            this.setState({
                                hasError: true,
                                errorMessage: 'The password does not meet the requirements'
                            });
                            break;
                        default:
                            this.setState({
                                hasError: true
                            });
                            break;
                    }
                }
            }
        });
    }

    render() {
        const { hasError, errorMessage, isSignUpSuccessful } = this.state;
        const inputConfig = [
            {
                handleOnChange: this.onNameChange,
                isRequired: false,
                inputType: 'text',
                labelText: 'Name',
                placeholderText: 'Enter Name'
            },
            {
                handleOnChange: this.onEmailChange,
                isRequired: true,
                inputType: 'email',
                labelText: 'Email',
                placeholderText: 'Enter Email'
            },
            {
                handleOnChange: this.onUsernameChange,
                isRequired: true,
                inputType: 'text',
                labelText: 'Username',
                placeholderText: 'Enter Username'
            },
            {
                handleOnChange: this.onPasswordChange,
                isRequired: true,
                inputType: 'password',
                labelText: 'Password',
                placeholderText: 'Enter Password'
            }
        ];

        return (
            <div className='sign-up-wrapper'>
                {
                    isSignUpSuccessful
                        ? (
                            <div className='sign-up-success-wrapper'>
                                <h1>You have successfully signed up for WTB Car Parts.</h1>
                                <h2>Please check your email for the confirmation code</h2>
                            </div>
                        )
                        : (
                            <form className='form-sign-up'>
                                {
                                    inputConfig.map(item => (
                                        <SignUpInput
                                            key={item.labelText}
                                            handleOnChange={item.handleOnChange}
                                            isRequired={item.isRequired}
                                            inputType={item.inputType}
                                            labelText={item.labelText}
                                            placeholderText={item.placeholderText}
                                        />
                                    ))
                                }
                                <button type='button' className='btn btn-sign-up' onClick={() => this.onSignUpClick()}>Sign Up</button>
                            </form>
                        )
                }
                {
                    hasError
                    && (
                        <div className='sign-up-error-wrapper'>
                            {errorMessage}
                        </div>
                    )
                }
            </div>
        );
    }
}

export default SignUp;
