import React, { Component } from 'react';
import './Forum.scss';

class Forum extends Component {
    render() {
        return (
            <div className="container mainContainer">
                <div className="col-lg-2">
                    <div className="shadow">
                        Left side
                    </div>
                </div>
                <div className="col-lg-8">
                    <div style={{ textAlign: "center" }} className="cardlist">
                        <div className="card">
                            Main
                        </div>
                    </div>
                </div>
                <div className="col-lg-2">
                    <div className="shadow">
                        Right side
                    </div>
                </div>
            </div>
        );
    }
}

export default Forum;