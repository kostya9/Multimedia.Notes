export const NOTE_PLAYED = 'NOTE_PLAYED';
export const PLAY_STARTED = 'PLAY_STARTED';
export const PLAY_STOPPED = 'PLAY_STOPPED';
export const SET_POSITION = 'SET_POSITION';
export const METRONOME_BEAT = 'METRONOME_BEAT';

export const playNote = () => ({
    type: NOTE_PLAYED
});

export const startPlaying = () => ({
    type: PLAY_STARTED
});

export const stopPlaying = () => ({
    type: PLAY_STOPPED
});

export const setPosition = (position) => ({
    type: SET_POSITION,
    position
});

export const metronomeBeat = () => ({
    type: METRONOME_BEAT
});