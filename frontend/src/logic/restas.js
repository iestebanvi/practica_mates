import { randomInt } from './common.js'

const RANGOS = {
  facil: { min: 0, max: 10 },
  medio: { min: 0, max: 20 },
  dificil: { min: 0, max: 100 },
}

export function generarResta(nivel = 'facil') {
  const { min, max } = RANGOS[nivel]
  const a = randomInt(min, max)
  const b = randomInt(min, a) // b <= a: nunca da negativo
  return {
    tipo: 'resta',
    enunciado: `${a} - ${b}`,
    respuesta: a - b,
    puntos: 10,
  }
}
