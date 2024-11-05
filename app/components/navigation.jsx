"use client";

import styles from '@styles/header.module.css';
import React, { Component } from 'react';
import Link from 'next/link';

class NaviList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIdx: 0,
    };
  }

  componentDidMount() {
    const pathname = window.location.pathname;
    const idx = this.getIndexFromPath(pathname); // 현재 URL에 맞는 index를 설정
    this.setState({ selectedIdx: idx });
  }

  getIndexFromPath = (path) => {
    switch (path) {
      case '/request':
        return 0;
      case '/detail':
        return 1;
      case '/notice':
        return 2;
      default:
        return 0;
    }
  };

  handleToggle = (index) => {
    this.setState({ selectedIdx: index });
  };

  render() {
    const items = [
      { text: '인력 요청', link: '/request' },
      { text: '인력 요청 내역', link: '/detail' },
      { text: '공지사항', link: '/notice' },
    ];

    return (
      <ul>
        {items.map((item, index) => (
          <li key={index} onClick={() => this.handleToggle(index)} className={`${styles.listItem} ${this.state.selectedIdx === index ? styles.on : ''}`}>
            <Link href={item.link}>{item.text}</Link>
          </li>
        ))}        
      </ul>
    );
  }
}

export default NaviList;