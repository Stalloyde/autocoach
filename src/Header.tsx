import { useState } from 'react';
import { Link } from 'react-router';

function Header() {
    return (
        <div className="grid grid-cols-[1fr_4fr_1fr] border border-slate-950 p-2">
            <div className="content-center p-2">Logo</div>
            <h1 className="grid justify-center p-2 text-2xl font-extrabold">
                AUTO-GO
            </h1>
            <div className="grid content-center justify-center">
                <div className="text-xs italic">Save workouts & more..</div>
                <div className="flex justify-center gap-2">
                    <Link
                        to="login"
                        className="decoration-green-700 hover:underline"
                    >
                        Login
                    </Link>{' '}
                    /
                    <Link
                        to="signup"
                        className="decoration-green-700 hover:underline"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Header;
