import { Link } from 'react-router';
import { useContext } from 'react';
import { InputStateContext } from '../../../App';

function AddToFavouritesSuccessModal() {
    const { currentUser, setAddingToFavourites } =
        useContext(InputStateContext);

    return (
        <>
            <div className="text-center">
                <h2 className="m-3">
                    Your workout has been successfully saved!
                </h2>

                <Link
                    to={`/countdown/${currentUser.username}`}
                    onClick={() => setAddingToFavourites(false)}
                    className="m-3 border-slate-950 bg-green-700 p-2 text-white"
                >
                    <em className="underline">Start workout</em>
                </Link>
                <Link
                    to={`/${currentUser.username}`}
                    onClick={() => setAddingToFavourites(false)}
                    className="m-3 border-slate-950 bg-red-700 p-2 text-white"
                >
                    <em className="underline">Return to setup</em>
                </Link>
            </div>
        </>
    );
}

export default AddToFavouritesSuccessModal;
