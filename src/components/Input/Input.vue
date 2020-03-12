<template>
  <input
    v-bind="$attrs"
    :class="$style.container"
    :value="value"
    @input="$emit('input', $event.target.value)"
  >
</template>

<script>
export default {
  name: 'Input',
  props: {
    value: {
      type: [Number, String],
      default: null,
    },
  },
}
</script>

<style lang="scss" module>
.container {
  width: 24rem;
  height: 4.8rem;
  padding: 0 1.8rem;
  color: $medium;
  background-color: $light;
  border-radius: .9rem;
  box-shadow: 5px 5px 5px rgba($dark, .125);
}
</style>
