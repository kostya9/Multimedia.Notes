export const range = (start, length) => {
    return Array.from({ length }, (_, i) => start + i);
}

export const stepRange = (start, end, step) => {
    return Array.from({ length: 1 + (end - start) / step }, (_, i) => start + i * step);
}