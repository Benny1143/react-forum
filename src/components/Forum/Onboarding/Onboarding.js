import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import cx from 'classnames';
import styles from './Onboarding.module.scss';

class Onboarding extends Component {
    static propTypes = { pushState: PropTypes.func.isRequired };

    constructor() {
        super()
        this.state = {
            subjects: [],
            levelsInterests: [],
            stage: 1,
            firstDone: false,
            filter: ""
        }

        this.subjects = ['ENGLISH', 'ENGLISH LIT.', 'HISTORY', 'E. MATH', 'MALAY', 'A. MATH', 'BIOLOGY', 'PHYSICS']
        const createLevels = (n, name) => Array(n).fill().map((_, i) => name + (i + 1))
        this.levels = [
            ...createLevels(6, 'Primary '),
            ...createLevels(5, 'Secondary '),
            ...createLevels(2, 'JC'),
            'Exams Strategies', 'Sports CCAs', 'Uniformed Groups CCAs', 'Performing Arts CCAs'
        ]

        this.handleSubmit = this.handleSubmit.bind(this)
        this.backFirst = this.backFirst.bind(this)
        this.search = this.search.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault();
        const items = [...event.target.elements].filter(item => item.checked).map(item => item.id)
        this.setState(({ stage }) => {
            let a = { stage: stage + 1, firstDone: true }
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

    search = (event) => this.setState({ filter: event.target.value.toLowerCase() })

    render() {
        const { stage, firstDone, filter } = this.state;
        const levels = this.levels.map(s => ({ item: s, display: s.toLowerCase().includes(filter) }));
        return (
            <div className={cx(styles.mainContainer, "container")} >
                <div className={styles.navRow}>
                    <div className={stage === 1 ? styles.selector : styles.finished}>
                        <span>1</span>
                    </div>
                    <div className={cx(styles.dash, firstDone && styles.highlight)}></div>
                    <div className={!firstDone ? styles.lock : stage === 2 ? styles.selector : styles.finished}>
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
                            <form onSubmit={this.handleSubmit} className={cx(stage !== 1 && styles['d-none'])}>
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
                            <form onSubmit={this.handleSubmit} className={cx(stage !== 2 && styles['d-none'])}>
                                <div className={styles.subBar}>
                                    <span>CHOOSE YOUR LEVEL & INTEREST</span>
                                    <div style={{ display: "flex" }}>
                                        <button className={styles.backButton} type="button" onClick={this.backFirst}>BACK</button>
                                        <button className={styles.nextButton} type="submit">FINISH</button>
                                    </div>
                                </div>
                                <div>
                                    <input type="text" className={styles.searchInput} placeholder="Search..." onChange={this.search} />
                                    <div className={styles.levelsGrid}>
                                        {levels.map(({ item, display }) =>
                                            <div key={item} className={display ? "" : styles['d-none']}>
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

export default connect(null, { pushState: push })(Onboarding);