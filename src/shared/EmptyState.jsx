import React from 'react'
import { CARD_SCHEME, EMPTY_STATE_SCHEME } from '../utils/theme-config'

export default function EmptyState({ icon, title, message }) {
  return (
    <div className={EMPTY_STATE_SCHEME.container}>
      {icon}
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  )
}
