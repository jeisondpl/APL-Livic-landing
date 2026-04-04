'use client'

/**
 * AnimatedBackground — burbujas tornasol animadas en el fondo de la página.
 * Posición: fixed, z-index: -1. Visibles detrás de todo el contenido.
 */

export default function AnimatedBackground() {
  return (
    <div
      aria-hidden='true'
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Burbuja 1 — rosa/morado, arriba-izquierda */}
      <div
        className='bubble bubble-1'
        style={{
          width: 600,
          height: 600,
          top: '-15%',
          left: '-10%',
          background: 'radial-gradient(circle at 40% 40%, #E288AE, #AD80B4)',
          opacity: 0.35,
          filter: 'blur(90px)',
        }}
      />

      {/* Burbuja 2 — amarillo/verde, arriba-derecha */}
      <div
        className='bubble bubble-2'
        style={{
          width: 500,
          height: 500,
          top: '-10%',
          right: '-8%',
          background: 'radial-gradient(circle at 60% 30%, #FBCA00, #6AB895)',
          opacity: 0.28,
          filter: 'blur(100px)',
        }}
      />

      {/* Burbuja 3 — verde/rosa, centro */}
      <div
        className='bubble bubble-3'
        style={{
          width: 450,
          height: 450,
          top: '40%',
          left: '35%',
          background: 'radial-gradient(circle at 50% 50%, #6AB895, #E288AE)',
          opacity: 0.22,
          filter: 'blur(110px)',
        }}
      />

      {/* Burbuja 4 — morado/amarillo, abajo-izquierda */}
      <div
        className='bubble bubble-4'
        style={{
          width: 400,
          height: 400,
          bottom: '-10%',
          left: '10%',
          background: 'radial-gradient(circle at 30% 70%, #AD80B4, #FBCA00)',
          opacity: 0.25,
          filter: 'blur(95px)',
        }}
      />

      {/* Burbuja 5 — rosa/verde, centro-derecha (pequeña) */}
      <div
        className='bubble bubble-5'
        style={{
          width: 200,
          height: 200,
          top: '55%',
          right: '12%',
          background: 'radial-gradient(circle at 50% 40%, #E288AE, #6AB895)',
          opacity: 0.30,
          filter: 'blur(60px)',
        }}
      />

      {/* Burbuja 6 — amarillo/morado, centro-izquierda (pequeña) */}
      <div
        className='bubble bubble-6'
        style={{
          width: 160,
          height: 160,
          top: '30%',
          left: '20%',
          background: 'radial-gradient(circle at 60% 60%, #FBCA00, #AD80B4)',
          opacity: 0.28,
          filter: 'blur(55px)',
        }}
      />
    </div>
  )
}
