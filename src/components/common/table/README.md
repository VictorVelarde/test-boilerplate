# Table component

Table display information in a way that’s easy to scan, so that users can look for patterns and insights.

You can use this component in several ways:

## Simple table

```html
<Table ref="table"
  :items="table"
  :visible-columns="['name', 'age', 'company', 'occupation']"
  :colum-names="['Nombre', 'Edad', 'Empresa', 'cargo']"
  filter
  selectable
  :pagination="true"
  :items-per-page="4"
  pagination-placeholder="items"
  @select="onTableItemClick">
</Table>
```

## Table whith custom colums

The following example shows a Table with some of its columns defined by a "template".

```html
<Table 
  :items="table"
  :visible-columns="['name', 'age', 'company', 'occupation']"
  :colum-names="['Nombre', 'Edad', 'Empresa', 'cargo']"
  filter
  selectable
  :pagination="true"
  :items-per-page="4"
  pagination-placeholder="items"
  @select="onTableItemClick">

  <template v-slot:company="item">
    <div class="company">
      <span>⚙️</span>
      {{item.data.company}} 
    </div>
  </template>

  <template v-slot:occupation="item">
    <div class="occupation">
      <p>👨‍💻</p>
      {{item.data.occupation}} 
    </div>
  </template>
</Table>
```