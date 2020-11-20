import React, {InputHTMLAttributes} from 'react';
import './style.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    type: any;
    onClick?: any;
    onSubmit?: any;
}

const Input:React.FC<InputProps> = (props, ...rest) =>{
    return(
        <div className="btn">
            <input className={props.className} type={props.type} style={props.style} onChange={props.onChange}></input>
        </div>
    );
}

export default Input;