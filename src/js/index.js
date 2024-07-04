import App from './App';
import Equinox from './components/Equinox';
import TextSplit from './components/TextSplit';

window.addEventListener('DOMContentLoaded', () => {
    window.__APP__ = new App([
        {
            component: Equinox,
            name: 'equinox',
        },
        {
            component: TextSplit,
            name: 'textSplit',
        },
    ]);
});
