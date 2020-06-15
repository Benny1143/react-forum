import React, { Component } from 'react';
import './Forum.scss';
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
            <div className="container">
                <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                    <div>1 - 2</div>

                    <div>
                        <h2>Welcome to the SmartGuppy Forum!</h2>
                        <p>This is the palce where you can reach out to our vibrant community and ask questions.</p>
                    </div>

                    <form onSubmit={this.handleSubmit}>
                        <h4>CHOOSE SUBJECTS YOUR'RE INTERESTED IN</h4>
                        <input type="submit" value="Next" />
                        <div className="gridContainer">
                            {
                                list.map(item =>
                                    <div key={item} className="imageBox">

                                        <span className="boxText">{item}</span>
                                        <input
                                            type="checkbox"
                                            id={item}
                                            onChange={this.onChangeList}
                                            defaultChecked={false} />
                                        <label htmlFor={item}></label>
                                    </div>
                                )
                            }
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Forum;