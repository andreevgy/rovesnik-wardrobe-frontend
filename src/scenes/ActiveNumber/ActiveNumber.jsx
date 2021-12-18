import {useAuth0} from "@auth0/auth0-react";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {io} from "socket.io-client";
import './ActiveNumber.css';
import {Link, useHistory} from "react-router-dom";
import Button from "../../components/Button";

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
            fetch("http://localhost:7071/getCurrentNumber", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(res => {
                if (res.status === 404) {
                    setError('Вы не закрепили за собой номерок');
                } else {
                    socket.current = io('ws://localhost:7071', {
                        auth: {token}
                    });
                    socket.current.connect();
                    socket.current.on("code", (d) => { setData(JSON.parse(d)) });
                }
            })
        }
        return () => {
            if (socket.current) {
                socket.current.disconnect();
            }
        }
    }, [token])

    const returnNumber = useCallback(() => {
        fetch("http://localhost:7071/returnNumber", {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(() => push('/'))
            .catch(e => { console.log(e) });
    }, [push, token]);

    if (isLoading) {
        return <div className="loginBody"><h2>Загрузка</h2></div>;
    }

    if (error) {
        return <div className="loginBody">
            <h1>{error}</h1>
            <Button link="/">На главную</Button>
        </div>
    }

    if (data) {
        return <div className="loginBody">
            <h3>За вами закреплен номерок</h3>
            <h1>{data.number}</h1>
            <h2>Код синхронизации:</h2>
            <h2>{data.code}</h2>
            <h2>Код обновится через: {leftSeconds}</h2>
            <Button onClick={returnNumber}>Вернуть номер</Button>
        </div>
    }

    return null;
}
export default ActiveNumber;