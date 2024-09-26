import React, { Component } from 'react';
import styles from '/pages/styles/detail.module.css';
import requstData from '/data/regRequstList.json';
import Link from 'next/link';

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIdx: 0,
    };
  }

  handleToggle = (index) => {
    this.setState({ selectedIdx: index });
  };
  
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
    return (
      <div className={styles.list_items}>
        <ul>
        {requstData.length > 0 ? (
          requstData.map((item, index) => (
            <li key={item.id} onClick={() => this.handleToggle(index)} className={`${this.state.selectedIdx === index ? styles.on : ''}`}>
              <Link href={''}>
                <div className={`${styles.state} ${this.getStatusClass(item.status)}`}>
                  {this.getStatusText(item.status)}
                </div>
                <div className={styles.section}>
                  <p className={styles.tit_tx}>{item.title}</p>
                  <div className={styles.tx_info}>
                    <div className={styles.priority}>우선순위 <span className={`${styles.prior} ${this.getPriorityClass(item.priority)}`}>{item.priority}</span></div>
                    <div className={styles.date}>요청일 {item.date}</div>
                    <div className={styles.num}>요청인원 {item.requestedBy}명</div>
                  </div>
                </div>
              </Link>
            </li>
          ))
        ) : (
          <li className={styles.nodata}>데이터가 없습니다.</li>
        )}
        </ul>
      </div>
    );
  }
}

export default ItemList;