# Map component

## Mapbox integration

For load the resources there are two methods **loadMarkers** and **loadSprite**.

### loadMarkers

Load dynamically the markers with ext **jpg|jpeg|png|webp** from marker folder in assets.

### loadSprite

Load the sprite file from sprite folder in assets.

* markers@1x.json
* markers@1x.png
* markers@2x.json
* markers@2x.png
* markers@3x.png
* markers@3x.json

By default the boilerplate load the markers.

```js
import { loadMarkers, loadSprite } from './utils'

this.map.on('load', async () => {
  /* Load markers or sprite */
  await loadMarkers(map)
  // or
  await loadSprite(map)
  ...
})
```
