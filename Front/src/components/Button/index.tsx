import React, {ButtonHTMLAttributes} from 'react';
import './style.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    className: any;
    value: any;
    type: any;
    onClick?: any;
    onSubmit?: any;
}

const Button:React.FC<ButtonProps> = (props, ...rest) =>{
    return(
        <div className="btn">
            <button className={props.className} type={props.type} onClick={props.onClick} onSubmit={props.onSubmit} {...rest}>{props.value}</button>
        </div>
    );
}

export default Button;