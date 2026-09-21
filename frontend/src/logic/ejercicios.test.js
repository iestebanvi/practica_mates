import { describe, it, expect } from 'vitest'
import {
  generarEjercicio,
  generarEjercicioAleatorio,
  comprobarRespuesta,
  elegirTipoOperacion,
  generarEjercicioDesdeBanco,
  generarEjercicioParaPerfil,
} from './ejercicios.js'
import { PERFILES } from './perfiles.js'

describe('generarEjercicio', () => {
  it('genera un ejercicio del tipo pedido', () => {
    expect(generarEjercicio('suma').tipo).toBe('suma')
    expect(generarEjercicio('resta').tipo).toBe('resta')
    expect(generarEjercicio('multiplicacion').tipo).toBe('multiplicacion')
    expect(generarEjercicio('division').tipo).toBe('division')
  })

  it('lanza un error si la operación no existe', () => {
    expect(() => generarEjercicio('potencia')).toThrow()
  })
})

describe('generarEjercicioAleatorio', () => {
  it('solo genera operaciones incluidas en la lista dada (perfil pequeño)', () => {
    for (let i = 0; i < 50; i++) {
      const ej = generarEjercicioAleatorio(PERFILES.pequeno.operaciones)
      expect(PERFILES.pequeno.operaciones).toContain(ej.tipo)
    }
  })

  it('puede generar las 4 operaciones aritméticas del perfil mayor', () => {
    const operacionesAritmeticas = PERFILES.mayor.operaciones.filter((op) => op !== 'problema')
    const tipos = new Set()
    for (let i = 0; i < 200; i++) {
      tipos.add(generarEjercicioAleatorio(operacionesAritmeticas).tipo)
    }
    expect(tipos).toEqual(new Set(operacionesAritmeticas))
  })
})

describe('elegirTipoOperacion', () => {
  it('excluye "problema" si el banco de problemas está vacío', () => {
    for (let i = 0; i < 50; i++) {
      expect(elegirTipoOperacion(PERFILES.mayor.operaciones, [])).not.toBe('problema')
    }
  })

  it('puede elegir "problema" si el banco tiene contenido', () => {
    const banco = [{ enunciado: 'x', respuesta: 1 }]
    const tipos = new Set()
    for (let i = 0; i < 200; i++) {
      tipos.add(elegirTipoOperacion(PERFILES.mayor.operaciones, banco))
    }
    expect(tipos).toContain('problema')
  })
})

describe('generarEjercicioDesdeBanco', () => {
  it('devuelve un ejercicio de tipo problema con los datos del banco', () => {
    const banco = [{ enunciado: 'Un enunciado de prueba', respuesta: 42 }]
    expect(generarEjercicioDesdeBanco(banco)).toEqual({
      tipo: 'problema',
      enunciado: 'Un enunciado de prueba',
      respuesta: 42,
      puntos: 20,
    })
  })
})

describe('generarEjercicioParaPerfil', () => {
  it('nunca genera un problema si el banco está vacío', () => {
    for (let i = 0; i < 50; i++) {
      expect(generarEjercicioParaPerfil(PERFILES.mayor, []).tipo).not.toBe('problema')
    }
  })

  it('puede generar un problema del banco cuando hay contenido', () => {
    const banco = [{ enunciado: 'Un enunciado de prueba', respuesta: 42 }]
    const tipos = new Set()
    for (let i = 0; i < 200; i++) {
      tipos.add(generarEjercicioParaPerfil(PERFILES.mayor, banco).tipo)
    }
    expect(tipos).toContain('problema')
  })
})

describe('comprobarRespuesta', () => {
  const ejercicio = { tipo: 'suma', enunciado: '2 + 3', respuesta: 5 }

  it('acepta la respuesta correcta, como número o como string', () => {
    expect(comprobarRespuesta(ejercicio, 5)).toBe(true)
    expect(comprobarRespuesta(ejercicio, '5')).toBe(true)
  })

  it('rechaza una respuesta incorrecta', () => {
    expect(comprobarRespuesta(ejercicio, 4)).toBe(false)
    expect(comprobarRespuesta(ejercicio, 'no sé')).toBe(false)
  })
})
