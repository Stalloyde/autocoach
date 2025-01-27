import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './index.css';
import App from './App';

const root = document.getElementById('root');

if (root)
    ReactDOM.createRoot(root).render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
