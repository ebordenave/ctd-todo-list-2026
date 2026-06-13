import React from 'react'

export default function AboutPage() {
  return (
    <div>
      <article>
        <section>Framework: React</section>
        <section>Router: React Router</section>
        <section>Build: Vite</section>
        <section>
          <h2>App Features</h2>
          <ul>
            <li>
              <strong>Secure Auth:</strong> JWT-based login with protected
              routes to keep data private.
            </li>
            <li>
              <strong>Smart Redirects:</strong> Remembers your intended
              destination if you get bumped to login.
            </li>
            <li>
              <strong>URL Filtering:</strong> Uses search params to handle list
              filtering—so your view stays put on refresh.
            </li>
            <li>
              <strong>Clean Component Logic:</strong> Standardized props and
              centralized state, making the code much easier to maintain.
            </li>
            <li>
              <strong>Error Resilience:</strong> Includes 404 handling and clear
              feedback when API requests fail.
            </li>
          </ul>
        </section>
      </article>
    </div>
  )
}
