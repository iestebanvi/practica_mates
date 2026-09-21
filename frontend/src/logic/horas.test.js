import { describe, it, expect } from 'vitest'
import { generarHora } from './horas.js'

describe('generarHora', () => {
  it('genera una hora entre 1 y 12 con minutos en cuartos', () => {
    for (let i = 0; i < 100; i++) {
      const ej = generarHora()
      expect(ej.tipo).toBe('hora')
      expect(ej.hora).toBeGreaterThanOrEqual(1)
      expect(ej.hora).toBeLessThanOrEqual(12)
      expect([0, 15, 30, 45]).toContain(ej.minuto)
    }
  })

  it('la respuesta tiene el formato "hora:minutos" con dos dígitos de minuto', () => {
    for (let i = 0; i < 50; i++) {
      const ej = generarHora()
      expect(ej.respuesta).toBe(`${ej.hora}:${String(ej.minuto).padStart(2, '0')}`)
    }
  })

  it('genera 4 opciones únicas que incluyen la respuesta correcta', () => {
    for (let i = 0; i < 50; i++) {
      const ej = generarHora()
      expect(ej.opciones).toHaveLength(4)
      expect(new Set(ej.opciones).size).toBe(4)
      expect(ej.opciones).toContain(ej.respuesta)
    }
  })
})
