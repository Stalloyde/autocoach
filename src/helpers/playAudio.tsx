import { Howl } from 'howler';

const sounds = {
    goAudio: new Howl({
        src: ['/go-audio.mp3'],
        html5: true,
        preload: true,
    }),
    tymAudio: new Howl({
        src: ['/take-your-marks-audio.mp3'],
        html5: true,
        preload: true,
    }),
    fiveSecondsAudio: new Howl({
        src: ['/five-seconds-audio.mp3'],
        html5: true,
        preload: true,
    }),
    workoutCompletedAudio: new Howl({
        src: ['/workout-completed-audio.mp3'],
        html5: true,
        preload: true,
    }),
};

function playGo() {
    sounds.goAudio.play();
}

function playTYM() {
    sounds.tymAudio.play();
}

function playFiveSeconds() {
    sounds.fiveSecondsAudio.play();
}

function playWorkoutCompleted() {
    sounds.workoutCompletedAudio.play();
}

export { playGo, playTYM, playFiveSeconds, playWorkoutCompleted };
