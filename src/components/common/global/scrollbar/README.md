# Scrollbar component

The native browser's scrollbar customized with some magic tricks.

```html
<Scrollbar :horizontal-scroll="false" :vertical-scroll="true" @onScroll="onScroll" ref="scrollbar">
  <div class="scroll-content">
    ...
  </div>
</Scrollbar>
```

## Custom events

### `@onScroll`

The `onScroll` event is fired when the component scrolling and return the scroll offset of the content.

## Public methods

### `update()`

The `update` method recalculates the content size and sets the new sizes for the scrollbar.

```js
this.$refs.scrollbar.update()
```

### `scrollTo()`

The `scrollTo` scrolls to a particular set of coordinates.

```js
this.$refs.scrollbar.scrollTo(0, 0)
```

## TODOs

- [x] Auto horizontal scroll
- [] Avoid overlapping scroll thumbnails
- [] Clickable scrollbars