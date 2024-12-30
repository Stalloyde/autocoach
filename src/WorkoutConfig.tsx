import { useState } from 'react';
import Header from './Header';
import Inputs from './Inputs';

function WorkoutConfig() {
  return (
    <>
      <Header />
      <form action="POST">
        <Inputs
          label="# of Repetition"
          inputType="number"
          id="repetitions"
          defaultValue="1"
          minVal="1"
        />
        {/*Figure out how to handle time */}
        <Inputs
          label="Interval per Repetition"
          inputType="time"
          id="intervalRep"
          defaultValue="1:00"
          minVal="0:05"
        />
        <Inputs
          label="# of Waves"
          inputType="number"
          id="waves"
          defaultValue="1"
          minVal="1"
        />
        <Inputs
          label="Interval between Waves (seconds)"
          inputType="number"
          id="intervalWave"
          defaultValue="10"
          minVal="5"
        />
        <Inputs
          label="Countdown Timer (seconds)"
          inputType="number"
          id="countdown"
          defaultValue="10"
          minVal="1"
        />
      </form>
    </>
  );
}

export default WorkoutConfig;
