import React, {useEffect, useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import _ from 'lodash';
import './LoginNumber.css';
import useQuery from "../../hooks/useQuery";
import {Link, useHistory} from "react-router-dom";
import useToken from "../../hooks/useToken";
import Button from "../../components/Button";

const LoginNumber = () => {
    const { loginWithRedirect } = useAuth0();
    const { isLoading, isAuthenticated, token } = useToken();
    const { push } = useHistory();
    const [isNumberLoading, setIsNumberLoading] = useState(false);
    const [loadedData, setData] = useState(null);
    const [loadedError, setError] = useState(null);
    const query = useQuery();
    const number = query.get('number');

    useEffect(() => {
        if (!isLoading && isAuthenticated && token && !_.isNil(number)) {
            setIsNumberLoading(true);
            fetch(`http://localhost:7071/takeNumber/${number}`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(res => {
                    if (res.status === 401) {
                        setError({ code: 'UNAUTHORIZED' });
                        return;
                    }
                    if (res.status === 200) {
                        return res.json().then(setData);
                    }
                    return res.json().then(setError);
                })
                .finally(() => setIsNumberLoading(false));
        }
    }, [token, isLoading, isAuthenticated, number]);

    if (isLoading) {
        return <div className="loginBody">Загрузка</div>
    }

    if (_.isNil(number)) {
        return <div className="loginBody">
            <h2>Со страницей что-то не так. Кажется, вы зашли на нее, не отсканировав QR-код</h2>
            <Button to="/">На главную</Button>
        </div>
    }

    if (isNumberLoading) {
        return <div className="loginBody">
            <h2>Резервируем номер...</h2>
        </div>
    }

    if (loadedError) {
        switch (loadedError.code) {
            case 'USER_HAVE_NUMBER':
                return <div className="loginBody">
                    <h2>Вы уже взяли номерок</h2>
                    <Button link="/activeNumber">Показать его</Button>
                </div>;
            case 'NUMBER_TAKEN':
                return <div className="loginBody">
                    <h2>Этот номер уже взяли</h2>
                    <p>Не пытайтесь взять чужие номерки...</p>
                </div>;
            case 'UNAUTHORIZED':
                return <div className="loginBody">
                    <h2>Неправильный токен</h2>
                    <p>Либо вы пытаетесь нас взломать, либо что-то пошло не так...</p>
                </div>
            default:
                return <div className="loginBody">
                    <h2>Ошибка</h2>
                </div>
        }
    }

    if (loadedData && loadedData.success) {
        setTimeout(() => push('/activeNumber'), 5000);
        return <div className="loginBody"><h1>Успешно взяли номерок, сейчас вам его покажем...</h1></div>
    }

    if (!isAuthenticated) {
        return <div className="loginBody">
            <h2>Войдите чтобы взять номерок</h2>
            <Button onClick={() => loginWithRedirect({redirectUri: `${window.location.href}` })}>Войти</Button>
        </div>
    }
    return null;
};
export default LoginNumber;