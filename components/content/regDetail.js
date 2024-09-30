import React, { Component } from 'react';
import styles from '/pages/styles/detail.module.css';


class RegDetail extends Component {
  

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

  getPriorityClass(priority) {
    switch (priority) {
      case 'High':
        return styles['h'];
      case 'Medium':
        return styles['m'];
      case 'Low':
        return styles['l'];;
      default:
        return priority;
    }
  }

  render() {
    const { item } = this.props;
    return (
      item && (
        <div className={styles.detail_content}>
            <div className={`${styles.state} ${this.getStatusClass(item.status)}`}>
              {this.getStatusText(item.status)}
            </div>
            <h2>{item.title}</h2>
            <div className={styles.tx_info}>
              <div className={styles.priority}>우선순위 <span className={`${styles.prior} ${this.getPriorityClass(item.priority)}`}>{item.priority}</span></div>
              <div className={styles.date}>요청일 {item.date}</div>
              <div className={styles.num}>요청인원 {item.requestedBy}명</div>
            </div>
        </div>
      )
    );
  }
}

export default RegDetail;