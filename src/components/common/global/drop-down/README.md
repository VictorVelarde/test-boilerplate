# Dropdown component

The Dropdown component displays content when you click on the trigger. It basically consists of two parts, the trigger and the content.

```html
<DropDown ref="dropdown" :click-outside="false" @toggle="onDropdownToggle" no-trigger height="auto">
  <template v-slot:trigger>
    <div class="selector-trigger">
      <p>Dropdown trigger</p>
      <Icon icon="icon-drop-down.svg" size="16px" fill="#4b505f"></Icon>
    </div>
  </template>

  <template v-slot:content>
    <p>Dropdown content</p>
    <p>Dropdown content</p>
    <p>Dropdown content</p>
    <p>Dropdown content</p>
    <p>Dropdown content</p>
  </template>
</DropDown>
```