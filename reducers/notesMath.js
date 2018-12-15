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
        .filter(n => isInLine(n.value, value))
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

export const nextNote = (value) => {
    if(value.length === 2) {
        return value[0] + '#' + value[1];
    }

    if(value[1] == '#') {
        return value[0] + 'b' + value[2];
    }

    return value[0] + value[2];
}

export const isInLine = (value1, value2) => {
    var lineNumber1 = value1[value1.length - 1];
    var lineNumber2 = value2[value2.length - 1];
    return value1[0] === value2[0] && lineNumber1 === lineNumber2;
}