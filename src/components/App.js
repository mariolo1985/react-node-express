import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clicked: false,
            message: ''
        };
    }

    onBtnClick = () => {
        const { clicked, message } = this.state;

        try {
            this.putDataToDB(message);
        } catch (e) {
            console.log('putDataToDB err: ', e);
        }

        this.setState({
            clicked: !clicked
        });
    }

    putDataToDB = (message) => {
        axios.post('/api/putData', {
            message
        });
    };

    onTextChange = (text) => {
        this.setState({
            message: text.target.value
        });
    }

    render() {
        const { clicked, message } = this.state;

        return (
            <section className='app-container'>
                <h1>Hello World</h1>
                <h2>This is my first React-Node app</h2>
                <p>Send me a message below:</p>
                <textarea className='message-box' placeholder='Enter message here' type='text' onChange={text => this.onTextChange(text)}></textarea>
                {
                    message !== ''
                    && (
                        <div className='message-container'>
                            <p className='bold'>Your message:</p>
                            <p className='your-message'>
                                {message}
                            </p>
                        </div>
                    )
                }
                {
                    clicked
                        ? <div>Message sent! I can&#39;t wait to read it!</div>
                        : <div className='btn-container'><button type='button' onClick={() => this.onBtnClick()}>{!clicked && 'Send Message'}</button></div>
                }
            </section>
        );
    }
}

export default App;
