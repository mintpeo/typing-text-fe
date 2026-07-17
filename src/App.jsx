import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './constants/language/i18n.js'
import './App.css'

import Home from './mainPage/home/Home.jsx'
import Auth from './mainPage/auth/Auth.jsx'
import Layout from './Layout.jsx'
import { Analytics } from "@vercel/analytics/react"

function App() {

  return (
    <>
        <Analytics />
        <Router>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    {/*<Route path="/products" element={<Products />} />*/}
                    <Route path="/auth" element={<Auth />} />
                </Route>

                {/* Not Use Header */}
            </Routes>
        </Router>
    </>
  )
}

export default App
