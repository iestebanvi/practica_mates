import { describe, it, expect } from 'vitest'
import { generarSuma } from './sumas.js'

describe('generarSuma', () => {
  it('la respuesta es siempre la suma de los dos números del enunciado', () => {
    for (let i = 0; i < 100; i++) {
      const ej = generarSuma('medio')
      const [a, b] = ej.enunciado.split(' + ').map(Number)
      expect(ej.respuesta).toBe(a + b)
      expect(ej.tipo).toBe('suma')
    }
  })

  it('respeta el rango máximo del nivel', () => {
    for (let i = 0; i < 100; i++) {
      const ej = generarSuma('facil')
      const [a, b] = ej.enunciado.split(' + ').map(Number)
      expect(a).toBeGreaterThanOrEqual(0)
      expect(a).toBeLessThanOrEqual(10)
      expect(b).toBeGreaterThanOrEqual(0)
      expect(b).toBeLessThanOrEqual(10)
    }
  })
})
