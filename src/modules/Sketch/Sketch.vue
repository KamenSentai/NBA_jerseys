<template>
  <div :class="$style.container" />
</template>

<script>
import P5 from 'p5'
import MockupFrontBody from '@/assets/MockupFrontBody.png'
import MockupFrontHandle from '@/assets/MockupFrontHandle.png'

export default {
  name: 'Sketch',
  data() {
    return {
      mockup: {
        back: {
          body: null,
          handle: null,
        },
        front: {
          body: null,
          handle: null,
        },
      },
      sketch: null,
      windowSize: {
        width: 0,
        height: 0,
      },
    }
  },
  mounted() {
    // eslint-disable-next-line no-new
    new P5((sketch) => {
      this.sketch = sketch

      sketch.preload = () => {
        this.mockup.front.body = sketch.loadImage(MockupFrontBody)
        this.mockup.front.handle = sketch.loadImage(MockupFrontHandle)
      }

      sketch.setup = () => {
        this.updateSize()
        sketch.createCanvas(this.windowSize.width, this.windowSize.height)
        this.drawMockup()
      }

      sketch.windowResized = () => {
        this.updateSize()
        sketch.resizeCanvas(this.windowSize.width, this.windowSize.height)
        this.drawMockup()
      }
    }, this.$el)
  },
  methods: {
    drawMockup() {
      const { mockup, sketch } = this
      sketch.image(mockup.front.body, 0, 0, sketch.width, sketch.height)
      sketch.image(mockup.front.handle, 0, 0, sketch.width, sketch.height)
    },
    updateSize() {
      const { clientWidth: width, clientHeight: height } = this.$el
      this.windowSize = { width, height }
    },
  },
}
</script>

<style lang="scss" module>
.container::after {
  position: absolute;
  top: calc(100% + 2rem);
  right: 0;
  left: 0;
  height: 4rem;
  background: radial-gradient(rgba($neutral, .125), rgba($neutral, 0) 75%);
  border-radius: 100%;
  content: "";
}
</style>
