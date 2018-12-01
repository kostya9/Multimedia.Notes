import { INIT_PROJECT, ADD_NOTE, REMOVE_NOTE, CHOOSE_LENGTH, PREVIEW_CHANGE } from "../actions/project";
import { IPC_READ_RESPONSE, IPC_READ_REQUEST } from "../actions/ipcActions"
import { range, stepRange } from "../utils/range";
import { nearest } from "../utils/nearest";
import { playReducer } from "./play";

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
    const noteRange = stepRange(0, 1 - numericLength, 1/8); // 1/8 - min step
    return nearest(noteRange, position);
}

const minMeasures = 4;

export const projectReducer = (state = {}, action) => {
    switch(action.type) {
        case INIT_PROJECT:
        {
            let measures = range(0, minMeasures).map(r => ({number: r, notes: []}));
            return {
                measures,
                chosenLength: '4n'
            }
        }
        case IPC_READ_RESPONSE: {
            return {
                measures: action.measures,
                chosenLength: '4n'
            }
        }
        case IPC_READ_REQUEST: {
            return {
                measures: null
            }
        }
        case ADD_NOTE:
        {
            if(!state.previewNote) {
                return state;
            }

            const measureNumber = state.previewNote.measureNumber;
            const changedMeasure = state.measures[measureNumber];

            const newNote = {
                value: state.previewNote.value, 
                position: state.previewNote.position, 
                length: state.previewNote.length
            };

            changedMeasure.notes = [... changedMeasure.notes, newNote];

            let newMeasures = state.measures;

            // If a note was added at last measure - add a measure
            if(measureNumber === newMeasures.length - 1) {
                newMeasures = [...newMeasures, {number: measureNumber + 1, notes: []}];
            }

            return {
                ...state,
                previewNote: null,
                measures: newMeasures,
                noteToPlay: newNote
            }
        }
        case REMOVE_NOTE:
        {
            const {position, measureNumber, note} = action;
            const length = state.chosenLength;
            const changedMeasure = state.measures[measureNumber];
            const adjustedPosition = adjustPosition(length, position);
            const toRemove = findIntersection(changedMeasure.notes, adjustedPosition, note, length);

            if (toRemove == null) {
                return state;
            }

            changedMeasure.notes = changedMeasure.notes.filter(n => n !== toRemove);
            let newMeasures = state.measures;

            // Remove measures that have no notes beside them starting from the end
            let toDelete = newMeasures.length - 1;
            while(toDelete >= minMeasures && newMeasures[toDelete].notes.length === 0 && newMeasures[toDelete - 1].notes.length === 0) {
                newMeasures = [...newMeasures.filter((m, i) => i !== toDelete)];
                toDelete -= 1;
            }


            return {
                ...state,
                previewNote: null,
                measures: newMeasures
            }
        }
        case PREVIEW_CHANGE:
        {
            if(state.lastUpdatedPreview) {
                var diff = new Date().getTime() - state.lastUpdatedPreview.getTime();

                // too fast
                if(diff < 50) {
                    return state;
                }
            }

            const {position, measureNumber, note} = action;
            const length = state.chosenLength;
            
            if(!position) {
                return {...state, previewNote: null, lastUpdatedPreview: new Date()};
            }

            
            const adjustedPosition = adjustPosition(length, position);
            
            const changedMeasure = state.measures[measureNumber];

            const noteIsSame = 
                state.previewNote 
                && state.previewNote.value === note 
                && state.previewNote.position === adjustedPosition
                && state.previewNote.measureNumber === measureNumber;

            if(noteIsSame) {
                return {...state, lastUpdatedPreview: new Date()};
            }
            
            if(findIntersection(changedMeasure.notes, adjustedPosition, note, length) != null) {
                return {...state, previewNote: null, lastUpdatedPreview: new Date()};
            }

            const previewNote = {
                value: note, 
                position: adjustedPosition, 
                length: length,
                measureNumber: measureNumber
            };
            return {...state, previewNote, lastUpdatedPreview: new Date()}
        }
        case CHOOSE_LENGTH:
        {
            return {
                ...state,
                chosenLength: action.length
            }
        }
        default:
            return playReducer(state, action);
    }
}