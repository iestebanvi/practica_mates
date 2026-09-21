import { PERFILES, MODOS_POR_PERFIL } from '../logic/perfiles.js'

export default function Modo({ perfilId, onSeleccionarModo, onVolver }) {
  const perfil = PERFILES[perfilId]
  const modos = MODOS_POR_PERFIL[perfilId]
  const esPeque = perfilId === 'pequeno'

  return (
    <div className={`pantalla modo${esPeque ? ' peque' : ''}`}>
      <h1>{perfil.nombre}</h1>
      <p>¿Qué quieres practicar?</p>
      <div className="perfiles">
        {Object.values(modos).map((modo) => (
          <button
            key={modo.id}
            className={`perfil modo-${modo.id}`}
            onClick={() => onSeleccionarModo(modo.id)}
          >
            {modo.nombre}
          </button>
        ))}
      </div>
      <button className="finalizar" onClick={onVolver}>
        ← Volver
      </button>
    </div>
  )
}
