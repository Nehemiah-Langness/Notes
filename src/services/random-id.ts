export function randomID() {
    return uuidV4();
}

function uuidV4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
        const randomNumber = Math.random() * 16 | 0;
        const v = c == 'x' ? randomNumber : (randomNumber & 3 | 8);
        return v.toString(16);
    });
}