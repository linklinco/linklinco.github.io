### VUE.js

vue的单文件组件 `*.vue` 会把一个组件的逻辑，模板和样式都封装在同一个文件中。

```html
<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <button @click="count++">Count is: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```



