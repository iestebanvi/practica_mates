import { randomInt, mezclar } from './common.js'

const MINUTOS_VALIDOS = [0, 15, 30, 45]
const NUM_OPCIONES = 4
const PUNTOS_HORA = 10

function formatoHora(hora, minuto) {
  return `${hora}:${String(minuto).padStart(2, '0')}`
}

function horaAleatoria() {
  return {
    hora: randomInt(1, 12),
    minuto: MINUTOS_VALIDOS[randomInt(0, MINUTOS_VALIDOS.length - 1)],
  }
}

export function generarHora() {
  const { hora, minuto } = horaAleatoria()
  const respuesta = formatoHora(hora, minuto)

  const opciones = new Set([respuesta])
  while (opciones.size < NUM_OPCIONES) {
    const distractor = horaAleatoria()
    opciones.add(formatoHora(distractor.hora, distractor.minuto))
  }

  return {
    tipo: 'hora',
    hora,
    minuto,
    respuesta,
    opciones: mezclar([...opciones]),
    puntos: PUNTOS_HORA,
  }
}
