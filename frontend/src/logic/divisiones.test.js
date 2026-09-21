import { describe, it, expect } from 'vitest'
import { generarDivision } from './divisiones.js'

describe('generarDivision', () => {
  it('la división es siempre exacta (sin resto) y coincide con la respuesta', () => {
    for (let i = 0; i < 100; i++) {
      const ej = generarDivision('medio')
      const [dividendo, divisor] = ej.enunciado.split(' ÷ ').map(Number)
      expect(dividendo % divisor).toBe(0)
      expect(dividendo / divisor).toBe(ej.respuesta)
      expect(ej.tipo).toBe('division')
    }
  })

  it('el divisor nunca es cero', () => {
    for (let i = 0; i < 100; i++) {
      const ej = generarDivision('facil')
      const [, divisor] = ej.enunciado.split(' ÷ ').map(Number)
      expect(divisor).not.toBe(0)
    }
  })
})
