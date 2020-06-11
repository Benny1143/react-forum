import React, { Component } from 'react';
// import { connect } from 'react-redux';

class Forum extends Component {
    constructor() {
        super()
        this.state = {
            subjects: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        let items = [...event.target.elements].filter(item => item.checked).map(item => item.id)
        console.log(items)
        this.setState({ subjects: items })
    }

    render() {
        const list = ['ENGLISH', 'ENGLISH LIT.', 'HISTORY', 'E. MATH', 'MALAY', 'A. MATH', 'BIOLOGY', 'PHYSICS']

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    {
                        list.map(item =>
                            <div className="form-check" key={item}>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={item}
                                    onChange={this.onChangeList}
                                    defaultChecked={false} />
                                <label className="form-check-label" htmlFor={item}>{item}</label>
                            </div>
                        )
                    }
                    <input type="submit" value="Next" />
                </form>
            </div>
        )
    }
}

export default Forum;