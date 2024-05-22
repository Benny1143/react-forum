import React, { Component } from 'react';
import styles from './Loading.module.scss';

class Loading extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className={styles.loading}>
        <img src={require('./loading.svg')} alt="Loading..." />
      </div>
    );
  }
}

export default Loading;
