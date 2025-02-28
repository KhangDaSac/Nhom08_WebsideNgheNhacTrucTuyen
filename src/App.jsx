import { useState } from 'react'
import './App.css'
import NavbarComponent from './components/navbar/NavbarComponent'
import FooterComponent from './components/footer/FooterComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavbarComponent></NavbarComponent>
      <div style={{width: "100%", height: "300px"}}></div>
      <FooterComponent></FooterComponent>
    </>
  )
}

export default App
