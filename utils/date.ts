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
  options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'Europe/Stockholm',
  },
}: FormatDateProps): string => {
  const d = parseDateTime(dateTime)
  return Intl.DateTimeFormat(locale, options).format(d)
}

export interface TimeToProps {
  dateTime: string
}

export const timeTo = ({ dateTime }: TimeToProps): string => {
  const d = parseDateTime(dateTime)

  const now = Date.now()
  const diff = d.getTime() - now

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
