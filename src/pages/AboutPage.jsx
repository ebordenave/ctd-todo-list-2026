import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import useAuth from '../contexts/AuthContext'

import React from 'react'

export default function AboutPage() {
  return (
    <div>
      <article>
        <section>Framework: React</section>
        <section>Router: React Router</section>
        <section>Build: Vite</section>
      </article>
    </div>
  )
}
