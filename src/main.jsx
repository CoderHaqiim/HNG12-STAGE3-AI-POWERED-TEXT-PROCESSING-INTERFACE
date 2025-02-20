const setMetaTag = (type, name, content) => {
  if (!content) return; 
  let metaTag = document.querySelector(`meta[${type}="${name}"]`);
  if (!metaTag) {
    metaTag = document.createElement("meta");
    metaTag.setAttribute(type, name);
    document.head.appendChild(metaTag);
  }
  metaTag.setAttribute("content", content);
};

setMetaTag("http-equiv", "origin-trial", import.meta.env.VITE_APP_SUMMARY_ORIGIN_TRIAL);
setMetaTag("http-equiv", "origin-trial", import.meta.env.VITE_APP_TRANSLATION_ORIGIN_TRIAL);
setMetaTag("http-equiv", "origin-trial", import.meta.env.VITE_APP_DETECTION_ORIGIN_TRIAL);

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
 <Provider store={store}>
     <StrictMode>
      <App />
    </StrictMode>
 </Provider>,
)