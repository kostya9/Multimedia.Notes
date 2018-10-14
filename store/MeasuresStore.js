import { observable } from "mobx";
import clearObject from "../utils/clearObject";


export default class MeasuresStore {
    @observable measures = {};

    init() {
        clearObject(this.measures);

        const measuresCount = 5;
        for (let i = 0; i < measuresCount; i++ ) {
            this.measures[i] = {number: i, currentNotePosition: 0, notes: []}
        }
    }
}