import Api from './api'

export default {
  async getData () {
    const res = await Api.get('/data')
    return res.data
  }
}
