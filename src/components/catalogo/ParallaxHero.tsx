'use client'

import { useEffect, useRef } from 'react'

interface Props {
  src: string
  alt?: string
}

export default function ParallaxHero({ src, alt = '' }: Props) {
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    let raf = 0

    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        if (imgRef.current) {
          // La imagen se mueve al 40% de la velocidad del scroll → efecto parallax
          imgRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`
        }
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className='absolute inset-0 overflow-hidden bg-livic-black pointer-events-none'>
      {/* Imagen con parallax — escala ligeramente para no dejar bordes vacíos al desplazar */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className='absolute inset-0 w-full h-[120%] object-cover opacity-40 will-change-transform -top-[10%]'
        style={{ transform: 'translateY(0px)' }}
      />

      {/* Gradientes de profundidad */}
      <div className='absolute inset-0 bg-gradient-to-br from-livic-black via-livic-black/80 to-livic-black/60' />
      <div className='absolute inset-0 bg-gradient-to-t from-livic-black via-transparent to-transparent' />

      {/* Halos decorativos */}
      <div className='absolute top-0 right-0 w-96 h-96 bg-livic-pink/10 rounded-full blur-3xl' />
      <div className='absolute bottom-1/3 left-0 w-72 h-72 bg-livic-purple/10 rounded-full blur-3xl' />
    </div>
  )
}
