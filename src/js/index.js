import App from './App';
import Page from './components/Page';
import TextSplit from './components/TextSplit';

window.addEventListener('DOMContentLoaded', () => {
    window.__APP__ = new App([
        {
            component: Page,
            name: 'page',
        },
        {
            component: TextSplit,
            name: 'textSplit',
        },
    ]);
});
