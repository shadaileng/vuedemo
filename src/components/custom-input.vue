<template>
  <div>
    <input :value="value" @input="$emit('input', $event.target.value)">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'custom',
  props: ['value'],
  data: function () {
    return {
      count: 0
    }
  }
}
</script>
