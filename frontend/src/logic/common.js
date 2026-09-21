export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function mezclar(array) {
  const copia = [...array]
  for (let i = copia.length - 1; i > 0; i--) {
    const j = randomInt(0, i)
    ;[copia[i], copia[j]] = [copia[j], copia[i]]
  }
  return copia
}
