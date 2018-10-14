import { INIT_PROJECT, ADD_NOTE } from "../actions/project";
import range from "../utils/range";

export const projectReducer = (state = {}, action) => {
    switch(action.type) {
        case INIT_PROJECT:
        {
            let measures = range(0, 5).map(r => ({number: r, currentPosition: 0, notes: []}));
            return {
                measures
            }
        }
        case ADD_NOTE:
        {
            const measureNumber = action.measureNumber;
            const changedMeasure = state.measures.find(m => m.number === measureNumber);

            if(changedMeasure.currentPosition === 4) {
                return state;
            }

            const notes = [...changedMeasure.notes, {value: action.note, length: '8n'}]
            const newPosition = changedMeasure.currentPosition + 1;

            // TODO: cleanup this hacky replace a bit
            const newMeasures = [...state.measures.filter(m => m !== changedMeasure), {currentPosition: newPosition, notes: notes, number: measureNumber}];
            newMeasures.sort((m1, m2) => m1.number - m2.number);

            return {
                ...state,
                measures: newMeasures
            }
        }
        default:
            return state;
    }
}