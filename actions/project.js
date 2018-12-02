export const INIT_PROJECT = 'INIT_PROJECT';
export const ADD_NOTE = 'ADD_NOTE';
export const REMOVE_NOTE = 'REMOVE_NOTE';
export const CHOOSE_LENGTH = 'CHOOSE_LENGTH';
export const PREVIEW_CHANGE = 'PREVIEW_CHANGE';

export const PLAY_MODE_ENTERED = 'PLAY_MODE_ENTERED';
export const EDIT_MODE_ENTERED = 'EDIT_MODE_ENTERED';

export const init = () => ({
    type: INIT_PROJECT
});

export const playMode = () => ({
    type: PLAY_MODE_ENTERED
});

export const editMode = () => ({
    type: EDIT_MODE_ENTERED
});

export const chooseLength = (length = '8n') => ({
    type: CHOOSE_LENGTH,
    length: length
});

export const previewChange = (measureNumber, note, position) => ({
    type: PREVIEW_CHANGE,
    measureNumber: measureNumber,
    note: note,
    position: position // From 0 to 1
});

export const removeNote = (measureNumber, note, position) => ({
    type: REMOVE_NOTE,
    measureNumber: measureNumber,
    note: note,
    position: position // From 0 to 1
});

export const addNote = () => ({
    type: ADD_NOTE
});