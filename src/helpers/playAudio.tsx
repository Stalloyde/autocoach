let goAudio = new Audio('/go-audio.mp3');
let tymAudio = new Audio('/take-your-marks-audio.mp3');
let fiveSecondsAudio = new Audio('/five-seconds-audio.mp3');
let workoutCompletedAudio = new Audio('/workout-completed-audio.mp3');

function playGo() {
    goAudio.play();
}

function pauseGo() {
    goAudio.pause();
}

function playTYM() {
    tymAudio.play();
}

function playFiveSeconds() {
    fiveSecondsAudio.play();
}

function playWorkoutCompleted() {
    workoutCompletedAudio.play();
}

export { playGo, pauseGo, playTYM, playFiveSeconds, playWorkoutCompleted };
