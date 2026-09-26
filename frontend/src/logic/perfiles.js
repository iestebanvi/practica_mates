export const PERFILES = {
  pequeno: {
    id: 'pequeno',
    nombre: 'Peque (6 años)',
    operaciones: ['suma', 'resta'],
    nivel: 'facil',
  },
  mayor: {
    id: 'mayor',
    nombre: 'Mayor (11 años)',
    operaciones: ['suma', 'resta', 'multiplicacion', 'division', 'problema'],
    nivel: 'medio',
  },
}

// El perfil "mayor" elige, en una pantalla aparte, entre practicar solo
// aritmética o solo problemas de enunciado (no se mezclan entre sí).
export const MODOS_MAYOR = {
  aritmetica: {
    id: 'aritmetica',
    nombre: 'Aritmética',
    operaciones: ['suma', 'resta', 'multiplicacion', 'division'],
  },
  problemas: {
    id: 'problemas',
    nombre: 'Problemas',
    operaciones: ['problema'],
  },
  vocabulario: {
    id: 'vocabulario',
    nombre: 'Vocabulario',
    operaciones: ['vocabulario'],
  },
}

// El perfil "pequeño" también elige entre sumas o restas por separado:
// todavía no domina bien la resta, así que no conviene mezclarlas.
export const MODOS_PEQUE = {
  sumas: {
    id: 'sumas',
    nombre: 'Sumas',
    operaciones: ['suma'],
  },
  restas: {
    id: 'restas',
    nombre: 'Restas',
    operaciones: ['resta'],
  },
  horas: {
    id: 'horas',
    nombre: 'Horas',
    operaciones: ['hora'],
  },
}

export const MODOS_POR_PERFIL = {
  pequeno: MODOS_PEQUE,
  mayor: MODOS_MAYOR,
}
