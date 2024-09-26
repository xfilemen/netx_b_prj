import React, { Component } from 'react';
import styles from '/pages/styles/detail.module.css';


class RegDetail extends Component {
  render() {
    const { item } = this.props;
    return (
        <div className={styles.detail_content}>
            <h2>{item ? item.title : ''}</h2>
        </div>
    );
  }
}

export default RegDetail;