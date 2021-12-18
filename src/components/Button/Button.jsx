import './Button.css';
import {Link} from "react-router-dom";

const Button = ({ children, onClick, className = '', link }) => {
    if (link) {
        return <Link to={link} className={`button ${className}`}>{children}</Link>
    }
    return <button className={`button ${className}`} onClick={onClick}>{children}</button>
}

export default Button;