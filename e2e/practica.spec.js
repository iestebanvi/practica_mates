import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { test, expect } from '@playwright/test'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const bancoProblemas = JSON.parse(
  readFileSync(
    path.join(__dirname, '..', 'backend', 'src', 'data', 'problemas-6primaria.json'),
    'utf-8',
  ),
)
const respuestasProblemas = new Map(bancoProblemas.map((p) => [p.enunciado, p.respuesta]))

function respuestaCorrecta(enunciado) {
  if (respuestasProblemas.has(enunciado)) {
    return respuestasProblemas.get(enunciado)
  }
  const [a, op, b] = enunciado.replace('=', '').trim().split(' ')
  const operaciones = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '×': (x, y) => x * y,
    '÷': (x, y) => x / y,
  }
  return operaciones[op](Number(a), Number(b))
}

function puntosEsperados(enunciado) {
  if (respuestasProblemas.has(enunciado)) return 20
  const op = enunciado.split(' ')[1]
  return op === '+' || op === '-' ? 10 : 15
}

test.describe('Practica Mates', () => {
  test('el input recupera el foco automáticamente tras fallar una respuesta', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /Peque/ }).click()

    const enunciado = page.locator('.enunciado')
    const input = page.locator('input[type="number"]')
    const textoAnterior = await enunciado.innerText()

    await input.fill('999999')
    await page.getByRole('button', { name: 'Comprobar' }).click()

    await expect(page.locator('.feedback.incorrecto')).toBeVisible()
    await expect(enunciado).not.toHaveText(textoAnterior, { timeout: 3000 })
    await expect(input).toBeFocused()
  })

  test('flujo completo: acertar, finalizar y ver el resumen', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /Mayor/ }).click()

    const enunciado = await page.locator('.enunciado').innerText()
    const input = page.locator('input[type="number"]')

    await input.fill(String(respuestaCorrecta(enunciado)))
    await page.getByRole('button', { name: 'Comprobar' }).click()
    await expect(page.locator('.feedback.correcto')).toBeVisible()

    await page.getByRole('button', { name: 'Finalizar' }).click()

    await expect(page.locator('.resumen')).toBeVisible()
    await expect(page.locator('.puntos-totales')).toHaveText(`${puntosEsperados(enunciado)} puntos`)
    await expect(page.locator('.detalle')).toHaveText('Aciertos: 1 · Fallos: 0')
  })

  test('las preguntas de tipo problema usan el banco curado y valen 20 puntos', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /Mayor/ }).click()

    const enunciado = page.locator('.enunciado')
    const input = page.locator('input[type="number"]')

    let esProblema = false
    for (let intento = 0; intento < 30 && !esProblema; intento++) {
      const texto = await enunciado.innerText()
      esProblema = respuestasProblemas.has(texto)
      if (esProblema) {
        await expect(enunciado).toHaveClass(/enunciado-problema/)
        break
      }

      await input.fill(String(respuestaCorrecta(texto)))
      await page.getByRole('button', { name: 'Comprobar' }).click()
      await expect(page.locator('.feedback.correcto')).toBeVisible()
      await expect(enunciado).not.toHaveText(texto, { timeout: 3000 })
    }

    expect(esProblema).toBe(true)
  })
})
