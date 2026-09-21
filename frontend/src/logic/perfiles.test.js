import { describe, it, expect } from 'vitest'
import { MODOS_MAYOR, MODOS_PEQUE } from './perfiles.js'

describe('MODOS_MAYOR', () => {
  it('el modo aritmética no incluye problemas', () => {
    expect(MODOS_MAYOR.aritmetica.operaciones).not.toContain('problema')
  })

  it('el modo problemas solo contiene el tipo problema', () => {
    expect(MODOS_MAYOR.problemas.operaciones).toEqual(['problema'])
  })
})

describe('MODOS_PEQUE', () => {
  it('el modo sumas solo contiene sumas', () => {
    expect(MODOS_PEQUE.sumas.operaciones).toEqual(['suma'])
  })

  it('el modo restas solo contiene restas', () => {
    expect(MODOS_PEQUE.restas.operaciones).toEqual(['resta'])
  })
})
