import { SaveCancelBtnPropsType } from '../utils/TypeDeclarations';

function SaveCancelBtn({
    type,
    setAddingToFavourites,
    handleOverWriteFavourites,
}: SaveCancelBtnPropsType) {
    if (type === 'save' && handleOverWriteFavourites) {
        return (
            <button
                onClick={async (e) => {
                    await handleOverWriteFavourites(e);
                }}
                className="m-1 border-slate-950 bg-green-700 p-2 text-white underline"
            >
                Save
            </button>
        );
    } else if (type === 'save') {
        return (
            <button className="m-1 border-slate-950 bg-green-700 p-2 text-white underline">
                Save
            </button>
        );
    } else {
        return (
            <button
                onClick={() => {
                    if (setAddingToFavourites) setAddingToFavourites(false);
                }}
                className="m-1 border-slate-950 bg-red-700 p-2 text-white underline"
            >
                Cancel
            </button>
        );
    }
}

export default SaveCancelBtn;
