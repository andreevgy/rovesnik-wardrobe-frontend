import {useAuth0} from "@auth0/auth0-react";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {io} from "socket.io-client";
import {useHistory} from "react-router-dom";
import Button from "../../components/Button";
import {getCurrentNumber, returnNUmber} from "../../api";

const ActiveNumber = () => {
    const {isLoading, isAuthenticated, getAccessTokenSilently} = useAuth0();
    const [data, setData] = useState(null);
    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);
    const [leftSeconds, setLeftSeconds] = useState(30);
    const { push } = useHistory();
    const socket = useRef(null);

    useEffect(() => {
        if (data) {
            const currentDate = new Date();
            setLeftSeconds(Math.floor((data.expires - currentDate.getTime()) / 1000));
            const i = setInterval(() => {
                const currentDate = new Date();
                setLeftSeconds(Math.floor((data.expires - currentDate.getTime()) / 1000));
            }, 1000);
            return () => {
                setLeftSeconds(30);
                clearInterval(i) ;
            };
        }
    }, [data])

    useEffect(() => {
        if (!isLoading && isAuthenticated && !token) {
            getAccessTokenSilently().then(t => setToken(t));
        }
    }, [isLoading, isAuthenticated, token, getAccessTokenSilently]);

    useEffect(() => {
        if (token) {
            getCurrentNumber(token)
                .then(() => {
                    socket.current = io(`${process.env.REACT_APP_WS_HOST}`, {
                        auth: {token}
                    });
                    socket.current.connect();
                    socket.current.on("code", (d) => { setData(JSON.parse(d)) });
                })
                .catch(e => setError(e.message));
        }
        return () => {
            if (socket.current) {
                socket.current.disconnect();
            }
        }
    }, [token])

    const returnNumberCB = useCallback(() => {
        returnNUmber(token)
            .then(() => push('/'))
            .catch(e => { console.log(e) });
    }, [push, token]);

    if (isLoading) {
        return <div className="pageCentered"><h2>Загрузка..</h2></div>;
    }

    if (!isAuthenticated) {
        return <div className="pageCentered">
            <h2>Ты не вошел в аккаунт</h2>
            <Button link="/">На главную</Button>
        </div>
    }

    if (error) {
        return <div className="pageCentered">
            <h1>{error}</h1>
            <Button link="/">На главную</Button>
        </div>
    }

    if (data) {
        return <div className="pageCentered">
            <h3>За вами закреплен номерок</h3>
            <h1>{data.number}</h1>
            <h3>Код синхронизации:</h3>
            <h2>{data.code}</h2>
            <h3>Код обновится через: {leftSeconds}</h3>
            <Button onClick={returnNumberCB}>Вернуть номерок</Button>
        </div>
    }

    return null;
}
export default ActiveNumber;