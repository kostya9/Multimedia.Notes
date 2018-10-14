const range = (start, length) => {
    return Array.from({ length }, (_, i) => start + i);
}

export default range;