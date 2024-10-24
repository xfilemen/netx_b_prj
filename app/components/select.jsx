import React, { Component } from 'react';
import styles from '../styles/request.module.css';

class SelectBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: '',
        };
    }

    handleChange = (event) => {
        this.setState({ selectedOption: event.target.value });
        if (this.props.onChange) {
            this.props.onChange(event); // 부모 컴포넌트에 change 이벤트 전달
        }
    };

    render() {
        const { options, name } = this.props;
        return (
            <span className={styles.select_box}>
                <select name={name} value={this.state.selectedOption} onChange={this.handleChange} className={styles.custom_select}>
                    <option value="">선택</option>
                    {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                    ))}
                </select>
                {/* <p>선택한 옵션: {this.state.selectedOption}</p> */}
            </span>
        )
    }
}

export default SelectBox;