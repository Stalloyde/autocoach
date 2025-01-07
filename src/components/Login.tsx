import { Link } from 'react-router';

function Login() {
    return (
        <div className="grid content-center justify-center">
            <form action="POST">
                <div className="m-3 p-2">
                    <h2 className="font-extrabold">Log in to your account</h2>
                </div>
                <div className="m-3 p-2">
                    <label htmlFor="username">Username: </label>
                    <div className="relative w-72 outline outline-1">
                        <input required className="w-72 p-1" id="username" />
                    </div>
                </div>
                <div className="m-3 p-2">
                    <label htmlFor="password">Password: </label>
                    <div className="relative w-72 outline outline-1">
                        <input
                            required
                            type="password"
                            id="password"
                            className="w-72 p-1"
                        />
                    </div>
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
