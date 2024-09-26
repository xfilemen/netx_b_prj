import React, { Component } from 'react';
import styles from '/pages/styles/detail.module.css';
import requstData from '/data/regRequstList.json';


class RegDetail extends Component {
  render() {
    const { item } = this.props;
    return (
        <div className={styles.detail_content}>
            <h2>{item ? item.title : '데이터를 불러오는 중입니다...'}</h2>
        </div>
    );
  }
}

export default RegDetail;