# Date picker

A Date picker component provides an easy way to select a single date or a range of dates.

```html
<DatePicker
  selected-date=""
  date-format="DD/MM/YYYY"
  month-format="MMMM"
  day-format="ddd"
  locale="en-US"
  :range="true"
  :future-selection="true"
  @dateChanged="onDatepickerChange">
</DatePicker>
```