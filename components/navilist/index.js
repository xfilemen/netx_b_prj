import React, { Component } from 'react';
import Link from 'next/link';

class NaviList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOn: false,
    };
  }

  handleToggle = () => {
    this.setState((prevState) => ({
      isOn: !prevState.isOn,
    }));
  };

  render() {
    return (
      <ul>
        <li onClick={this.handleToggle} className={this.state.isOn ? 'on' : ''}><Link href={''}>정규 인력 요청·내역</Link></li>
        <li onClick={this.handleToggle} className={this.state.isOn ? 'on' : ''}><Link href={''}>BP인력 요청·내역</Link></li>
        <li onClick={this.handleToggle} className={this.state.isOn ? 'on' : ''}><Link href={''}>정규 인력 요청·내역</Link></li>
      </ul>
    );
  }
}

export default NaviList;