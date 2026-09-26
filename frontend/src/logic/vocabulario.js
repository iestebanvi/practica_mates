import { randomInt, mezclar } from './common.js'

const NUM_OPCIONES = 4
const PUNTOS_VOCABULARIO = 10

export function generarVocabulario(bancoVocabulario) {
  const palabra = bancoVocabulario[randomInt(0, bancoVocabulario.length - 1)]
  const respuesta = palabra.catalan

  const opciones = new Set([respuesta])
  while (opciones.size < NUM_OPCIONES && opciones.size < bancoVocabulario.length) {
    const distractor = bancoVocabulario[randomInt(0, bancoVocabulario.length - 1)]
    opciones.add(distractor.catalan)
  }

  return {
    tipo: 'vocabulario',
    enunciado: palabra.ingles,
    respuesta,
    opciones: mezclar([...opciones]),
    puntos: PUNTOS_VOCABULARIO,
  }
}
