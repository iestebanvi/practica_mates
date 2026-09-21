import { Router } from 'express'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const problemas = JSON.parse(
  readFileSync(path.join(__dirname, '..', 'data', 'problemas-6primaria.json'), 'utf-8'),
)

const router = Router()

router.get('/', (req, res) => {
  res.json(problemas)
})

export default router
