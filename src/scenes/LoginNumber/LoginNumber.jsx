import React, {useEffect, useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import _ from 'lodash';
import useQuery from "../../hooks/useQuery";
import {useHistory} from "react-router-dom";
import useToken from "../../hooks/useToken";
import Button from "../../components/Button";
import {takeNumber} from "../../api";

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
            takeNumber(number, token)
                .then(setData)
                .catch(setError)
                .finally(() => setIsNumberLoading(false));
        }
    }, [token, isLoading, isAuthenticated, number]);

    if (isLoading) {
        return <div className="pageCentered"><h2>Загрузка...</h2></div>
    }

    if (_.isNil(number)) {
        return <div className="pageCentered">
            <h2>Со страницей что-то не так. Кажется, ты зашел на нее, не отсканировав QR-код</h2>
            <Button to="/">На главную</Button>
        </div>
    }

    if (isNumberLoading) {
        return <div className="pageCentered">
            <h2>Резервируем номерок...</h2>
        </div>
    }

    if (loadedError) {
        // TODO: норм обрабока ошибок
        switch (loadedError.code) {
            case 'USER_HAVE_NUMBER':
                return <div className="pageCentered">
                    <h2>Ты уже взял номерок</h2>
                    <Button link="/activeNumber">Показать его</Button>
                </div>;
            case 'NUMBER_TAKEN':
                return <div className="pageCentered">
                    <h2>Этот номер уже взяли</h2>
                    <p>Не пытайся взять чужие номерки...</p>
                </div>;
            case 'UNAUTHORIZED':
                return <div className="pageCentered">
                    <h2>Неправильный токен</h2>
                    <p>Либо ты пытаешься нас взломать, либо что-то пошло не так...</p>
                </div>
            default:
                return <div className="pageCentered">
                    <h2>Ошибка</h2>
                </div>
        }
    }

    if (loadedData && loadedData.success) {
        setTimeout(() => push('/activeNumber'), 4000);
        return <div className="pageCentered"><h1>Успешно забронили номерок, сейчас тебе его покажем...</h1></div>
    }

    if (!isAuthenticated) {
        return <div className="pageCentered">
            <h2>Войди чтобы взять номерок</h2>
            <Button onClick={() => loginWithRedirect({redirectUri: `${window.location.href}` })}>Войти</Button>
        </div>
    }
    return null;
};
export default LoginNumber;