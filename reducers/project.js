import { INIT_PROJECT, ADD_NOTE, REMOVE_NOTE, CHOOSE_LENGTH, PREVIEW_CHANGE, EDIT_MODE_ENTERED, PLAY_MODE_ENTERED } from "../actions/project";
import { IPC_READ_RESPONSE, IPC_READ_REQUEST } from "../actions/ipcActions"
import { range } from "../utils/range";
import {adjustPosition, findIntersection, nextNote} from './notesMath';
import { playReducer } from "./play";

const minMeasures = 4;

export const projectReducer = (state = {}, action) => {
    switch(action.type) {
        case INIT_PROJECT:
        {
            let measures = range(0, minMeasures).map(r => ({number: r, notes: []}));
            return {
                measures,
                chosenLength: '4n',
                mode: 'edit',
                timeSignature: 4/4,
                playState: {
                    position: 0,
                    playing: false
                }
            }
        }
        case IPC_READ_RESPONSE: {
            return {
                measures: action.measures,
                chosenLength: '4n',
                mode: 'edit',
                timeSignature: action.timeSignature,
                playState: {
                    position: 0,
                    playing: false
                }
            }
        }
        case IPC_READ_REQUEST: {
            return {
                measures: null
            }
        }
        case EDIT_MODE_ENTERED: {
            return {...state, mode: 'edit'}
        }
        case PLAY_MODE_ENTERED: {
            return {...state, mode: 'play', previewNote: null}
        }
        case ADD_NOTE:
        {
            if(!state.previewNote) {
                return state;
            }

            const measureNumber = state.previewNote.measureNumber;
            const changedMeasure = state.measures[measureNumber];

            const intersected = state.previewNote.intersected;

            let newNote;
            if (intersected) {
                var nextValue = nextNote(intersected.value);
                newNote = {...intersected, value: nextValue };
                changedMeasure.notes = [...changedMeasure.notes.filter(n => n !== intersected)];    
            }
            else {
                newNote = {
                    value: state.previewNote.value, 
                    position: state.previewNote.position, 
                    length: state.previewNote.length
                };
            }

            changedMeasure.notes = [...changedMeasure.notes, newNote];
            console.log(changedMeasure, newNote);

            let newMeasures = state.measures;

            // If a note was added at last measure - add a measure
            if(measureNumber === newMeasures.length - 1) {
                newMeasures = [...newMeasures, {number: measureNumber + 1, notes: []}];
            }

            return {
                ...state,
                previewNote: {...state.previewNote, intersected: newNote},
                measures: newMeasures,
                notesToPlay: [newNote]
            }
        }
        case REMOVE_NOTE:
        {
            const {position, measureNumber, note} = action;
            const length = state.chosenLength;
            const changedMeasure = state.measures[measureNumber];
            const adjustedPosition = adjustPosition(length, position, 1); // remove to work anyways
            const toRemove = findIntersection(changedMeasure.notes, adjustedPosition, note, length, 1);

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

            const timeSignature = state.timeSignature;
            const adjustedPosition = adjustPosition(length, position, timeSignature);

            if(adjustedPosition === null)
                return {...state, lastUpdatedPreview: new Date()};
            
            const changedMeasure = state.measures[measureNumber];

            const noteIsSame = 
                state.previewNote 
                && state.previewNote.value === note 
                && state.previewNote.position === adjustedPosition
                && state.previewNote.measureNumber === measureNumber;

            if(noteIsSame) {
                return {...state, lastUpdatedPreview: new Date()};
            }

            const intersected = findIntersection(changedMeasure.notes, adjustedPosition, note, length, timeSignature);
            
            const previewNote = {
                value: note, 
                position: adjustedPosition, 
                length: length,
                measureNumber: measureNumber,
                intersected
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