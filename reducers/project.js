import { INIT_PROJECT, ADD_NOTE, REMOVE_NOTE, CHOOSE_LENGTH, PREVIEW_CHANGE } from "../actions/project";
import { range, stepRange } from "../utils/range";
import { nearest } from "../utils/nearest";

const parseLength = (length) => {
    return 1 / +length[0];
}

const findIntersection = (notes, position, value, length) => {
    const numericLength = parseLength(length);

    const isIntersectingWith = (n) => {
        const nNumericLength = parseLength(n.length);
        return (position >= (n.position) && position < (n.position + nNumericLength))
            || (n.position >= position && n.position < (position + numericLength));
    }

    return notes
        .filter(n => n.value === value)
        .find(n => isIntersectingWith(n));
}

const adjustPosition = (length, position) => {
    const numericLength = parseLength(length);
    const noteRange = stepRange(0, 1, numericLength);
    return nearest(noteRange, position);
}

export const projectReducer = (state = {}, action) => {
    switch(action.type) {
        case INIT_PROJECT:
        {
            let measures = range(0, 5).map(r => ({number: r, notes: []}));
            return {
                measures,
                chosenLength: '4n'
            }
        }
        case ADD_NOTE:
        {
            const {position, measureNumber, note} = action;
            const length = state.chosenLength;
            const adjustedPosition = adjustPosition(length, position);
            const changedMeasure = state.measures.find(m => m.number === measureNumber);

            if(findIntersection(changedMeasure.notes, adjustedPosition, note, length) != null) {
                return state;
            }
            
            const newNote = {
                value: note, 
                position: adjustedPosition, 
                length: length
            };
            
            const newMeasure = {
                number: changedMeasure.number,
                notes: [...changedMeasure.notes, newNote]
            } 

            return {
                ...state,
                previewNote: null,
                measures: state.measures.map(m => m.number === measureNumber ? newMeasure : m)
            }
        }
        case REMOVE_NOTE:
        {
            const {position, measureNumber, note} = action;
            const length = state.chosenLength;
            const changedMeasure = state.measures.find(m => m.number === measureNumber);
            const adjustedPosition = adjustPosition(length, position);
            const toRemove = findIntersection(changedMeasure.notes, adjustedPosition, note, length);

            if (toRemove == null) {
                return state;
            }

            let newMeasure = {...changedMeasure, notes: changedMeasure.notes.filter(n => n !== toRemove)};

            return {
                ...state,
                previewNote: null,
                measures: state.measures.map(m => m.number === measureNumber ? newMeasure : m)
            }
        }
        case PREVIEW_CHANGE:
        {
            const {position, measureNumber, note} = action;
            const length = state.chosenLength;
            
            if(!position) {
                return {...state, previewNote: null};
            }

            const adjustedPosition = adjustPosition(length, position);
            const changedMeasure = state.measures.find(m => m.number === measureNumber);

            const noteIsSame = 
                state.previewNote 
                && state.previewNote.value === note 
                && state.previewNote.position === adjustedPosition
                && state.previewNote.measureNumber === measureNumber;

            if(noteIsSame) {
                return state;
            }

            if(findIntersection(changedMeasure.notes, adjustedPosition, note, length) != null) {
                return {...state, previewNote: null};
            }

            const previewNote = {
                value: note, 
                position: adjustedPosition, 
                length: length,
                measureNumber: measureNumber
            };

            return {...state, previewNote}
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