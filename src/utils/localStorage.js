export function setLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

export function getLocalStorage(key) {
    const value = localStorage.getItem(key);
    return value;
}