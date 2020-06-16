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
            <div className="container mainContainer">
                <div className="navRow">
                    <div className="unfinished"><span>1</span></div>
                    <div className="dash"></div>
                    <div className="lock"><span>2</span></div>
                </div>
                <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                    <div className="headingRow">
                        <span className="headingText">Welcome to the SmartGuppy Forum!</span>
                        <p style={{ fontWeight: 600 }}>This is the palce where you can reach out to our vibrant community and ask questions.</p>
                    </div>

                    <form onSubmit={this.handleSubmit}>
                        <div className="subBar">
                            <span>CHOOSE SUBJECTS YOU'RE INTERESTED IN</span>
                            <button className="nextButton" type="submit">NEXT</button>
                        </div>

                        <div className="gridContainer">
                            {
                                list.map(item =>
                                    <div key={item} className="imageBox">
                                        <span className="boxText">{item}</span>
                                        <div className="round">
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
            </div >
        )
    }
}

export default Forum;