import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import cx from 'classnames';
import styles from './Onboarding.module.scss';

class Forum extends Component {
    static propTypes = {
        pushState: PropTypes.func.isRequired
    };

    constructor() {
        super()
        this.state = {
            subjects: [],
            levelsInterests: [],
            stage: 1
        }

        this.subjects = ['ENGLISH', 'ENGLISH LIT.', 'HISTORY', 'E. MATH', 'MALAY', 'A. MATH', 'BIOLOGY', 'PHYSICS']
        const createLevels = (n, name) => Array(n).fill().map((_, i) => name + (i + 1))
        this.levels = [
            ...createLevels(6, 'Primary '),
            ...createLevels(5, 'Secondary '),
            ...createLevels(2, 'JC'),
            'Exams Strategies', 'Sports CCAs', 'Uniformed Groups CCAs', 'Performing Arts CCAs'
        ]
    }

    handleSubmit(event) {
        event.preventDefault();
        const items = [...event.target.elements].filter(item => item.checked).map(item => item.id)
        this.setState(({ stage }) => {
            let a = { stage: stage + 1 }
            a[stage === 1 ? "subjects" : stage === 2 ? "levelsInterests" : ""] = items
            return a;
        }, () => {
            if (this.state.stage === 3) {
                const { subjects, levelsInterests } = this.state
                console.log(subjects, levelsInterests)
                //submit data to database
                setTimeout(_ => this.props.pushState('/forum'), 2000);
            }
        })
    }

    backFirst = () => this.state.stage === 2 && this.setState({ stage: 1 })

    render() {
        const stage = this.state.stage;
        return (
            <div className={cx(styles.mainContainer, "container")} >
                <div className={styles.navRow}>
                    <div
                        className={stage === 1 ? styles.selector : cx(styles.finished, stage === 2 && styles.clickable)}
                        onClick={this.backFirst.bind(this)}>
                        <span>1</span>
                    </div>
                    <div className={cx(styles.dash, stage !== 1 && styles.highlight)}></div>
                    <div className={stage === 1 ? styles.lock : stage === 2 ? styles.selector : styles.finished}>
                        <span>2</span>
                    </div>
                </div>
                <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                    <div className={styles.headingRow}>
                        <span className={styles.headingText}>
                            {stage === 3 ? "Personalizing your feed." : "Welcome to the SmartGuppy Forum!"}
                        </span>
                        <p>
                            {"This " + (stage === 3 ? "will take a minute" : "is the palce where you can reach out to our vibrant community and ask questions.")}
                        </p>
                    </div>
                    {stage !== 3 &&
                        <div>
                            <form onSubmit={this.handleSubmit.bind(this)} className={cx(stage !== 1 && styles['d-none'])}>
                                <div className={styles.subBar}>
                                    <span>CHOOSE SUBJECTS YOU'RE INTERESTED IN</span>
                                    <button className={styles.nextButton} type="submit">NEXT</button>
                                </div>
                                <div className={styles.gridContainer}>
                                    {this.subjects.map(item =>
                                        <label htmlFor={item} key={item}>
                                            <div className={styles.imageBox}>
                                                <span className={styles.boxText}>{item}</span>
                                                <div className={styles.round}>
                                                    <input type="checkbox" id={item} defaultChecked={false} />
                                                    <label htmlFor={item}></label>
                                                </div>
                                            </div>
                                        </label>
                                    )}
                                </div>
                            </form>
                            <form onSubmit={this.handleSubmit.bind(this)} className={cx(stage !== 2 && styles['d-none'])}>
                                <div className={styles.subBar}>
                                    <span>CHOOSE YOUR LEVEL & INTEREST</span>
                                    <button className={styles.nextButton} type="submit">FINISH</button>
                                </div>
                                <div>
                                    <input type="text" className={styles.searchInput} placeholder="Search..." />
                                    <div className={styles.levelsGrid}>
                                        {this.levels.map(item =>
                                            <div key={item}>
                                                <div className={styles.round}>
                                                    <input type="checkbox" id={item} defaultChecked={false} />
                                                    <label htmlFor={item}></label>
                                                </div>
                                                <label className={styles.clickable} htmlFor={item}>{item}</label>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </div>
                    }
                </div>
            </ div>
        )
    }
}

export default connect(
    null,
    { pushState: push }
)(Forum);