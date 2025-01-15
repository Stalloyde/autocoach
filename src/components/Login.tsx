import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import { InputStateContext } from '../App';

function Login() {
    const [usernameValue, setUsernameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const { setToken, setCurrentUser, setLoading } =
        useContext(InputStateContext);

    function handleUsernameInput(e) {
        setUsernameValue(e.target.value);
    }

    function handlePasswordInput(e) {
        setPasswordValue(e.target.value);
    }

    function handleErrors(errors) {
        setUsernameError(errors.usernameError || '');
        setPasswordError(errors.passwordError || '');
    }

    const handleToken = (BearerToken: string) => {
        const oneMinute = new Date(new Date().getTime() + 10 * 60 * 1000);
        Cookies.set('token', BearerToken, {
            expires: oneMinute,
            secure: true,
        });
        setToken(Cookies.get('token'));
    };

    async function handleLogin(e) {
        e.preventDefault();

        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: usernameValue,
                password: passwordValue,
            }),
        });
        const responseData = await response.json();

        if (responseData.usernameError || responseData.passwordError) {
            handleErrors(responseData);
        } else {
            handleToken(responseData.Bearer);
            setCurrentUser(responseData);
            setLoading(false);
            navigate(`/${responseData.username}`);
        }
    }

    return (
        <div className="grid content-center justify-center">
            <form action="POST" onSubmit={(e) => handleLogin(e)}>
                <div className="m-3 p-2">
                    <h2 className="font-extrabold">Log in to your account</h2>
                </div>
                <div className="m-3 p-2">
                    <label htmlFor="username">Username: </label>
                    <div className="relative w-72 outline outline-1">
                        <input
                            required
                            className="w-72 p-1"
                            id="username"
                            onChange={(e) => handleUsernameInput(e)}
                        />
                    </div>
                    <p className="absolute text-xs italic text-red-600">
                        {usernameError}
                    </p>
                </div>
                <div className="m-3 p-2">
                    <label htmlFor="password">Password: </label>
                    <div className="relative w-72 outline outline-1">
                        <input
                            required
                            type="password"
                            id="password"
                            className="w-72 p-1"
                            onChange={(e) => handlePasswordInput(e)}
                        />
                    </div>
                    <p className="absolute text-xs italic text-red-600">
                        {passwordError}
                    </p>
                </div>

                <div className="m-3 p-2 text-center">
                    <button className="m-5 border border-slate-950 bg-green-700 p-2 text-white">
                        Log In
                    </button>
                </div>
                <div className="m-3 p-2 text-center italic">
                    Don't have an account?{' '}
                    <Link
                        to="/sign-up"
                        className="underline decoration-green-700"
                    >
                        Sign Up
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
