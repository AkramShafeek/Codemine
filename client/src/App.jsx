import { NavbarSimple } from "./components/Navbar/Navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import CreateQuestion from "./pages/CreateQuestion"

function App() {
  return (
    <BrowserRouter>
      <NavbarSimple />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createQuestion" element={<CreateQuestion />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
