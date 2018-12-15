export function mapNoteToSvg(length, value = '') {
    var suffix = '';
    let size = length === '8n' ? 23 : 15;
    if(value.length === 3) {
        suffix = value[1] === 'b' ? 'b' : 's';
        size += 8;
    }

    const src = `img/note${length}${suffix}.svg`;
    return {src, size};
}