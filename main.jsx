import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Linkedin from './Linkedin.jsx'
// import Api from './Api.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Linkedin />
  {/*<Api />*/}
  </StrictMode>
)
