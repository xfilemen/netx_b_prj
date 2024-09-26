import React, { Component } from 'react';
import styles from '/pages/styles/detail.module.css';
import requstData from '/data/regRequstList.json';


class RegDetail extends Component {
  render() {
    const { item } = this.props;
    return (
        <div className={styles.detail_content}>
            <h2>{item.title}</h2>
        </div>
    );
  }
}

export default RegDetail;