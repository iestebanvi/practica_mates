function mensajeMotivador(puntos) {
  if (puntos === 0) return 'Sigue practicando, ¡tú puedes! 💪'
  if (puntos < 50) return '¡Buen intento! 👍'
  if (puntos < 100) return '¡Muy bien! 🌟'
  return '¡Increíble! 🏆'
}

export default function Resumen({ resumen, onVolver }) {
  const { puntos, aciertos, fallos } = resumen

  return (
    <div className="pantalla resumen">
      <h1>Resumen de la sesión</h1>
      <p className="puntos-totales">{puntos} puntos</p>
      <p className="detalle">
        Aciertos: {aciertos} · Fallos: {fallos}
      </p>
      <p className="mensaje">{mensajeMotivador(puntos)}</p>
      <button onClick={onVolver}>Elegir otro perfil</button>
    </div>
  )
}
