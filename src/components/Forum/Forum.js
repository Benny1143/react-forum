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
                <div class="row">
                    <div>1 - 2</div>
                </div>
                <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                    <div>
                        <h2>Welcome to the SmartGuppy Forum!</h2>
                        <p>This is the palce where you can reach out to our vibrant community and ask questions.</p>
                    </div>

                    <form onSubmit={this.handleSubmit}>
                        <div className="subBar">
                            <h4>CHOOSE SUBJECTS YOUR'RE INTERESTED IN</h4>
                            <button className="nextButton" type="submit">NEXT</button>
                        </div>

                        <div className="gridContainer">
                            {
                                list.map(item =>
                                    <div key={item} className="imageBox">
                                        <span className="boxText">{item}</span>

                                        <div class="round">
                                            <input
                                                type="checkbox"
                                                id={item}
                                                onChange={this.onChangeList}
                                                defaultChecked={false} />
                                            <label htmlFor={item}></label>
                                        </div>

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