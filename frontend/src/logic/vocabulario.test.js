import { describe, it, expect } from 'vitest'
import { generarVocabulario } from './vocabulario.js'

const bancoDePrueba = [
  { id: 1, ingles: 'BREAKFAST', catalan: 'esmorzar' },
  { id: 2, ingles: 'LUNCH', catalan: 'dinar' },
  { id: 3, ingles: 'DINNER', catalan: 'sopar' },
  { id: 4, ingles: 'STREET', catalan: 'carrer' },
  { id: 5, ingles: 'SQUARE', catalan: 'plaça' },
]

describe('generarVocabulario', () => {
  it('genera un ejercicio de tipo vocabulario con una palabra del banco', () => {
    for (let i = 0; i < 50; i++) {
      const ej = generarVocabulario(bancoDePrueba)
      expect(ej.tipo).toBe('vocabulario')
      const palabra = bancoDePrueba.find((p) => p.ingles === ej.enunciado)
      expect(palabra).toBeDefined()
      expect(ej.respuesta).toBe(palabra.catalan)
      expect(ej.puntos).toBe(10)
    }
  })

  it('genera 4 opciones únicas que incluyen la respuesta correcta', () => {
    for (let i = 0; i < 50; i++) {
      const ej = generarVocabulario(bancoDePrueba)
      expect(ej.opciones).toHaveLength(4)
      expect(new Set(ej.opciones).size).toBe(4)
      expect(ej.opciones).toContain(ej.respuesta)
    }
  })

  it('no se cuelga si el banco tiene menos de 4 traducciones únicas', () => {
    const bancoPequeno = [
      { id: 1, ingles: 'A', catalan: 'un/a' },
      { id: 2, ingles: 'B', catalan: 'dos' },
    ]
    const ej = generarVocabulario(bancoPequeno)
    expect(ej.opciones.length).toBeLessThanOrEqual(2)
  })
})
