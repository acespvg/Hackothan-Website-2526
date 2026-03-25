import React from 'react'
import { redirect } from 'next/navigation'
import RegistrationForm from '@/components/register'

export default function page() {
  // Registration deadline: March 26, 2026 at 3:00 AM
  const REGISTRATION_DEADLINE = new Date(2026, 2, 26, 3, 0, 0);
  
  // Check if registration is closed
  if (new Date() >= REGISTRATION_DEADLINE) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <RegistrationForm />
    </div>
  )
}
