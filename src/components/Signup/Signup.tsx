import { FormEvent, useState, ChangeEvent } from 'react';
import { Link } from 'react-router';
import SignUpSuccessModal from './SignupSuccessModal';
import { SignupResponseType } from '../../utils/TypeDeclarations';
import APIurl from '../../helpers/APIurl';

function Signup() {
    const [usernameValue, setUsernameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [signUpSuccess, setSignUpSuccess] = useState(false);

    function handleUsernameInput(e: ChangeEvent<HTMLInputElement>) {
        setUsernameValue(e.target.value);
    }

    function handlePasswordInput(e: ChangeEvent<HTMLInputElement>) {
        setPasswordValue(e.target.value);
    }

    function handleConfirmPasswordInput(e: ChangeEvent<HTMLInputElement>) {
        setConfirmPasswordValue(e.target.value);
    }

    function handleErrors(errors: SignupResponseType) {
        setUsernameError(errors.usernameError || '');
        setPasswordError(errors.passwordError || '');
        setConfirmPasswordError(errors.confirmPasswordError || '');
    }

    // async function handleSignup(e: FormEvent<HTMLFormElement>) {
    //     e.preventDefault();

    //     const url = APIurl('signup');
    //     const response = await fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             username: usernameValue,
    //             password: passwordValue,
    //             confirmPassword: confirmPasswordValue,
    //         }),
    //     });
    //     const responseData: SignupResponseType = await response.json();
    //     if (
    //         responseData.usernameError ||
    //         responseData.passwordError ||
    //         responseData.confirmPasswordError
    //     ) {
    //         handleErrors(responseData);
    //     } else {
    //         setSignUpSuccess(true);
    //     }
    // }

    return (
        <div className="grid content-center justify-center">
            {signUpSuccess ? (
                <SignUpSuccessModal />
            ) : (
                <form action="POST" onSubmit={handleSignup}>
                    <div className="m-1 p-1">
                        <h2 className="font-extrabold">
                            Sign up for an account
                        </h2>
                    </div>
                    <div className="m-1 p-1">
                        <label htmlFor="username">Username: </label>
                        <div className="relative w-60 outline outline-1">
                            <input
                                required
                                className="w-60 p-1"
                                id="username"
                                onChange={(e) => handleUsernameInput(e)}
                            />
                        </div>
                        <p className="absolute text-xs italic text-red-600">
                            {usernameError}
                        </p>
                    </div>
                    <div className="m-1 p-1">
                        <label htmlFor="password">Password: </label>
                        <div className="relative w-60 outline outline-1">
                            <input
                                required
                                type="password"
                                className="w-60 p-1"
                                id="password"
                                onChange={(e) => handlePasswordInput(e)}
                            />
                        </div>
                        <p className="absolute text-xs italic text-red-600">
                            {passwordError}
                        </p>
                    </div>

                    <div className="m-1 p-1">
                        <label htmlFor="confirmPassword">
                            Confirm Password:{' '}
                        </label>
                        <div className="relative w-60 outline outline-1">
                            <input
                                required
                                type="password"
                                className="w-60 p-1"
                                id="confirmPassword"
                                onChange={(e) => handleConfirmPasswordInput(e)}
                            />
                        </div>
                        <p className="absolute text-xs italic text-red-600">
                            {confirmPasswordError}
                        </p>
                    </div>
                    <div className="m-1 p-1 text-center">
                        <button className="m-5 border border-slate-950 bg-green-700 p-2 text-white underline">
                            Sign Up
                        </button>
                    </div>
                    <div className="m-1 p-1 text-center italic">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="underline decoration-green-700"
                        >
                            Login
                        </Link>
                    </div>
                </form>
            )}
        </div>
    );
}

export default Signup;
