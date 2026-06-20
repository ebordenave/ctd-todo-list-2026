import React from 'react'
// import { Loader2 } from 'lucide-react'

export default function GradientSpinner() {
  return (
    <div className="flex items-center justify-center p-4">
      {/* 🔮 The wrapper div creates the colorful gradient background */}
      <div
        className="animate-spin bg-gradient-to-br from-[oklch(45%_0.24_264)] to-[oklch(65%_0.20_300)]"
        style={{
          width: '64px',
          height: '64px',
          mask: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21 12a9 9 0 1 1-6.219-8.56'/></svg>\") no-repeat center",
          WebkitMask:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21 12a9 9 0 1 1-6.219-8.56'/></svg>\") no-repeat center",
        }}
      />
    </div>
  )
}
