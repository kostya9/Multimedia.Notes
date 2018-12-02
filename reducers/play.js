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
            console.log(1);
            let {playState} = state;

            // -1/8 so that on the next metronome beat the first notes will be played
            if(!playState) {
                playState = {
                    position: - 1/8,
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
            const {playState, mode} = state;
            if(mode != 'play' || !playState || !playState.playing) {
                return state;
            }

            const beatValue = 1 / 8;
            const newPosition = playState.position += beatValue;
            const measureNumber = Math.floor(newPosition);
            const measurePosition = newPosition - measureNumber;
            console.log(measureNumber);
            console.log('measures', state.measures.length);

            // The end of the song
            if(measureNumber >= state.measures.length) {
                return {
                    ...state,
                    playState: {
                        ...playState,
                        position: -1/8,
                        playing: false
                    }
                }
            }

            const notesToPlay = state.measures[measureNumber].notes.filter(n => n.position === measurePosition);

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