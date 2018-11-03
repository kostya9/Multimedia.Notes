const range = (start, length) => {
    return Array.from({ length }, (_, i) => start + i);
}

const stepRange = (start, end, step) => {
    return range(start, (end - start) / step).map(el => el * step);
}

console.log(stepRange(3, 5, 1))