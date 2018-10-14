import { INIT_PROJECT } from "../actions/project";
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
        default:
            return state;
    }
}