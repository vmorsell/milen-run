const parseDateTime = (dateTime: string): Date => {
  const [year, month, date, hours, minutes] = dateTime
    .split(/\D/)
    .map((v) => parseInt(v))
  return new Date(year, month - 1, date, hours, minutes)
}

export interface FormatDateProps {
  dateTime: string
  locale?: string
  options?: object
}

export const formatDate = ({
  dateTime,
  locale = 'en-GB',
  options,
}: FormatDateProps): string => {
  const opts = {
    timeZone:'Europe/Stockholm',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute:'numeric',
    ...options,
  }
  const d = parseDateTime(dateTime)
  return Intl.DateTimeFormat(locale, opts).format(d)
}

export interface TimeToProps {
  dateTime: string
}

export const timeTo = ({ dateTime }: TimeToProps): string => {
  const d = parseDateTime(dateTime)

  const now = Date.now()
  const diff = d.getTime() - now

  const ending = diff > 0 ? '' : ' ago'

  const weeks = diff / (1000 * 60 * 60 * 24 * 7)
  if (weeks > 4.3) {
    const rounded = Math.round(weeks / 4.3)
    const unit = rounded > 1 ? 'months' : 'month'
    return `${rounded} ${unit}${ending}`
  }

  if (Math.abs(weeks) > 1) {
    const rounded = Math.round(weeks)
    const unit = rounded > 1 ? 'weeks' : 'week'
    return `${rounded} ${unit}${ending}`
  }

  const days = weeks * 7
  if (Math.abs(days) > 1) {
    const rounded = Math.round(days)
    const unit = rounded > 1 ? 'days' : 'day'
    return `${rounded} ${unit}${ending}`
  }

  const hours = Math.ceil(days * 24)
  const unit = hours > 1 ? 'hours' : 'hour'
  return `${hours} ${unit}${ending}`
}
