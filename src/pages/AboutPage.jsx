import Header from '../shared/Header'
import { PAGE_SCHEME } from '../utils/theme-config'

function AboutPage() {
  return (
    <div>
      <Header />

      <div className={PAGE_SCHEME.wrapper}>
        <h1 className="text-2xl font-bold text-zinc-800 mb-6">About the App</h1>

        <div className="flex flex-wrap gap-2 mb-8">
          <span className={PAGE_SCHEME.badge}>React</span>
          <span className={PAGE_SCHEME.badge}>React Router</span>
          <span className={PAGE_SCHEME.badge}>Vite</span>
        </div>

        <h2 className="text-lg font-semibold text-zinc-800 mb-4">
          Key Features
        </h2>

        <ul className="space-y-4">
          <li className={PAGE_SCHEME.listItem}>
            <span className="font-semibold text-zinc-800">Secure Auth</span>
            <span className="text-sm text-zinc-600">
              JWT-based login with protected routes to keep data private.
            </span>
          </li>

          <li className={PAGE_SCHEME.listItem}>
            <span className="font-semibold text-zinc-800">Smart Redirects</span>
            <span className="text-sm text-zinc-600">
              Remembers your intended destination if you get bumped to login.
            </span>
          </li>

          <li className={PAGE_SCHEME.listItem}>
            <span className="font-semibold text-zinc-800">URL Filtering</span>
            <span className="text-sm text-zinc-600">
              Uses search params to handle list filtering, so your view stays
              put on refresh.
            </span>
          </li>

          <li className={PAGE_SCHEME.listItem}>
            <span className="font-semibold text-zinc-800">
              Clean Component Logic
            </span>
            <span className="text-sm text-zinc-600">
              Standardized props and centralized state, making the code much
              easier to maintain.
            </span>
          </li>

          <li className={PAGE_SCHEME.listItem}>
            <span className="font-semibold text-zinc-800">
              Error Resilience
            </span>
            <span className="text-sm text-zinc-600">
              Includes 404 handling and clear feedback when API requests fail.
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AboutPage
