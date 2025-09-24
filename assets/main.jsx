import { createRoot } from 'react-dom/client';
import {StrictMode} from "react";
import App from './react/App.jsx';

const container = document.getElementById('react-root');

if (container) {
    const root = createRoot(container);
    root.render(
        <StrictMode>
            <App />
        </StrictMode>
    );
}
