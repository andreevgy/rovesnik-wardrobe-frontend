import Button from "../Button";
import {useAuth0} from "@auth0/auth0-react";
import useToken from "../../hooks/useToken";

const LoginButton = () => {
    const { loginWithRedirect, user, logout } = useAuth0();
    const { isLoading, isAuthenticated } = useToken();

    if (isLoading) {
        return <Button onClick={() => {}}>Загрузка...</Button>
    }

    if (isAuthenticated) {
        return <><h3>Залогинен как {user.email}</h3><div onClick={logout}>Выйти</div> </>
    }

    return <Button onClick={() => loginWithRedirect({redirectUri: `${window.location.href}` })}>Войти</Button>
}

export default LoginButton;