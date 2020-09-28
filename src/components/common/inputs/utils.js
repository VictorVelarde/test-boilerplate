
export function validate (element, props) {
  if (!element) {
    return false
  }

  if (props.required && !element.value) {
    return 'Campo obligatorio'
  }

  if (element.value && props.pattern && !props.pattern.test(element.value)) {
    return 'Formato inválido'
  }

  if (props.maxLength && element.value.length > props.maxLength) {
    return `Este campo no debe contener mas de ${props.maxLength} caracteres`
  }

  if (props.minLength && element.value.length < props.minLength) {
    return `Este campo debe contener al menos ${props.minLength} caracteres`
  }
}
