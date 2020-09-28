# Icon component

The Icon component takes an SVG path element as its child, and allows the icon to be styled.

```html
<Icon icon="icon-drop-down.svg" size="16px" fill="#ffffff"></Icon>
```

Also, you can set a different size for `width` and `height` by passing it an Array of strings:

```html
<Icon icon="icon-drop-down.svg" :size="['10px', '20px']" fill="#ffffff"></Icon>
```