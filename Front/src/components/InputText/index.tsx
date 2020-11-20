import React, { InputHTMLAttributes } from 'react';
import './style.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
    label: string;
    type: string;
}

const Input: React.FC<InputProps> = (props) => {
    return (

        <div>
            <label className="label-edit">{props.label}</label>
            <span></span>
            <input
                className="input-text"
                type={props.type}
                placeholder={props.placeholder}
                onChange={props.onChange}
                onFocus={(e) => e.target.placeholder = ""}
                onKeyPress={props.onKeyPress}
                value={props.value}
                disabled={props.disabled}
                onBlur={props.onBlur}
                maxLength={props.maxLength}
                name={props.name}
            />
        </div>
    );
}

export default Input;