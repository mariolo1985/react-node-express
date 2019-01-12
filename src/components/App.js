import React, { Component } from 'react';

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
    }

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
