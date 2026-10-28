import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App.tsx'

// Prevent flash of wrong theme before React hydrates
const stored = localStorage.getItem('hs-portfolio-theme')
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
if (stored === 'dark' || (!stored && systemDark)) {
  document.documentElement.classList.add('dark')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
