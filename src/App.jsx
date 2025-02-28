import { useState } from 'react'
import './App.css'
import NavbarComponent from './components/navbar/NavbarComponent'
import FooterComponent from './components/footer/FooterComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavbarComponent></NavbarComponent>
      <FooterComponent></FooterComponent>
    </>
  )
}

export default App
