import { randomInt } from './common.js'

const RANGOS = {
  facil: { min: 1, max: 10 }, // tablas de multiplicar
  medio: { min: 1, max: 20 },
  dificil: { min: 10, max: 99 }, // 2 cifras x 1 cifra
}

export function generarMultiplicacion(nivel = 'facil') {
  const { min, max } = RANGOS[nivel]
  const a = randomInt(min, max)
  const b = nivel === 'dificil' ? randomInt(2, 9) : randomInt(min, max)
  return {
    tipo: 'multiplicacion',
    enunciado: `${a} × ${b}`,
    respuesta: a * b,
    puntos: 15,
  }
}
