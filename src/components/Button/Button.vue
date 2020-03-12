<template>
  <button
    :class="[
      $style.container,
      {
        [$style.isButton]: isButton,
      }
    ]"
    :style="style"
    @click="click"
    @mouseenter="enter"
    @mouseleave="leave"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    color: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isButton: {
      type: Boolean,
      default: false,
    },
    isDarkable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isClicked: false,
      isHovered: false,
      light: '#FFFFFF',
      dark: '#000000',
    }
  },
  computed: {
    style() {
      const isActive = this.isButton || this.isClicked || this.isHovered
      const color = this.isDarkable ? this.dark : this.light
      return {
        color: isActive ? color : null,
        backgroundColor: isActive ? this.color : null,
      }
    },
  },
  watch: {
    isActive(value) {
      if (!value) this.isClicked = false
    },
  },
  methods: {
    click() {
      this.isClicked = !this.isClicked
      this.$emit('click', this.isClicked)
    },
    enter() {
      this.isHovered = true
      this.$emit('enter')
    },
    leave() {
      this.isHovered = false
      this.$emit('leave')
    },
  },
}
</script>

<style lang="scss" module>
.container {
  min-width: 3.6rem;
  height: 3.6rem;
  padding: 1.8rem;
  color: $medium;
  font-size: 1.2rem;
  background-color: $light;
  border-radius: 1.8rem;
  box-shadow: 5px 5px 5px rgba($dark, .125);
  cursor: pointer;
  transition-timing-function: ease-in-out;
  transition-duration: .25s;
  transition-property: color, background-color;
  @include centralizer(inline-flex);

  &.isButton {
    padding: 0;

    &::after {
      opacity: 0;
      content: " . ";
      pointer-events: none;
    }
  }
}
</style>
