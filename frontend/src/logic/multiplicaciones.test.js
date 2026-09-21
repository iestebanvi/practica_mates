import { describe, it, expect } from 'vitest'
import { generarMultiplicacion } from './multiplicaciones.js'

describe('generarMultiplicacion', () => {
  it('la respuesta es siempre el producto de los dos números del enunciado', () => {
    for (let i = 0; i < 100; i++) {
      const ej = generarMultiplicacion('medio')
      const [a, b] = ej.enunciado.split(' × ').map(Number)
      expect(ej.respuesta).toBe(a * b)
      expect(ej.tipo).toBe('multiplicacion')
    }
  })

  it('en nivel dificil usa un multiplicador de una sola cifra', () => {
    for (let i = 0; i < 100; i++) {
      const ej = generarMultiplicacion('dificil')
      const [, b] = ej.enunciado.split(' × ').map(Number)
      expect(b).toBeGreaterThanOrEqual(2)
      expect(b).toBeLessThanOrEqual(9)
    }
  })
})
