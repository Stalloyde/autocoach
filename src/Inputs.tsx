import { useState } from 'react';
import Header from './Header';

function Inputs({ label, inputType, id, defaultValue, minVal }) {
  function handleDecrement() {
    console.log('decrement');
  }

  function handleIncrement() {
    console.log('increment');
  }

  return (
    <div className="p-2">
      <label htmlFor={id} className="grid">
        {label}
      </label>
      <div className="relative w-72 outline outline-1">
        <input
          className="w-52 p-1"
          required
          type={inputType}
          id={id}
          defaultValue={defaultValue}
          min={minVal}
        />
        <div className="absolute left-52 top-0">
          <button
            type="button"
            className="w-10 border-l-2 p-1"
            onClick={handleDecrement}
          >
            -
          </button>
          <button type="button" className="w-10 p-1" onClick={handleIncrement}>
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default Inputs;
