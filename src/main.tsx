import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initGA } from './utils/analytics'

void initGA()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const base = import.meta.env.BASE_URL
    navigator.serviceWorker
      .register(`${base}service-worker.js`)
      .then((registration) => {
        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.addEventListener('controllerchange', () => {
            window.location.reload()
          })
        }
        window.addEventListener('online', () => {
          registration.update()
          window.location.reload()
        })
      })
      .catch((error) => {
        console.error('Service worker registration failed:', error)
      })
  })
}
