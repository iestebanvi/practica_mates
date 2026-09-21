import { describe, it, expect } from 'vitest'
import { generarResta } from './restas.js'

describe('generarResta', () => {
  it('la respuesta es siempre la resta de los dos números y nunca es negativa', () => {
    for (let i = 0; i < 100; i++) {
      const ej = generarResta('medio')
      const [a, b] = ej.enunciado.split(' - ').map(Number)
      expect(ej.respuesta).toBe(a - b)
      expect(ej.respuesta).toBeGreaterThanOrEqual(0)
      expect(ej.tipo).toBe('resta')
    }
  })

  it('respeta el rango máximo del nivel', () => {
    for (let i = 0; i < 100; i++) {
      const ej = generarResta('facil')
      const [a] = ej.enunciado.split(' - ').map(Number)
      expect(a).toBeLessThanOrEqual(10)
    }
  })
})
