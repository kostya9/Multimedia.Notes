export const INIT_PROJECT = 'INIT_PROJECT';
export const ADD_NOTE = 'ADD_NOTE';
export const CHOOSE_LENGTH = 'CHOOSE_LENGTH';

export const init = () => ({
    type: INIT_PROJECT
});

export const choose_length = (length = '8n') => ({
    type: CHOOSE_LENGTH,
    length: length
});

export const addNote = (measureNumber, note, position) => ({
    type: ADD_NOTE,
    measureNumber: measureNumber,
    note: note,
    position: position // From 0 to 1
});