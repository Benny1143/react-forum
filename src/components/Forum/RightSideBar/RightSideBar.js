import React, { Component } from 'react';
import { withRouter } from 'react-router';
import cx from 'classnames';
import styles from './RightSideBar.module.scss';
import { card } from '../Forum.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserImg from '../UserImg/UserImg';

class SettingUp extends Component {
    constructor() {
        super()
        this.state = {
            list: ["Visit your feed", "Follow 3 topics", "Follow 5 more topics", "Upvote 5 good answers", "Ask a question", "Answer a question"]
                .map(text => ({ text, check: false }))
        }
    }

    componentDidMount() {
        this.setState(({ list }) => {
            const l = [...list]
            l[0].check = true
            l[1].check = true
            return { list: l }
        })
    }

    render() {
        return (
            <div className={cx(styles.settingup, card)}>
                <div>Finish Setting Up Your Account</div>
                <div>
                    {this.state.list.map(({ text, check }) =>
                        <div key={text}>
                            <FontAwesomeIcon icon="check" className={cx(!check && styles.unselect)} />
                            <span>{text}</span>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

class SideBar extends Component {
    constructor() {
        super()
        this.state = {
            top: [{
                name: "Shen Loke",
                avatar: ""
            }, {
                name: "Aloha Two",
                avatar: ""
            }, {
                name: "Jenny Lin",
                avatar: ""
            }, {
                name: "Random Person 1",
                avatar: ""
            }, {
                name: "Kenneth Wong",
                avatar: ""
            }]
        }
    }

    render() {
        return (
            <div>
                <div className={cx(styles.tutors, card)}>
                    <div>This Week's Top Tutors</div>
                    <div>
                        {this.state.top.map(({ name, avatar }, i) => <div key={name}><span>{i + 1}</span><UserImg alt={{ name, avatar }} />{name}</div>)}
                    </div>
                </div>
                <div className={cx(styles.text, card)}>
                    <div>Welcome To SmartGuppy's Q&A Page!</div>
                    <div>
                        Post your school-related questions here and have them answered by other tutors and students!
                        <br />
                        <br />
                        For tutors, stand a chance to be featured as a top tutor by providing quick and accurate answers!
                    </div>
                </div>
            </div>
        )
    }
}


class RightSideBar extends Component {
    render() {
        const { match: { url } } = this.props
        const settingUpDone = false
        return (
            <div className={styles.mainContainer}>
                {url === '/forum' && !settingUpDone ? <SettingUp /> : <SideBar />}
            </div>
        )
    }
}

export default withRouter(RightSideBar);