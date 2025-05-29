import ReactDOM from "react-dom/client";
import App from "./App";
import { StrictMode } from 'react'

const root = document.getElementById('root');
const component = ReactDOM.createRoot(root)

component.render(
    <StrictMode>
        <App />
    </StrictMode>
)
