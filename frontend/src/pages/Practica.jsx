import { useEffect, useRef, useState } from 'react'
import { generarEjercicioParaPerfil, comprobarRespuesta } from '../logic/ejercicios.js'
import { PERFILES, MODOS_POR_PERFIL } from '../logic/perfiles.js'
import Reloj from '../components/Reloj.jsx'

const CELEBRACIONES = ['🎉', '🌟', '🦄', '🐉', '🚀', '🥳', '🌈', '🐬']
const TIPOS_SIN_ENUNCIADO = ['problema', 'hora']

function elegirCelebracion() {
  return CELEBRACIONES[Math.floor(Math.random() * CELEBRACIONES.length)]
}

export default function Practica({ perfilId, modo, onFinalizar }) {
  const perfilBase = PERFILES[perfilId]
  const esPeque = perfilId === 'pequeno'
  const modoActual = MODOS_POR_PERFIL[perfilId]?.[modo] ?? null
  const operaciones = modoActual ? modoActual.operaciones : perfilBase.operaciones
  const nivel = perfilBase.nivel
  const nombreMostrado = modoActual ? `${perfilBase.nombre} · ${modoActual.nombre}` : perfilBase.nombre
  const necesitaBanco = operaciones.includes('problema')
  const clasePantalla = `pantalla practica${esPeque ? ' peque' : ''}`

  const [bancoProblemas, setBancoProblemas] = useState([])
  const [bancoListo, setBancoListo] = useState(!necesitaBanco)
  const [bancoError, setBancoError] = useState(false)
  const [ejercicio, setEjercicio] = useState(() =>
    necesitaBanco ? null : generarEjercicioParaPerfil({ operaciones, nivel }, []),
  )
  const [respuesta, setRespuesta] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [ultimoIntento, setUltimoIntento] = useState(null)
  const [celebracion, setCelebracion] = useState(null)
  const [puntos, setPuntos] = useState(0)
  const [aciertos, setAciertos] = useState(0)
  const [fallos, setFallos] = useState(0)
  const inputRef = useRef(null)

  function cargarBanco() {
    setBancoError(false)
    fetch('/api/problemas')
      .then((res) => res.json())
      .then((data) => {
        setBancoProblemas(data)
        setBancoListo(true)
      })
      .catch(() => setBancoError(true))
  }

  useEffect(() => {
    if (necesitaBanco) cargarBanco()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (bancoListo && ejercicio === null) {
      setEjercicio(generarEjercicioParaPerfil({ operaciones, nivel }, bancoProblemas))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bancoListo])

  useEffect(() => {
    if (ejercicio?.tipo !== 'hora') inputRef.current?.focus()
  }, [ejercicio])

  function procesarRespuesta(respuestaDada) {
    if (feedback !== null || !ejercicio) return

    const esCorrecta = comprobarRespuesta(ejercicio, respuestaDada)
    setUltimoIntento({
      tipo: ejercicio.tipo,
      enunciado: ejercicio.enunciado,
      respuestaCorrecta: ejercicio.respuesta,
      respuestaDada,
      esCorrecta,
    })

    if (esCorrecta) {
      setPuntos((p) => p + ejercicio.puntos)
      setAciertos((a) => a + 1)
      setFeedback('correcto')
      if (esPeque) setCelebracion(elegirCelebracion())
    } else {
      setFallos((f) => f + 1)
      setFeedback('incorrecto')
    }

    setTimeout(() => {
      setEjercicio(generarEjercicioParaPerfil({ operaciones, nivel }, bancoProblemas))
      setRespuesta('')
      setFeedback(null)
      setCelebracion(null)
    }, 900)
  }

  function comprobar(evento) {
    evento.preventDefault()
    if (respuesta === '') return
    procesarRespuesta(respuesta)
  }

  function finalizar() {
    onFinalizar({ puntos, aciertos, fallos })
  }

  if (bancoError) {
    return (
      <div className={clasePantalla}>
        <p>No se han podido cargar los problemas.</p>
        <button onClick={cargarBanco}>Reintentar</button>
      </div>
    )
  }

  if (!ejercicio) {
    return (
      <div className={clasePantalla}>
        <p>Cargando…</p>
      </div>
    )
  }

  const esProblema = ejercicio.tipo === 'problema'
  const esHora = ejercicio.tipo === 'hora'
  const sinEnunciado = TIPOS_SIN_ENUNCIADO.includes(ultimoIntento?.tipo)

  return (
    <div className={clasePantalla}>
      <div className="marcador">
        <span>{nombreMostrado}</span>
        <span className="puntos">⭐ {puntos}</span>
      </div>

      {ultimoIntento && (
        <p className={`anterior ${ultimoIntento.esCorrecta ? 'correcto' : 'incorrecto'}`}>
          {ultimoIntento.esCorrecta
            ? sinEnunciado
              ? 'Anterior: ✓ correcto'
              : `Anterior: ${ultimoIntento.enunciado} = ${ultimoIntento.respuestaCorrecta} ✓`
            : sinEnunciado
              ? `Anterior: ✗ tu respuesta (${ultimoIntento.respuestaDada}) — la correcta era ${ultimoIntento.respuestaCorrecta}`
              : `Anterior: ${ultimoIntento.enunciado} = ${ultimoIntento.respuestaCorrecta} ✗ (pusiste ${ultimoIntento.respuestaDada})`}
        </p>
      )}

      {esHora ? (
        <>
          <Reloj hora={ejercicio.hora} minuto={ejercicio.minuto} />
          <div className="opciones-hora">
            {ejercicio.opciones.map((opcion) => (
              <button key={opcion} onClick={() => procesarRespuesta(opcion)} disabled={feedback !== null}>
                {opcion}
              </button>
            ))}
          </div>
        </>
      ) : (
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
      )}

      <div className="feedback-hueco">
        {feedback === 'correcto' && esPeque && (
          <p className="celebracion" aria-hidden="true">
            {celebracion}
          </p>
        )}
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
