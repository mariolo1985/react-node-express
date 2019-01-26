import React, { Component } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clicked: false,
            filePart: null,
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

    onFileDrop = (files) => {
        console.log('files: ', files);
        let file = files[0];
        file = {
            ...file,
            preview: URL.createObjectURL(file)
        };

        const fileToUpload = new FormData();
        fileToUpload.append('file', files[0], files[0].name);
        fileToUpload.append('partsBody', 'this is my part');
        axios.post('/api/addimage', fileToUpload)
            .then((response) => {
                console.log('post response', response);
                this.setState({
                    filePart: file
                });
            });
    }

    render() {
        const { clicked, filePart, message } = this.state;

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
                <Dropzone onDrop={this.onFileDrop} accept='image/*'>
                    {({ getRootProps, getInputProps, isDragActive }) => (
                        <div
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            {
                                isDragActive
                                    ? <p>Drop files here...</p>
                                    : <p>Try dropping some files here, or click to select files to upload.</p>
                            }
                            {
                                filePart !== null
                                && <img alt='file' src={filePart.preview} />
                            }
                        </div>
                    )}
                </Dropzone>
            </section>
        );
    }
}

export default App;
