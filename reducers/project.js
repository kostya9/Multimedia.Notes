import { INIT_PROJECT, ADD_NOTE, REMOVE_NOTE, CHOOSE_LENGTH } from "../actions/project";
import { range, stepRange } from "../utils/range";
import { nearest } from "../utils/nearest";

const parseLength = (length) => {
    if(length == 'n') {
        return 1;
    }

    return 1 / +length[0];
}

const findIntersection = (notes, position, value) => {
    return notes
        .filter(n => n.value === value)
        .find(n => position >= (n.position) && position < (n.position + parseLength(n.length)))
}

export const projectReducer = (state = {}, action) => {
    switch(action.type) {
        case INIT_PROJECT:
        {
            let measures = range(0, 5).map(r => ({number: r, notes: []}));
            return {
                measures,
                chosenLength: '8n'
            }
        }
        case ADD_NOTE:
        {
            console.log(action, state);
            const numericLength = parseLength(state.chosenLength);
            const noteRange = stepRange(0, 1, numericLength);

            const adjustedPosition =  nearest(noteRange, action.position);

            const measureNumber = action.measureNumber;

            const changedMeasure = state.measures.find(m => m.number === measureNumber);

            if(findIntersection(changedMeasure.notes, adjustedPosition, action.note) != null) {
                return state;
            }
            
            const newNote = {
                value: action.note, 
                position: adjustedPosition, 
                length: state.chosenLength
            };
            
            const newMeasure = {
                number: changedMeasure.number,
                notes: [...changedMeasure.notes, newNote]
            } 

            return {
                ...state,
                measures: state.measures.map(m => m.number === measureNumber ? newMeasure : m)
            }
        }
        case REMOVE_NOTE:
        {
            const position = action.position;
            const note = action.note;
            const measureNumber = action.measureNumber;
            const changedMeasure = state.measures.find(m => m.number === measureNumber);

            const toRemove = findIntersection(changedMeasure.notes, position, note);

            if (toRemove == null) {
                return state;
            }

            let newMeasure = {...changedMeasure, notes: changedMeasure.notes.filter(n => n !== toRemove)};

            return {
                ...state,
                measures: state.measures.map(m => m.number === measureNumber ? newMeasure : m)
            }
        }
        case CHOOSE_LENGTH:
        {
            return {
                ...state,
                chosenLength: action.length
            }
        }
        default:
            return state;
    }
}