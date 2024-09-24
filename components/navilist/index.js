import styles from '/pages/styles/detail.module.css';
import React, { Component } from 'react';
import Link from 'next/link';

class NaviList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIdx: 0,
    };
  }

  handleToggle = (index) => {
    this.setState({ selectedIdx: index });
  };

  render() {
    const items = ['정규 인력 요청·내역', 'BP인력 요청·내역', '공지사항'];

    return (
      <ul>
        {items.map((item, index) => (
          <li key={index} onClick={() => this.handleToggle(index)} className={`${styles.listItem} ${this.state.selectedIdx === index ? styles.on : ''}`}><Link href={''}>{item}</Link></li>
        ))}        
      </ul>
    );
  }
}

export default NaviList;