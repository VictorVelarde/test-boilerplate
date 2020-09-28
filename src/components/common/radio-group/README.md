# Radio group component

RadioGroup is a helpful wrapper used to group Radio components that provides an easier API.

```html
<RadioGroup
  :vertical="true"
  name="radios"
  :options="radioOptions"
  :value="radioState"
  @change="onRadioChange">
</RadioGroup>
```

```js
radioState: 'a',
radioOptions: [
  {
    label: 'Label A',
    value: 'a'
  },
  {
    label: 'Label b',
    value: 'b'
  },
  {
    label: 'Label C.',
    value: 'c'
  },
  {
    label: 'Label D',
    value: 'd'
  }
]
```
