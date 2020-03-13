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
  props: {
    isReverse: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      deltas: [
        [0, -1],
        [1, -1],
        [1, 0],
        [1, 1],
        [0, 1],
        [-1, 1],
        [-1, 0],
        [-1, -1],
      ],
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
  computed: {
    ...mapGetters('funnel', ['activeTeam', 'isTurned', 'name', 'number']),
    isInverted() {
      return this.isReverse || this.isTurned
    },
    scaledDeltas() {
      return n => this.deltas.map(delta => delta.map(value => value * n))
    },
  },
  watch: {
    activeTeam() {
      this.drawMockup()
    },
    isTurned() {
      this.draw()
    },
    name() {
      this.draw()
    },
    number() {
      this.draw()
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
        this.draw()
      }

      sketch.windowResized = () => {
        this.updateSize()
        sketch.resizeCanvas(this.windowSize.width, this.windowSize.height)
        this.draw()
      }
    }, this.$el)
  },
  methods: {
    draw() {
      this.drawMockup()
      if (this.number) this.writeNumber()
      if (this.name && this.isInverted) this.writeName()
    },
    drawBorder(x, y, text) {
      const { sketch } = this
      sketch.push()
      sketch.translate(x, y)
      sketch.text(text, 0, 0)
      sketch.pop()
    },
    drawMockup() {
      const {
        activeTeam,
        isInverted,
        mockup,
        sketch,
      } = this
      const mockupSide = !isInverted ? mockup.front : mockup.back
      sketch.clear()
      sketch.push()
      if (activeTeam) sketch.tint(this.activeTeam.colors[0])
      sketch.image(mockupSide.body, 0, 0, sketch.width, sketch.height)
      if (activeTeam) sketch.tint(this.activeTeam.colors[1])
      sketch.image(mockupSide.handle, 0, 0, sketch.width, sketch.height)
      sketch.pop()
    },
    writeName() {
      const {
        activeTeam,
        deltas,
        name,
        sketch,
      } = this
      const dx = sketch.width * 0.53125
      const dy = sketch.height * 0.15625
      const textSize = 30
      const theta = -sketch.PI / 60

      sketch.push()
      sketch.textSize(textSize)
      sketch.translate(dx, dy)
      sketch.rotate(theta)
      sketch.fill('#FFFFFFB0')

      for (let i = 0; i < deltas.length; i++) {
        this.drawBorder(...deltas[i], name)
      }

      sketch.fill(activeTeam.colors[1])
      sketch.text(name, 0, 0)
      sketch.fill('#00000040')
      sketch.text(name, 0, 0)
      sketch.pop()
    },
    writeNumber() {
      const {
        activeTeam,
        isInverted,
        number,
        sketch,
      } = this
      const deltas = this.scaledDeltas(2)
      const dx = !isInverted ? sketch.width * 0.375 : sketch.width * 0.5625
      const dy = !isInverted ? sketch.height * 0.4375 : sketch.height * 0.4375
      const textSize = !isInverted ? 75 : 150
      const theta = !isInverted ? sketch.PI / 60 : -sketch.PI / 60

      sketch.push()
      sketch.textSize(textSize)
      sketch.translate(dx, dy)
      sketch.rotate(theta)
      sketch.fill('#FFFFFFB0')

      for (let i = 0; i < deltas.length; i++) {
        this.drawBorder(...deltas[i], number)
      }

      sketch.fill(activeTeam.colors[1])
      sketch.text(number, 0, 0)
      sketch.fill('#00000040')
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
