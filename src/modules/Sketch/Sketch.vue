<template>
  <div :class="$style.container" />
</template>

<script>
import { mapGetters } from 'vuex'
import P5 from 'p5'
import MockupBackBody from '@/assets/MockupBackBody.png'
import MockupBackHandle from '@/assets/MockupBackHandle.png'
import MockupFrontBody from '@/assets/MockupFrontBody.png'
import MockupFrontHandle from '@/assets/MockupFrontHandle.png'

export default {
  name: 'Sketch',
  data() {
    return {
      fontPath: 'fonts/College-Bold.woff',
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
  computed: mapGetters('funnel', ['activeTeam', 'number']),
  watch: {
    activeTeam() {
      this.drawMockup()
    },
    number() {
      this.drawMockup()
      this.writeNumber()
    },
  },
  mounted() {
    // eslint-disable-next-line no-new
    new P5((sketch) => {
      this.sketch = sketch

      sketch.preload = () => {
        this.font = sketch.loadFont(this.fontPath)
        this.mockup.back.body = sketch.loadImage(MockupBackBody)
        this.mockup.back.handle = sketch.loadImage(MockupBackHandle)
        this.mockup.front.body = sketch.loadImage(MockupFrontBody)
        this.mockup.front.handle = sketch.loadImage(MockupFrontHandle)
      }

      sketch.setup = () => {
        this.updateSize()
        sketch.createCanvas(this.windowSize.width, this.windowSize.height)
        sketch.textFont(this.font)
        sketch.textAlign(sketch.CENTER, sketch.CENTER)
        this.drawMockup()
      }

      sketch.windowResized = () => {
        this.updateSize()
        sketch.resizeCanvas(this.windowSize.width, this.windowSize.height)
        this.drawMockup()
        this.writeNumber()
      }
    }, this.$el)
  },
  methods: {
    drawMockup() {
      const { activeTeam, mockup, sketch } = this
      sketch.clear()
      sketch.push()
      if (activeTeam) sketch.tint(this.activeTeam.colors[0])
      sketch.image(mockup.front.body, 0, 0, sketch.width, sketch.height)
      if (activeTeam) sketch.tint(this.activeTeam.colors[1])
      sketch.image(mockup.front.handle, 0, 0, sketch.width, sketch.height)
      sketch.pop()
    },
    writeNumber() {
      const { activeTeam, number, sketch } = this
      const drawBorder = (x, y) => {
        sketch.push()
        sketch.translate(x, y)
        sketch.text(number, 0, 0)
        sketch.pop()
      }
      const deltas = [
        [0, -2],
        [2, -2],
        [2, 0],
        [2, 2],
        [0, 2],
        [-2, 2],
        [-2, 0],
        [-2, -2],
      ]

      sketch.push()
      sketch.textSize(60)
      sketch.translate(sketch.width * 0.375, sketch.height * 0.4375)
      sketch.rotate(sketch.PI / 60)
      sketch.fill('#FFFFFF')

      for (let i = 0; i < deltas.length; i++) {
        drawBorder.apply(this, deltas[i])
      }

      sketch.fill(activeTeam.colors[1])
      sketch.text(number, 0, 0)
      sketch.pop()
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
  background: radial-gradient(rgba($dark, .125), rgba($dark, 0) 75%);
  border-radius: 100%;
  content: "";
}
</style>
