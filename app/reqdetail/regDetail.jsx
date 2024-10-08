import React, { Component } from 'react';
import styles from '/app/styles/detail.module.css';
import Image from 'next/image';

class RegDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      detailsOpen: [true], // details 아코디언 상태를 배열로 관리
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
        return status;
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
        return styles['l'];
      default:
        return priority;
    }
  }

  toggleAccordion = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };

  toggleDetailsAccordion = (index) => {
    this.setState((prevState) => {
      const updatedDetailsOpen = [...prevState.detailsOpen];
      updatedDetailsOpen[index] = !updatedDetailsOpen[index]; // 해당 인덱스의 아코디언 상태를 토글
      return { detailsOpen: updatedDetailsOpen };
    });
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
          {/* 기본 정보 아코디언 */}
          <div className={styles.accordion}>
            <div className={styles.title} onClick={this.toggleAccordion}>
              <h3>
                <Image
                  src="/images/detail/ico_info.png"
                  alt="요청 기본 정보"
                  width={46}
                  height={46}
                />
                요청 기본 정보
              </h3>
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
            {!isOpen && (
              <div className={styles.content}>
                <ul>
                  <li><span className={styles.tit_tx}>요청명</span><span className={styles.p_tx}>{item.requestName}</span></li>
                  <li className={styles.half_line1}><span className={styles.tit_tx}>대내·외 구분</span><span className={styles.p_tx}>{item.internalExternal}</span></li>
                  <li className={styles.half_line2}><span className={styles.tit_tx}>인원</span><span className={styles.p_tx}>{item.personnel}명</span></li>
                  <li><span className={styles.tit_tx}>목적</span><span className={styles.p_tx}>{item.purpose}</span></li>
                </ul>
              </div>
            )}
          </div>
          {/* 개별 details 정보 아코디언 */}
          {item.details && item.details.map((detail, index) => {
            const isDetailOpen = this.state.detailsOpen[index] || false;
            return (
              <div key={index} className={`${styles.accordion} ${styles.detail}`}>
                <div className={styles.title} onClick={() => this.toggleDetailsAccordion(index)}>
                  <h3>
                    <Image
                      src="/images/detail/ico_partners.png"
                      alt="요청 기본 정보"
                      width={46}
                      height={46}
                    />
                    요청 인력 정보 <span className={styles.acc_num}>{index+1}</span>
                  </h3>
                  <span>
                    <Image
                      src={isDetailOpen ? "/images/detail/ico_ac_up.png" : "/images/detail/ico_ac_down.png"}
                      alt={isDetailOpen ? "닫기" : "열기"}
                      width={12}
                      height={6}
                      className={styles.arrowIcon}
                    />
                  </span>
                </div>
                {isDetailOpen && (
                  <div className={styles.content}>
                    <ul>
                      <li className={styles.half_line1}><span className={styles.tit_tx}>유형</span><span className={styles.p_tx}>{detail.type}</span></li>
                      <li className={styles.half_line2}><span className={styles.tit_tx}>직무 구분</span><span className={styles.p_tx}>{detail.jobCategory}</span></li>
                      <li><span className={styles.tit_tx}>등급</span><span className={styles.p_tx}>{detail.grade}</span></li>
                      <li className={styles.half_line3}><span className={styles.tit_tx}>투입 예정일</span><span className={styles.p_tx}>{detail.startDate}</span></li>
                      <li className={styles.half_line4}><span className={styles.tit_tx}>투입 종료일</span><span className={styles.p_tx}>{detail.endDate}</span></li>
                      <li className={styles.half_line3}><span className={styles.tit_tx}>M/M</span><span className={styles.p_tx}>{detail.MM}</span></li>
                      <li className={styles.half_line4}><span className={styles.tit_tx}>근무지</span><span className={styles.p_tx}>{detail.workLocation}</span></li>
                      <li><span className={styles.tit_tx}>상세<br />요구기술</span><span className={styles.p_tx}>{detail.technicalRequirement}</span></li>
                    </ul>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )
    );
  }
}

export default RegDetail;