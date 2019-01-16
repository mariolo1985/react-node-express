import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isExpanded: false
        };
    }

    onBtnExpandClick = () => {
        const { isExpanded } = this.state;
        this.setState({
            isExpanded: !isExpanded
        });

        try {
            this.putDataToDB('My test db message');
        } catch (e) {
            console.log('putDataToDB err: ', e);
        }
    }

    putDataToDB = (message) => {
        axios.post('/api/putData', {
            message
        });
    };

    render() {
        const { isExpanded } = this.state;

        return (
            <section className='app-container'>
                <h1>Hello World</h1>
                {
                    isExpanded
                    && <div>Yay Expanded</div>
                }
                <button type='button' onClick={() => this.onBtnExpandClick()}>{isExpanded ? 'Collapse' : 'Expand'}</button>
            </section>
        );
    }
}

export default App;
