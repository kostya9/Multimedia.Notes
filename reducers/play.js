import { NOTE_PLAYED } from "../actions/play";

export function playReducer(state, action) {
    switch(action.type) {
        case NOTE_PLAYED: {
            return {
                ...state,
                noteToPlay: null
            }
        }
        default: {
            return state;
        }
    }
}