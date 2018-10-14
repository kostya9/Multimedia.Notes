export const INIT_PROJECT = 'INIT_PROJECT';
export const ADD_NOTE = 'ADD_NOTE';

export const init = () => ({
    type: INIT_PROJECT
});

export const addNote = (measureNumber, note) => ({
    type: ADD_NOTE,
    measureNumber: measureNumber,
    note: note
});