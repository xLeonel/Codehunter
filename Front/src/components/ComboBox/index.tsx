import React, { SelectHTMLAttributes } from 'react';
import './style.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    name: any;
    value: any;
    labelName: any;
}

const Button: React.FC<SelectProps> = (props) => {
    return (
        <div>
            <p className="label-edit">{props.labelName}</p>
            <select name={props.name} className="select-box" >
                <option value={props.value}></option>
                
            </select>
        </div>
    );
}

export default Button;