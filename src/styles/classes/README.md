# CSS documentation

## Margin and padding

To set a container margins or paddings, add the `.margin` or `.padding` class. You can combine the different classes like this `class="margin-vertical-32 padding-horizontal-12"`


### Marging shorthands.

| Shorthand | Description |
|---|---|
| margin | margin |
| margin-top | margin-top |
| margin-right | margin-right |
| margin-bottom | margin-bottom |
| margin-left | margin-left |
| margin-horizontal | margin-left, margin-right |
| margin-vertical | margin-top, margin-bottom |

### Padding shorthands.

| Shorthand | Description |
|---|---|
| padding | padding |
| padding-top | padding-top |
| padding-right | padding-right |
| padding-bottom | padding-bottom |
| padding-left | padding-left |
| padding-horizontal | padding-left, padding-right |
| padding-vertical | padding-top, padding-bottom |

### Margin and padding values.

| Sizes | value |
|---|---|
| 2 | 2px |
| 4 | 4px |
| 6 | 6px |
| 8 | 8px |
| 12 | 12px |
| 16 | 16px |
| 24 | 24px |
| 32 | 32px |

## Flexbox

To set a container to display flex, add the `.flex` class.

```html
<div class="flex">
  <div class="child">child</div>
  <div class="child">child</div>
</div>
```

To set a flexbox container to column direction, use `.flex-column`.

```html
<div class="flex flex-column">
  <div class="child">child</div>
  <div class="child">child</div>
</div>
```

To set a flexbox container to row direction, use `.flex-row`.

```html
<div class="flex flex-row">
  <div class="child">child</div>
  <div class="child">child</div>
</div>
```

To enable wrapping of flexbox containers, use `.flex-wrap`.

```html
<div class="flex flex-wrap">
  <div class="child" style="width: 40%">child</div>
  <div class="child" style="width: 40%">child</div>
  <div class="child" style="width: 40%">child</div>
  <div class="child" style="width: 40%">child</div>
  <div class="child" style="width: 40%">child</div>
</div>
```

To set a flexbox item to automatically fill the available space, use `.flex-auto`.

```html
<div class="flex">
  <div class="child flex-auto">child</div>
  <div class="child">child</div>
</div>
```

To prevent a flexbox item from growing or shrinking, use `.flex-none`.

```html
<div class="flex">
  <div class="child flex-none">child</div>
  <div class="child">child</div>
</div>
```

To control alignment of flexbox items, use `.items-start`, `.items-end`, `.items-center`, `.items-baselin`> or `.items-stretch`.

```html
<div class="flex items-start">
  <h2>child</h2>
  <div class="child">child</div>
</div>

<div class="flex items-end">
  <h2>child</h2>
  <div class="child">child</div>
</div>

<div class="flex items-center">
  <h2>child</h2>
  <div class="child">child</div>
</div>

<div class="flex items-baseline">
  <h2>child</h2>
  <div class="child">child</div>
</div>

<div class="flex items-stretch">
  <h2>child</h2>
  <div class="child big">child</div>
</div>
```

To control the spacing for items on the main axis, use `.justify-start`, `.justify-end`, `.justify-center`, `.justify-between` or `.justify-around`.

```html
<div class="flex justify-start">
  <h2>child</h2>
  <div class="child">child</div>
</div>

<div class="flex justify-end">
  <h2>child</h2>
  <div class="child">child</div>
</div>

<div class="flex justify-center">
  <h2>child</h2>
  <div class="child">child</div>
</div>

<div class="flex justify-between">
  <h2>child</h2>
  <div class="child">child</div>
</div>

<div class="flex justify-around">
  <h2>child</h2>
  <div class="child">child</div>
</div>
```

To align items along the cross-axis, use `.content-start`, `.jcontent-end`, `.content-center`, `.content-between` or `.content-around`.

```html
<div class="flex flex-wrap content-start" style="height: 100px">
  <div class="child" style="width: 50%">child</div>
  <div class="child" style="width: 50%">child</div>
  <div class="child" style="width: 50%">child</div>
  <div class="child" style="width: 50%">child</div>
</div>

<div class="flex flex-wrap content-end" style="height: 100px">
  <div class="child" style="width: 50%">child</div>
  <div class="child" style="width: 50%">child</div>
  <div class="child" style="width: 50%">child</div>
  <div class="child" style="width: 50%">child</div>
</div>

<div class="flex flex-wrap content-center" style="height: 100px">
  <div class="child" style="width: 50%">child</div>
  <div class="child" style="width: 50%">child</div>
  <div class="child" style="width: 50%">child</div>
  <div class="child" style="width: 50%">child</div>
</div>

<div class="flex flex-wrap content-between" style="height: 100px">
  <div class="child" style="width: 50%">child</div>
  <div class="child" style="width: 50%">child</div>
  <div class="child" style="width: 50%">child</div>
  <div class="child" style="width: 50%">child</div>
</div>

<div class="flex flex-wrap content-around" style="height: 100px">
  <div class="child" style="width: 50%">child</div>
  <div class="child" style="width: 50%">child</div>
  <div class="child" style="width: 50%">child</div>
  <div class="child" style="width: 50%">child</div>
</div>
```