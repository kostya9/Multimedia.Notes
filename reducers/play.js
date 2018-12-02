import { NOTE_PLAYED, PLAY_STARTED, PLAY_STOPPED, METRONOME_BEAT, SET_POSITION } from "../actions/play";
import { parseLength, adjustPosition } from "./notesMath";

export function playReducer(state, action) {
    const precision = 0.001;
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
                    position: 0,
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
        case SET_POSITION: {
            const {position} = action;
            console.log(position);
            const multiplied = position * state.measures.length;
            const measureNumber = Math.floor(multiplied);
            const measurePosition = multiplied - measureNumber;
            const adjustedMeasurePosition = adjustPosition('8n', measurePosition, state.timeSignature);
            const realPosition = measureNumber + adjustedMeasurePosition;


            const prevMeasure = Math.floor(state.playState.position);
            state.measures[prevMeasure].notes =  state.measures[prevMeasure].notes.map(n => ({...n, isActive: false}));

            return {
                ...state,
                playState: {
                    ...state.playState,
                    position: realPosition
                }
            }
        }
        case METRONOME_BEAT: {
            const {playState, mode, timeSignature} = state;
            if(mode != 'play' || !playState || !playState.playing) {
                return state;
            }

            const {position} = state.playState;
            const measureNumber = Math.floor(position + precision);
            const measurePosition = position - measureNumber;

            // The end of the song
            if(measureNumber >= state.measures.length) {
                return {
                    ...state,
                    playState: {
                        ...playState,
                        position: 0,
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

            const beatValue = 1/8 / timeSignature;
            const newPosition = playState.position + beatValue;

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