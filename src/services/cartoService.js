/**
 *  Carto service file
**/
import Api from './api'
import authService from './authService/authService'

export default {
  async getMapsApi (sql, options = {}) {
    const carto = getCartoCredentials()
    const replaceObj = {
      '{username}': carto.username,
      '{api_key}': carto.apiKey
    }

    const cluster = {
      aggregation: {
        placement: 'centroid',
        resolution: 32,
        threshold: 2
      }
    }
    const body = {
      version: '1.3.0',
      layers: [
        {
          options: {
            cartocss_version: '2.1.1',
            cartocss: '{}',
            sql,
            ...(options.isCluster && { ...cluster }),
            ...options
          }
        }
      ]
    }

    const regex = new RegExp(Object.keys(replaceObj).join('|'), 'gi')
    const url = process.env.VUE_APP_CARTO_MAPS_API_URL.replace(regex, matched => replaceObj[matched])
    const response = await Api.post(url, body)

    return response.data
  },
  async getSQLApi (sql) {
    const carto = getCartoCredentials()
    const replaceObj = {
      '{username}': carto.username,
      '{api_key}': carto.apiKey,
      '{sql}': encodeURIComponent(sql)
    }

    const regex = new RegExp(Object.keys(replaceObj).join('|'), 'gi')
    const url = process.env.VUE_APP_CARTO_SQL_API_URL.replace(regex, matched => replaceObj[matched])
    const response = await Api.get(url)

    return response.data
  }
}

function getCartoCredentials () {
  const auth = authService.getAuth()
  return auth.carto || {
    username: process.env.VUE_APP_CARTO_USER,
    apiKey: process.env.process.env.VUE_APP_CARTO_API_KEY
  }
}
