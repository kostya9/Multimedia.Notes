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

            if(!playState) {
                playState = {
                    position: 0
                }
            }

            const {position} = playState;
            const measureNumber = Math.floor(position);
            const notesToPlay = state.measures[measureNumber].filter(n => n.position === position);

            return {
                ...state,
                playing: true,
                playState,
                notesToPlay
            }
        }
        case PLAY_STOPPED: {
            return {
                ...state,
                playing: false
            }
        }
        case METRONOME_BEAT: {
            const beatValue = 1 / 8;
            const newPosition = state.playState.position += beatValue;

            const measureNumber = Math.floor(newPosition);
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