export const HEADER_SCHEME = {
  wrapper: 'flex flex-col',
  row: 'flex flex-row justify-between items-center',
  logoContainer: 'flex items-center gap-2',
  logoIcon: 'text-[var(--accent-color)]',
  logoText: 'text-xl font-bold text-zinc-800 p-4',
  logoHighlight: 'text-[var(--accent-color)]',
  actionContainer: 'flex items-center gap-3',
  authGroup: 'flex items-center gap-2',
  userIcon: 'text-zinc-400',
}

export const CARD_SCHEME = {
  container: `flex flex-row justify-between gap-4 border border-zinc-100 rounded-xl p-4 bg-white shadow-sm dark:bg-gray-700 `,
}

export const BUTTON_SCHEME = {
  button: `self-end mt-4 px-4 py-3 bg-[var(--accent-color)] text-white font-medium rounded-xl hover:bg-[var(--accent-hover)] transition-colors shadow-sm`,

  primary: `py-2.5 bg-[var(--accent-color)] text-white font-medium rounded-xl hover:bg-[var(--accent-hover)] transition-colors text-center px-4`,

  secondary: `py-2.5 border border-zinc-200 text-zinc-600 rounded-xl hover:bg-zinc-50 transition-colors text-center px-4`,

  taskMenu: `text-zinc-400 hover:text-zinc-600 text-4xl`,
}

export const NAV_SCHEME = {
  navbar: `flex flex-row gap-4 bg-white border-t border-b border-zinc-200 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] -mx-8 px-8 mb-4 `,

  baseLink: `py-2 text-sm transition-colors inline-flex items-center gap-2`,
  active: `font-bold text-[var(--accent-color)] border-b-2 border-[var(--accent-color)]`,
  inactive: `font-normal text-zinc-500 hover:text-[var(--accent-color)]`,
}

export const CONTROL_BAR_SCHEME = {
  container: `grid grid-cols-[max-content_1fr] items-center gap-x-4 gap-y-3 w-full mb-4`,

  input: `w-full h-10 px-4 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] bg-white text-sm transition-all`,

  selectBase: `h-10 px-3 border border-zinc-200 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] cursor-pointer transition-all`,

  widthFull: `w-full`,
  widthHalf: `w-1/2`,
  widthQuarter: `w-1/4`,
}

export const PAGE_SCHEME = {
  wrapper: `p-6 max-w-2xl mx-auto`,
  badge: `bg-zinc-100 text-zinc-800 text-xs font-medium px-2.5 py-1 rounded-md border border-zinc-200`,
  listItem: `flex flex-col gap-1 mb-4`,
}

export const MODAL_SCHEME = {
  dialog: `fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl p-6 shadow-xl backdrop:bg-zinc-900/50 w-full max-w-sm`,
  input: `w-full p-3 border border-zinc-200 rounded-xl focus:outline-none focus:border-blue-500`,
}

export const PROFILE_SCHEME = {
  wrapper: `p-6 max-w-2xl mx-auto`,

  infoCard: `bg-zinc-50 border border-zinc-200 rounded-xl p-4 mb-6`,

  statsGrid: `grid grid-cols-2 sm:grid-cols-3 gap-4`,

  statBox: `bg-white border border-zinc-100 shadow-sm rounded-xl p-4 flex flex-col gap-1`,
}

export const NOT_FOUND_SCHEME = {
  wrapper: `flex flex-col items-center p-6 max-w-2xl mx-auto`,
  title: `text-7xl text-center text-[var(--accent-hover)]`,
  subtitle: `font-bold text-zinc-500 text-xl text-center`,
  description: `font-semibold  text-center text-zinc-500`,
}
