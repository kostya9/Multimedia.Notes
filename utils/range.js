export const range = (start, length) => {
    return Array.from({ length }, (_, i) => start + i);
}

export const stepRange = (start, end, step) => {
    return range(start, (end - start) / step).map(el => el * step);
}