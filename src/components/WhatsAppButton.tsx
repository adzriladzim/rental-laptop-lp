'use client'

import { ReactNode } from 'react'

interface WhatsAppButtonProps {
  phone: string
  message: string
  children: ReactNode
  className?: string
}

export function WhatsAppButton({ phone, message, children, className = '' }: WhatsAppButtonProps) {
  const handleClick = () => {
    const cleanPhone = phone.replace(/[^\d]/g, '')
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <button
      onClick={handleClick}
      className={`transition-colors ${className}`}
      type="button"
    >
      {children}
    </button>
  )
}