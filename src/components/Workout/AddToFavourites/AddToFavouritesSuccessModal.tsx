import { Link } from 'react-router';
import { useContext } from 'react';
import { InputStateContext } from '../../../App';

function AddToFavouritesSuccessModal({ setAddingToFavourites }) {
    const { token, currentUser } = useContext(InputStateContext);

    return (
        <>
            <div className="text-center">
                <h2 className="m-3">
                    Your workout has been successfully saved!
                </h2>

                {token ? (
                    <Link
                        to={`/${currentUser}`}
                        onClick={() => setAddingToFavourites(false)}
                        className="m-3 border-slate-950 bg-green-700 p-2 text-white"
                    >
                        <em className="underline">Return to workout</em>
                    </Link>
                ) : (
                    <Link
                        to="/"
                        onClick={() => setAddingToFavourites(false)}
                        className="m-3 border-slate-950 bg-green-700 p-2 text-white"
                    >
                        <em className="underline">Return to workout</em>
                    </Link>
                )}
            </div>
        </>
    );
}

export default AddToFavouritesSuccessModal;
