import { useEffect, useRef, useState } from 'react'
import { generarEjercicioParaPerfil, comprobarRespuesta } from '../logic/ejercicios.js'
import { PERFILES } from '../logic/perfiles.js'

export default function Practica({ perfilId, onFinalizar }) {
  const perfil = PERFILES[perfilId]
  const [bancoProblemas, setBancoProblemas] = useState([])
  const [ejercicio, setEjercicio] = useState(() => generarEjercicioParaPerfil(perfil, []))
  const [respuesta, setRespuesta] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [puntos, setPuntos] = useState(0)
  const [aciertos, setAciertos] = useState(0)
  const [fallos, setFallos] = useState(0)
  const inputRef = useRef(null)

  useEffect(() => {
    if (!perfil.operaciones.includes('problema')) return
    fetch('/api/problemas')
      .then((res) => res.json())
      .then(setBancoProblemas)
      .catch(() => setBancoProblemas([]))
  }, [perfil])

  useEffect(() => {
    inputRef.current?.focus()
  }, [ejercicio])

  function comprobar(evento) {
    evento.preventDefault()
    if (respuesta === '' || feedback !== null) return

    const esCorrecta = comprobarRespuesta(ejercicio, respuesta)
    if (esCorrecta) {
      setPuntos((p) => p + ejercicio.puntos)
      setAciertos((a) => a + 1)
      setFeedback('correcto')
    } else {
      setFallos((f) => f + 1)
      setFeedback('incorrecto')
    }

    setTimeout(() => {
      setEjercicio(generarEjercicioParaPerfil(perfil, bancoProblemas))
      setRespuesta('')
      setFeedback(null)
    }, 900)
  }

  function finalizar() {
    onFinalizar({ puntos, aciertos, fallos })
  }

  const esProblema = ejercicio.tipo === 'problema'

  return (
    <div className="pantalla practica">
      <div className="marcador">
        <span>{perfil.nombre}</span>
        <span className="puntos">⭐ {puntos}</span>
      </div>

      <form onSubmit={comprobar} className="ejercicio">
        <p className={`enunciado${esProblema ? ' enunciado-problema' : ''}`}>
          {ejercicio.enunciado}
          {!esProblema && ' ='}
        </p>
        <input
          ref={inputRef}
          type="number"
          inputMode="numeric"
          className={feedback === 'correcto' ? 'correcta' : feedback === 'incorrecto' ? 'incorrecta' : ''}
          value={respuesta}
          onChange={(e) => setRespuesta(e.target.value)}
          disabled={feedback !== null}
        />
        <button type="submit" disabled={feedback !== null}>
          Comprobar
        </button>
      </form>

      <div className="feedback-hueco">
        {feedback === 'correcto' && <p className="feedback correcto">¡Correcto! 🎉</p>}
        {feedback === 'incorrecto' && (
          <p className="feedback incorrecto">Casi... la respuesta era {ejercicio.respuesta}</p>
        )}
      </div>

      <button className="finalizar" onClick={finalizar}>
        Finalizar
      </button>
    </div>
  )
}
