import { NOTE_PLAYED, PLAY_STARTED, PLAY_STOPPED, METRONOME_BEAT } from "../actions/play";
import { parseLength } from "./notesMath";

export function playReducer(state, action) {
    switch(action.type) {
        case NOTE_PLAYED: {
            return {
                ...state,
                notesToPlay: []
            }
        }
        case PLAY_STARTED: {
            let {playState} = state;

            // -1/8 so that on the next metronome beat the first notes will be played
            if(!playState) {
                playState = {
                    position: -  1/8 /state.timeSignature,
                }
            }

            return {
                ...state,
                playState: {
                    ...playState, 
                    playing: true
                },
                previewNote: null
            }
        }
        case PLAY_STOPPED: {
            return {
                ...state,
                playState: {
                    ...state.playState,
                    playing: false
                }
            }
        }
        case METRONOME_BEAT: {
            const {playState, mode, timeSignature} = state;
            if(mode != 'play' || !playState || !playState.playing) {
                return state;
            }

            const precision = 0.001;
            const beatValue = 1/8 / timeSignature;

            let newPosition = playState.position += beatValue;
            let measureNumber = Math.floor(newPosition + precision);

            const measurePosition = newPosition - measureNumber;

            // The end of the song
            if(measureNumber >= state.measures.length) {
                return {
                    ...state,
                    playState: {
                        ...playState,
                        position: - 1/8 / timeSignature,
                        playing: false
                    }
                }
            }

            // Show which notes are currently playing
            const playingMeasure = state.measures[measureNumber];

            if(measureNumber > 0) {
                state.measures[measureNumber - 1].notes = state.measures[measureNumber - 1].notes.map(n => ({...n, isActive: false})); 
            }

            if(measureNumber < state.measures.length - 1) {
                state.measures[measureNumber + 1].notes = state.measures[measureNumber + 1].notes.map(n => ({...n, isActive: false})); 
            }


            playingMeasure.notes = playingMeasure.notes.map(n => {
                const end = n.position + parseLength(n.length) / state.timeSignature;
                const start = n.position;
                const isActive = measurePosition >= start - precision && measurePosition < end - precision;
                return {...n, isActive: isActive};
            });

            const equalsPrecision = (p) => Math.abs(p - measurePosition) < precision;
            const notesToPlay = state.measures[measureNumber].notes.filter(n => equalsPrecision(n.position));

            return {
                ...state,
                playState: {
                    ...playState,
                    position: newPosition
                },
                notesToPlay
            }
        }
        default: {
            return state;
        }
    }
}