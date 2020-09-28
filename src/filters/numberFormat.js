export const numberFormat = (value, { locale = 'en-EN', options } = {}) => {
  if (!value) {
    return 0
  }

  let format = new Intl.NumberFormat(locale, options).format(value)

  // FIXME: temporary patch until es bug is fixed
  if (locale.includes('es') && !format.includes('.') && format.split(',')[0].length === 4) {
    format = format.charAt(0) + '.' + format.slice(1)
  }

  return format
}
