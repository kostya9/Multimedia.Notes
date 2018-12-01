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

            // -1/8 so that the next metronome beat the first notes will be played
            if(!playState) {
                playState = {
                    position: - 1/8
                }
            }

            return {
                ...state,
                playing: true,
                playState,
                previewNote: null
            }
        }
        case PLAY_STOPPED: {
            return {
                ...state,
                playing: false
            }
        }
        case METRONOME_BEAT: {
            if(!state.playing) {
                return state;
            }

            const beatValue = 1 / 8;
            const newPosition = state.playState.position += beatValue;
            const measureNumber = Math.floor(newPosition);

            // The end of the song
            if(measureNumber >= state.measures.length) {
                return {
                    ...state,
                    playing: false
                }
            }

            const notesToPlay = state.measures[measureNumber].filter(n => n.position === newPosition);

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