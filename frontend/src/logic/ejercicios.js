import { randomInt } from './common.js'
import { generarSuma } from './sumas.js'
import { generarResta } from './restas.js'
import { generarMultiplicacion } from './multiplicaciones.js'
import { generarDivision } from './divisiones.js'

const GENERADORES = {
  suma: generarSuma,
  resta: generarResta,
  multiplicacion: generarMultiplicacion,
  division: generarDivision,
}

export function generarEjercicio(operacion, nivel = 'facil') {
  const generador = GENERADORES[operacion]
  if (!generador) {
    throw new Error(`Operación desconocida: ${operacion}`)
  }
  return generador(nivel)
}

export function generarEjercicioAleatorio(operaciones, nivel = 'facil') {
  const operacion = operaciones[randomInt(0, operaciones.length - 1)]
  return generarEjercicio(operacion, nivel)
}

export function comprobarRespuesta(ejercicio, respuestaUsuario) {
  return Number(respuestaUsuario) === ejercicio.respuesta
}

const PUNTOS_PROBLEMA = 20

// El perfil "mayor" incluye 'problema' entre sus operaciones, pero esos
// ejercicios no se generan: se eligen del banco curado que llega del backend.
// Si el banco aún no ha cargado, se descarta esa opción para no bloquear el juego.
export function elegirTipoOperacion(operaciones, bancoProblemas = []) {
  const disponibles = operaciones.filter((op) => op !== 'problema' || bancoProblemas.length > 0)
  return disponibles[randomInt(0, disponibles.length - 1)]
}

export function generarEjercicioDesdeBanco(bancoProblemas) {
  const problema = bancoProblemas[randomInt(0, bancoProblemas.length - 1)]
  return {
    tipo: 'problema',
    enunciado: problema.enunciado,
    respuesta: problema.respuesta,
    puntos: PUNTOS_PROBLEMA,
  }
}

export function generarEjercicioParaPerfil(perfil, bancoProblemas = []) {
  const tipo = elegirTipoOperacion(perfil.operaciones, bancoProblemas)
  if (tipo === 'problema') {
    return generarEjercicioDesdeBanco(bancoProblemas)
  }
  return generarEjercicio(tipo, perfil.nivel)
}
