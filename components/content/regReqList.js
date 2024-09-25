import React, { Component } from 'react';
import styles from '/pages/styles/detail.module.css';
import requstData from '/data/regRequstList.json';
import Link from 'next/link';

class ItemList extends Component {
  getStatusText(status) {
    switch (status) {
      case 'register':
        return '접수';
      case 'progress':
        return '진행';
      case 'cancel':
        return '취소';
      case 'return':
        return '반려';
      case 'complete':
        return '완료';
      default:
        return status; // 다른 상태는 원래 값을 사용
    }
  }

  getStatusClass(status) {
    switch (status) {
      default:
        return styles[status];
    }
  }

  render() {
    return (
      <div className={styles.list_items}>
        <ul>
          {requstData.map((item) => (
            <li key={item.id}>
              <Link href={''}>
                <div className={`${styles.state} ${this.getStatusClass(item.status)}`}>
                  {this.getStatusText(item.status)}
                </div>
                <div className={styles.section}>
                  <p className={styles.tit_tx}>{item.title}</p>
                  <div className={styles.tx_info}>
                    <div className={styles.priority}>우선순위 <span>{item.priority}</span></div>
                    <div className={styles.date}>요청일 {item.date}</div>
                    <div className={styles.num}>요청인원 {item.requestedBy}</div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ItemList;