import { NOTE_PLAYED, PLAY_STARTED, PLAY_STOPPED, METRONOME_BEAT } from "../actions/play";

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

            const precision = 0.01;
            const beatValue = 1/8 / timeSignature;

            let newPosition = playState.position += beatValue;
            let measureNumber = Math.floor(newPosition + precision);

            const measurePosition = newPosition - measureNumber;
            console.log(measurePosition)

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

            const equalsPrecision = (p) => Math.abs(p - measurePosition) < precision;
            const notesToPlay = state.measures[measureNumber].notes.filter(n => equalsPrecision(n.position));

            console.log(notesToPlay);

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