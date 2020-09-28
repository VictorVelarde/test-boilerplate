import sample from '@/assets/mocks/sample.json'
import products from '@/assets/mocks/products.json'

const MAX_DELAY = 2000
const fakeData = {
  sample,
  products
}

/*
 * Fake Api
 */
export default {
  /**
   * Retrieve data as if it were an existing API
   * @param {string} fake Key of the property what you want to access
   */
  getData (fake) {
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve(fakeData[fake])
      }, Math.random() * MAX_DELAY)
    })

    return promise
  }
}
