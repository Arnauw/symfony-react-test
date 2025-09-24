import './bootstrap.js';
/*
 * Welcome to your app's main JavaScript file!
 *
 * This file will be included onto the page via the importmap() Twig function,
 * which should already be in your base.html.twig.
 */
import './styles/app.css';

console.log('This log comes from assets/app.jsx - welcome to AssetMapper! 🎉');


import { createRoot } from 'react-dom/client';
import {StrictMode} from "react";
import {App} from './react/App.jsx';

const container = document.getElementById('react-root');

if (container) {
    const root = createRoot(container);
    root.render(
        <StrictMode>
            <App />
        </StrictMode>
    );
}
