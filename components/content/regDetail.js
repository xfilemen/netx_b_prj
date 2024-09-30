import React, { Component } from 'react';
import styles from '/pages/styles/detail.module.css';
import Image from 'next/image';


class RegDetail extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

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

  toggleAccordion = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };

  render() {
    const { item } = this.props;
    const { isOpen } = this.state;
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
            <div className={styles.accordion}>
              <div className={styles.title} onClick={this.toggleAccordion}>
                  <h3>
                      <Image 
                          src="/images/detail/ico_info.png"
                          alt="요청 기본 정보"
                          width={46}
                          height={46}
                      />
                      요청 기본 정보</h3>
                  <span>
                    <Image 
                      src={isOpen ? "/images/detail/ico_ac_up.png" : "/images/detail/ico_ac_down.png"}
                      alt={isOpen ? "닫기" : "열기"}
                      width={12}
                      height={6}
                      className={styles.arrowIcon}
                    />
                  </span>
              </div>
              {!isOpen && <div className={styles.content}>
                <div className={styles.line}>요청명 <span>{item.requestName}</span></div>
              </div>}
          </div>
        </div>
      )
    );
  }
}

export default RegDetail;