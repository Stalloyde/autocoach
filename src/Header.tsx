import { useState } from 'react';
import { Link } from 'react-router';

function Header() {
    return (
        <div className="flex justify-between border border-slate-950 p-2">
            <div className="p-2">Logo</div>
            <h1 className="p-2 font-extrabold">AutoGo</h1>
            <div className="content-center">
                <div className="text-xs italic">Save workouts & more..</div>
                <div className="flex justify-center gap-10">
                    <Link to="login">Login</Link>
                    <Link to="signup">Sign Up</Link>
                </div>
            </div>
        </div>
    );
}

export default Header;
