export const initApp = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const h1 = document.createElement('h1');
        h1.innerText = 'Hello world!';
        document.body.appendChild(h1);
    });
}
