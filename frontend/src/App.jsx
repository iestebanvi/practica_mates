import { useState } from 'react'
import Home from './pages/Home.jsx'
import Modo from './pages/Modo.jsx'
import Practica from './pages/Practica.jsx'
import Resumen from './pages/Resumen.jsx'

function App() {
  const [pantalla, setPantalla] = useState('home')
  const [perfilId, setPerfilId] = useState(null)
  const [modo, setModo] = useState(null)
  const [resumen, setResumen] = useState(null)

  function seleccionarPerfil(id) {
    setPerfilId(id)
    setPantalla('modo')
  }

  function seleccionarModo(modoId) {
    setModo(modoId)
    setPantalla('practica')
  }

  function finalizarSesion(resultado) {
    setResumen(resultado)
    setPantalla('resumen')
  }

  function volverAlInicio() {
    setPerfilId(null)
    setModo(null)
    setResumen(null)
    setPantalla('home')
  }

  return (
    <div className="app">
      {pantalla === 'home' && <Home onSeleccionarPerfil={seleccionarPerfil} />}
      {pantalla === 'modo' && (
        <Modo perfilId={perfilId} onSeleccionarModo={seleccionarModo} onVolver={volverAlInicio} />
      )}
      {pantalla === 'practica' && (
        <Practica perfilId={perfilId} modo={modo} onFinalizar={finalizarSesion} />
      )}
      {pantalla === 'resumen' && (
        <Resumen resumen={resumen} perfilId={perfilId} onVolver={volverAlInicio} />
      )}
    </div>
  )
}

export default App
