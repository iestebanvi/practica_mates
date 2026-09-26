import { Router } from 'express'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const vocabulario = JSON.parse(
  readFileSync(path.join(__dirname, '..', 'data', 'vocabulario-ingles-6primaria.json'), 'utf-8'),
)

const router = Router()

router.get('/', (req, res) => {
  res.json(vocabulario)
})

export default router
