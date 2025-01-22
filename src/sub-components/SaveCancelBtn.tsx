function SaveCancelBtn({
    type,
    setAddingToFavourites,
    handleOverWriteFavourites,
}) {
    if (type === 'save' && handleOverWriteFavourites) {
        return (
            <button
                onClick={handleOverWriteFavourites}
                className="m-3 border-slate-950 bg-green-700 p-2 text-white"
            >
                Save
            </button>
        );
    } else if (type === 'save') {
        return (
            <button className="m-3 border-slate-950 bg-green-700 p-2 text-white">
                Save
            </button>
        );
    } else {
        return (
            <button
                onClick={() => {
                    setAddingToFavourites(false);
                }}
                className="m-3 border-slate-950 bg-red-700 p-2 text-white"
            >
                Cancel
            </button>
        );
    }
}

export default SaveCancelBtn;
