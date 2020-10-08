export const rfcToReadable = (rfc: string): string => {
  const date = new Date()
  date.setTime(Date.parse(rfc))
  return date.toDateString()
}

export const rfcTimeTo = (rfc: string): string => {
  const date = Date.parse(rfc)
  const now = Date.now()
  const diff = date - now

  const ago = diff > 0 ? '' : ' ago'

  const weeks = diff / (1000 * 60 * 60 * 24 * 7)
  if (Math.abs(weeks) > 0) {
    const rounded = Math.round(weeks)
    const unit = weeks > 1 ? 'weeks' : 'week'
    return `${rounded} ${unit}${ago}`
  }

  const days = weeks * 7
  if (Math.abs(days) > 0) {
    const rounded = Math.round(days)
    const unit = days > 1 ? 'days' : 'day'
    return `${rounded} ${unit}${ago}`
  }

  const hours = Math.ceil(days * 24)
  const unit = hours > 1 ? 'hours' : 'hour'
  return `${hours} ${unit}${ago}`
}
