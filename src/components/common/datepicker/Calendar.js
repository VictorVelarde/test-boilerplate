
const DayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const MonthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const StartOfWeek = {
  'ar-BH': 6,
  'ar-DZ': 6,
  'ar-JO': 6,
  'ar-KW': 6,
  'ar-LB': 6,
  'ar-LY': 6,
  'ar-MA': 6,
  'ar-OM': 6,
  'ar-QA': 6,
  'ar-SA': 6,
  'ar-SD': 6,
  'ar-SY': 6,
  'ar-TN': 6,
  'ar-AE': 6,
  'ar-YE': 6,
  'ca-ES': 1,
  ca: 1,
  'cs-CZ': 1,
  cs: 1,
  da_DK: 1,
  da: 1,
  'de-AT': 1,
  'de-DE': 1,
  'de-LU': 1,
  'de-CH': 1,
  de: 1,
  'el-GR': 1,
  el: 1,
  en_GB: 1,
  'en-IE': 1,
  'es-AR': 1,
  'es-BO': 1,
  'es-CL': 1,
  'es-CO': 1,
  'es-CR': 1,
  'es-DO': 1,
  'es-EC': 1,
  'es-SV': 1,
  'es-GT': 1,
  'es-HN': 1,
  'es-MX': 1,
  'es-NI': 1,
  'es-PA': 1,
  'es-PY': 1,
  'es-PE': 1,
  'es-PR': 1,
  'es-ES': 1,
  'es-UY': 1,
  'es-VE': 1,
  'et-EE': 1,
  et: 1,
  'fi-FI': 1,
  fi: 1,
  'fr-BE': 1,
  'fr-KM': 1,
  'fr-FR': 1,
  'fr-GN': 1,
  'fr-LU': 1,
  'fr-MC': 1,
  'fr-CH': 1,
  fr: 1,
  'hr-HR': 1,
  hr: 1,
  'hu-HU': 1,
  hu: 1,
  'id-ID': 1,
  'is-IS': 1,
  is: 1,
  'it-IT': 1,
  'it-CH': 1,
  it: 1,
  'lt-LT': 1,
  lt: 1,
  'nl-BE': 1,
  'nl-NL': 1,
  nl: 1,
  'nb-NO': 1,
  nb: 1,
  'nn-NO': 1,
  nn: 1,
  'pl-PL': 1,
  pl: 1,
  'pt-MZ': 1,
  'pt-PT': 1,
  pt: 1,
  'ro-MD': 1,
  'ro-RO': 1,
  ro: 1,
  'sq-AL': 6,
  'ru-MD': 1,
  'ru-RU': 1,
  'ru-UA': 1,
  ru: 1,
  'sk-SK': 1,
  sk: 1,
  'sl-SI': 1,
  sl: 1,
  'sr-Cyrl': 1,
  'sr-Cyrl-BA': 1,
  'sr-Cyrl-ME': 1,
  'sr-Cyrl-RS': 1,
  'sr-Latn': 1,
  'sr-Latn-BA': 1,
  'sr-Latn-ME': 1,
  'sr-Latn-RS': 1,
  sr: 1,
  'sr-BA': 1,
  'sr-ME': 1,
  'sr-RS': 1,
  'sv-FI': 1,
  'sv-SE': 1,
  sv: 1,
  'tr-TR': 1,
  tr: 1,
  'uk-UA': 1,
  uk: 1
}

export default class Calendar {
  constructor ({ selectedDate, locale } = {}) {
    this.currentDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDate()
    }
    this.today = new Date(this.currentDate.year, this.currentDate.month, this.currentDate.day)
    this.year = undefined
    this.month = undefined
    this.day = undefined
    this.dayNames = undefined
    this.monthNames = undefined
    this.startOfWeek = undefined
    this.selectedDate = undefined
    this.startSelectedDate = undefined
    this.endSelectedDate = undefined
    this.locale = locale || (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage

    this.setDate(selectedDate)
  }

  /**
   * @public
   * @param {Date} date
   */
  setDate (date) {
    this.localize()

    if (Array.isArray(date)) {
      this.startSelectedDate = new Date(date[0])
      this.endSelectedDate = new Date(date[1])
      this.reset(this.endSelectedDate)
    } else {
      this.selectedDate = date ? new Date(date) : new Date()
      this.reset(this.selectedDate)
    }
  }

  /**
   * @public
   * @param {Date} date
   */
  reset (date) {
    this.year = date ? date.getFullYear() : this.currentDate.year
    this.month = date ? date.getMonth() : this.currentDate.month
    this.day = date ? date.getDate() : this.currentDate.day
  }

  /**
   * @public
   * @param {Date} date
   */
  localize (date = new Date()) {
    date.setDate(date.getDate() - date.getDay())

    this.dayNames = DayNames.map((day, i) => this.getDayNames(i))
    this.monthNames = MonthNames.map((month, i) => this.getMonthNames(i))
    this.startOfWeek = StartOfWeek[this.locale] || 0
  }

  /**
   * @public
   * @param {String} day name format
   */
  getDayNames (index, format = 'short') {
    const date = new Date()
    date.setDate(date.getDate() - date.getDay() + index)
    return date.toLocaleDateString(this.locale, { weekday: format }).split('.')[0]
  }

  /**
   * @public
   * @param {String} month name format
   */
  getMonthNames (index, format = 'long') {
    const date = new Date()
    date.setMonth(index)
    return date.toLocaleDateString(this.locale, { month: format })
  }

  /**
   * @public
   * @param {Date} date
   */
  parseDate (date, options = {}) {
    const defaultOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }

    return date.toLocaleDateString(this.locale, { ...defaultOptions, options })
  }

  /**
   * @public
   * @param {Date} date
   */
  dateToISO (date) {
    return date.toISOString()
  }

  /**
   * @public
   */
  setMonth (m) {
    this.month = m - 1
  }

  /**
   * @public
   */
  prevYear () {
    this.year--
  }

  /**
   * @public
   */
  nextYear () {
    this.year++
  }

  /**
   * @public
   */
  prevMonth () {
    if (--this.month < 0) {
      this.month += 12
      this.year--
    }
  }

  /**
   * @public
   */
  nextMonth () {
    if (++this.month >= 12) {
      this.month -= 12
      this.year++
    }
  }
}
