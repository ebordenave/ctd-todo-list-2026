export function getUserInitials(name) {
  if (!name || !name) return '??'
  const nameArray = name.split(' ')

  let initials = ''

  nameArray.forEach((word) => {
    initials += word.charAt(0).toUpperCase()
  })

  return initials
}
