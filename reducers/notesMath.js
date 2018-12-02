import { range, stepRange } from "../utils/range";
import { nearest } from "../utils/nearest";

export const parseLength = (length) => {
    return 1 / +length[0];
}

export const findIntersection = (notes, position, value, length, max) => {
    const numericLength = parseLength(length) / max;

    const isIntersectingWith = (n) => {
        const nNumericLength = parseLength(n.length) / max;
        return (position >= (n.position) && position < (n.position + nNumericLength))
            || (n.position >= position && n.position < (position + numericLength));
    }

    return notes
        .filter(n => n.value === value)
        .find(n => isIntersectingWith(n));
}

export const adjustPosition = (length, position, max) => {
    const numericLength = parseLength(length) / max;
    const noteRange = stepRange(0, 1 - numericLength, 1/8 / max); // 1/8 - min step

    const foundNearest = nearest(noteRange, position);
    if(foundNearest + numericLength > 1) {
        return null;
    }

    return foundNearest;
}