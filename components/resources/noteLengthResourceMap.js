export function mapNoteLengthToSvg(length) {
    const src = `img/note${length}.svg`;
    const size = length === '8n' ? 23 : 15;
    return {src, size};
}