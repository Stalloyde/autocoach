import { Link } from 'react-router';
import { useContext } from 'react';
import { InputStateContext } from '../../../App';

function AddToFavouritesSuccessModal() {
    const { currentUser, setAddingToFavourites } =
        useContext(InputStateContext);

    return (
        <>
            {currentUser && (
                <div className="max-w-64 text-center">
                    <h2 className="m-1">
                        Your workout has been successfully saved!
                    </h2>
                    <div className="grid">
                        <Link
                            to={`/countdown/${currentUser.username}`}
                            onClick={() => setAddingToFavourites(false)}
                            className="m-1 border-slate-950 bg-green-700 p-1 text-white"
                        >
                            <em className="underline">Start workout</em>
                        </Link>
                        <Link
                            to={`/${currentUser.username}`}
                            onClick={() => setAddingToFavourites(false)}
                            className="m-1 border-slate-950 bg-red-700 p-1 text-white"
                        >
                            <em className="underline">Return to setup</em>
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}

export default AddToFavouritesSuccessModal;
