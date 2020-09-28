# WWW Boilerplate

* [Project setup](#project-setup)
* [Docs](#docs)
* [Project Structure](#project-structure)
* [Vue file structure](#vue-file-structure)
* [Miscellaneous](#miscellaneous)

## Project setup

### Install dependencies
```
npm install
```

### Compiles and hot-reloads for development
```
npm start
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Docs

### Customize Vue configuration
To customize vue cli configuration, modify the file `vue.config`. 

See [configuration reference](https://cli.vuejs.org/config/) for more information.

### Components
See [components reference](./src/components/README.md) for more information.

### CSS docs

See CSS documentation [here](./src/styles/classes/README.md).

## Project structure
```sh
.
├── plop
├── public
├── scripts
├── src
├── .browserslistrc
├── .dockerignore
├── .editorconfig
├── .env
├── .env.dev
├── .env.prod
├── .eslintrc.js
├── .gitignore
├── Dockerfile
├── README.md
├── babel.config.js
├── jsconfig.json
├── package-lock.json
├── package.json
└── vue.config.js
```

The main structure of the project is divided into several parts:

### plop

Tool to create new elements in the project. Currently:

* Component
* View
* Store
* Service
* Layer
* Mixin

### public

Public folder, this folder is excluded from all webpack loaders except `html-loaded` to `index.html` and it is copy into root `build` path. 

#### No pwa

Currently there are files for pwa (**img/icons** and **robots**), they should remove them if pwa is not used.

### scripts
Scripting tools to run by node.

#### update-boilerplate

Script to update the current project with the specific (lasted by default) version of boilerplate. 
To execute it 
```sh
npm run update:boilerplate
```

### src

Folder with the app code.

```sh
src
├── app-shell
├── assets
├── components
├── directives
├── filters
├── layers
├── mixins
├── mocked
├── services
├── store
├── styles
├── utils
├── views
├── main.js
├── registerServiceWorker.js
└── router.js
```

#### app-shell: 
Main component, all the app is encapsulated in it.

#### assets
All icons must be in `assets/icons`

#### components

Folder with all components shared.

* common
* map-component

#### directives
Currently:

* click-outside
* portal

#### filters
***Deprecated**: This feature is deprecated, in new versions it will be replaced*

Currently: 

* numberFormat
* round

#### layers
All generic layers and abstract classes. 

Currently:

* layer (mapbox abstract layer)

Every layer has an id defined in `constant`.

The new layer structure allows defining a specific layer for each case. **Avoid using a configuration json and layers generics.**

#### mixins

Currently:

* style: Style allows write scss variables in templates

#### mocked
Api for mock data.

#### services

Folder with all api calls, authService, cache and layerService.

Currently there are two auth:

* Oauth with Carto (default)
* Login JWT

Para cambiarlos, modificar el export en el fichero `src/services/authService/index.js`.

#### store
Modules de vuex and root if necessary.

#### styles

Folder with global styles, theme, variables, mixins, etc.

#### utils

* checkIE: Return if the browser is IE10, IE11 or Edge12.
* copyClipboard: Compatibility with IE11 and Safari.
* debounce.
* disableVueObserver: Disable reactivity of Vue for a data variable.
* matchString: Return if the value match in a string or in an array of string. Available a callback for complex array.
* vuex: Vuex utils out of box to use without Vue instance.

#### views

Every view can have its own components or sub-views or layers with this structure recursively (components and layers only must be in first level):

```sh
views
├── view
│   ├── components
│   ├── layers
│   ├── views
│   ├── View.vue
│   ├── view.html
│   └── view.scss

```

#### main

Instance main where Vue is instanced. In this file there are several logic functions:

* Error functions: catch the error of Vue or window.
* Register global components: global components in `components/common/global`.
* Airship ignore element: all components started with `as-` are ignored by Vue.
* Login: to set the login preferences in every instance before the Vue instance is created.
* registerServiceWorker: by default is disabled. See [public no pwa](#no-pwa).

#### router

All app routes.

### env
You can specify env variables by placing the following files in your project root:

```sh
.env                # loaded in all cases
.env.local          # loaded in all cases, ignored by git
.env.[mode]         # only loaded in specified mode
.env.[mode].local   # only loaded in specified mode, ignored by git
```
The order is very important, the specific mode has the highest priority.

## Vue file structure

Vue SFC files must have the next structure:

```js
/* template import */
<template src="./template.html"></template>
/* style import */
<style scoped lang="scss" src="./template.scss"></style>
<script>
export default {
    ...
}
</script>
```

Script part must have the next order for it property.

* name
* mixins
* router life cycle
* directives
* filters
* components
* provide
* inject
* props
* data
* computed
* life cycle
* methods
* render

## Miscellaneous

### Mapbox Sprite zero

The markers should be in te correct folder before execute the docker. `src/assets/markers`. The result will be save into `src/assets/sprite`.

```sh
docker run -it --rm --name icons-generator -v $PWD:/usr/src/app geographica/spritezero-cli
```
