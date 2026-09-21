import { useState } from 'react'
import Home from './pages/Home.jsx'
import Practica from './pages/Practica.jsx'
import Resumen from './pages/Resumen.jsx'

function App() {
  const [pantalla, setPantalla] = useState('home')
  const [perfilId, setPerfilId] = useState(null)
  const [resumen, setResumen] = useState(null)

  function seleccionarPerfil(id) {
    setPerfilId(id)
    setPantalla('practica')
  }

  function finalizarSesion(resultado) {
    setResumen(resultado)
    setPantalla('resumen')
  }

  function volverAlInicio() {
    setPerfilId(null)
    setResumen(null)
    setPantalla('home')
  }

  return (
    <div className="app">
      {pantalla === 'home' && <Home onSeleccionarPerfil={seleccionarPerfil} />}
      {pantalla === 'practica' && (
        <Practica perfilId={perfilId} onFinalizar={finalizarSesion} />
      )}
      {pantalla === 'resumen' && <Resumen resumen={resumen} onVolver={volverAlInicio} />}
    </div>
  )
}

export default App
