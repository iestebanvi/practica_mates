import { randomInt } from './common.js'

const RANGOS = {
  facil: { min: 1, max: 10 },
  medio: { min: 1, max: 12 },
  dificil: { min: 1, max: 20 },
}

export function generarDivision(nivel = 'facil') {
  const { min, max } = RANGOS[nivel]
  const divisor = randomInt(2, max)
  const cociente = randomInt(min, max)
  const dividendo = divisor * cociente // siempre exacta, sin resto
  return {
    tipo: 'division',
    enunciado: `${dividendo} ÷ ${divisor}`,
    respuesta: cociente,
    puntos: 15,
  }
}
