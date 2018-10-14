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
            console.log(action, state)
            const measureNumber = action.measureNumber;
            const changedMeasure = state.measures.find(m => m.number == measureNumber);

            if(changedMeasure.currentPosition === 4) {
                return state;
            }

            const notes = [...changedMeasure.notes, {value: action.note, length: '8n'}]
            const newPosition = changedMeasure.currentPosition + 1;
            const newMeasures = state.measures.filter(m => m !== changedMeasure);

            return {
                ...state,
                measures: [...newMeasures, {currentPosition: newPosition, notes: notes, number: action.measureNumber}]
            }
        }
        default:
            return state;
    }
}