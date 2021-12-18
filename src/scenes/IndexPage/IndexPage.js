import {useCallback, useEffect} from "react";
import QrCodeScanner from "../../components/QrCodeScanner";
import "./IndexPage.css";
import Button from "../../components/Button";
import LoginButton from "../../components/LoginButton/LoginButton";
import {Link, useHistory} from "react-router-dom";
import useToken from "../../hooks/useToken";
import {getCurrentNumber} from "../../api";

const IndexPage = () => {
    const { isLoading, isAuthenticated, token } = useToken();
    const { push } = useHistory();
    const onScan = useCallback((code) => {
        if (!code.startsWith('http://localhost:3000/loginNumber')) {
            alert('Некорректный qr-код')
        } else {
            window.location.replace(code);
        }
    }, []);

    useEffect(() => {
        if (!isLoading && isAuthenticated && token) {
            getCurrentNumber(token)
                .then(() => {
                    push('/activeNumber');
                })
                .catch(e => {});
        }
    }, [isLoading, isAuthenticated, token, push])

    if (isLoading) {
        return <div className="loginBody"><h2>Загрузка...</h2></div>
    }

    return <div className="loginBody2">
        <h2>Гардероб Ровесника</h2>
        <br />
        <h3>1. Войди в систему (или зарегайся)</h3>
        <LoginButton />
        <br />
        <h3>2. Отсканируй код с номерка</h3>
        <QrCodeScanner onScan={onScan} />
        <br />
        <h3>3. Закрепи номерок за собой на вcю ночь!</h3>
        <br />
        <Button link="/faq">Подробнее</Button>
        <br />
        <small>Это лишь шуточный прототип, а не настоящее приложение: <Link to="/faq" className="link">подробнее</Link></small>
    </div>
}

export default IndexPage;