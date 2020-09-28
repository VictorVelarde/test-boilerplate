import { checkIE } from '@/utils/checkIE'

export async function loadMarkers (map) {
  const markers = require.context(
    '@/assets/markers',
    false,
    /[a-z]\w+\.(jpg|jpeg|png|webp)$/
  )
  const markersPromises = []
  const addImage = (markerName, image, resolve) => {
    map.addImage(markerName, image)
    resolve()
  }

  markers.keys().forEach(fileName => {
    markersPromises.push(
      new Promise((resolve) => {
        const markersConfig = markers(fileName)
        const markerName = fileName.split('/').pop().replace(/\.\w+$/, '')
        if (!checkIE()) {
          map.loadImage(markersConfig, (error, image) => {
            if (!error) {
              addImage(markerName, image, resolve)
            }
          })
        } else {
          const image = new Image()
          image.src = markers
          image.onload = () => {
            addImage(markerName, image, resolve)
          }
        }
      })
    )
  })

  return Promise.all(markersPromises)
}

export async function loadSprite (map) {
  const addImage = (json, image, resolve) => {
    const canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height
    canvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height)
    json.forEach((item, index) => {
      const data = canvas.getContext('2d').getImageData(item[1].x, item[1].y, item[1].width, item[1].height).data
      map.addImage(item[0], {
        width: item[1].width,
        height: item[1].height,
        data: data
      }, {
        pixelRatio: window.devicePixelRatio
      })
    })
    resolve()
  }

  let devicePixelRatio = 1

  if (window.devicePixelRatio > 2) {
    devicePixelRatio = 3
  } else if (window.devicePixelRatio > 1) {
    devicePixelRatio = 2
  }

  const markers = require(`@/assets/sprite/markers@${devicePixelRatio}x.png`)
  if (markers) {
    const json = Object.entries(require(`@/assets/sprite/markers@${devicePixelRatio}x.json`))
    return new Promise(resolve => {
      if (!checkIE()) {
        map.loadImage(markers, (error, image) => {
          if (!error) {
            addImage(json, image, resolve)
          }
        })
      } else {
        const image = new Image()
        image.src = markers
        image.onload = () => {
          addImage(json, image, resolve)
        }
      }
    })
  }
}
