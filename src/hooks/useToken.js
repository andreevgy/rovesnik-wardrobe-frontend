import {useAuth0} from "@auth0/auth0-react";
import {useEffect, useState} from "react";

const useToken = () => {
    const {isLoading, isAuthenticated, getAccessTokenSilently} = useAuth0();
    const [token, setToken] = useState(null);

    useEffect(() => {
        if (!isLoading && isAuthenticated && !token) {
            getAccessTokenSilently().then(t => setToken(t));
        }
    }, [isLoading, isAuthenticated, token, getAccessTokenSilently]);

    return { isLoading, isAuthenticated, token };
}

export default useToken;