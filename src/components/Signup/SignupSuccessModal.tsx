import { Link } from 'react-router';

function SignUpSuccessModal() {
    return (
        <>
            <div className="text-center">
                <h2 className="m-3">
                    Your account has been successfully created!
                </h2>
                <Link
                    to="/login"
                    className="m-3 border-slate-950 bg-green-700 p-2 text-white"
                >
                    <em className="underline">Login</em>
                </Link>
            </div>
        </>
    );
}

export default SignUpSuccessModal;
