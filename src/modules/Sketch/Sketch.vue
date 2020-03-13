<template>
  <div :class="$style.container" />
</template>

<script>
/* eslint-disable no-bitwise */
import { mapGetters } from 'vuex'
import P5 from 'p5'
import MockupBackBottom from '@/assets/MockupBackBottom.png'
import MockupBackBody from '@/assets/MockupBackBody.png'
import MockupBackHandle from '@/assets/MockupBackHandle.png'
import MockupBackTop from '@/assets/MockupBackTop.png'
import MockupFrontBody from '@/assets/MockupFrontBody.png'
import MockupFrontBottom from '@/assets/MockupFrontBottom.png'
import MockupFrontHandle from '@/assets/MockupFrontHandle.png'
import MockupFrontTop from '@/assets/MockupFrontTop.png'

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
      dotsOpacity: null,
      fontPath: 'fonts/College-Bold.woff',
      mockup: {
        back: {
          body: null,
          bottom: null,
          handle: null,
          top: null,
        },
        front: {
          body: null,
          bottom: null,
          handle: null,
          top: null,
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
    ...mapGetters('funnel', ['activeTeam', 'isTurned', 'name', 'number', 'size']),
    dataCombined() {
      return `${this.activeTeam ? this.activeTeam.slug : ''}${this.number}${this.name}${this.size}`
    },
    dotsSprites() {
      const { mockupSide } = this

      return {
        xs: [],
        s: [mockupSide.bottom],
        m: [mockupSide.bottom, mockupSide.top],
        l: [mockupSide.top],
        xl: [],
      }
    },
    isInverted() {
      return this.isReverse || this.isTurned
    },
    mockupSide() {
      return !this.isInverted ? this.mockup.front : this.mockup.back
    },
    randomRange() {
      const result = []

      for (let i = 0; i < 100; i++) {
        result.push(i)
      }

      result.sort(() => Math.random() - 0.5)

      return result
    },
    scaledDeltas() {
      return n => this.deltas.map(delta => delta.map(value => value * n))
    },
    seed() {
      return (string = '') => {
        let hash = 0

        for (let i = 0; i < string.length; i++) {
          hash = ((hash << 5) - hash) + string.charCodeAt(i)
          hash |= 0
        }

        return hash
      }
    },
    uniqueSeed() {
      return this.seed(this.dataCombined)
    },
  },
  watch: {
    activeTeam() {
      this.draw()
    },
    isTurned() {
      this.draw()
    },
    name() {
      this.draw()
    },
    number(value) {
      this.draw()
      const opacityPer = value ? this.randomRange[value] : 100
      const opacityDec = parseFloat(Math.round(opacityPer / 100 * 255))
      const opacityHex = opacityDec.toString(16)
      this.dotsOpacity = `${
        opacityHex.toString(16).length === 1 ? '0' : ''
      }${opacityHex.toString(16)}`
    },
    size() {
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
        this.mockup.back.bottom = sketch.loadImage(MockupBackBottom)
        this.mockup.back.handle = sketch.loadImage(MockupBackHandle)
        this.mockup.back.top = sketch.loadImage(MockupBackTop)
        this.mockup.front.body = sketch.loadImage(MockupFrontBody)
        this.mockup.front.bottom = sketch.loadImage(MockupFrontBottom)
        this.mockup.front.handle = sketch.loadImage(MockupFrontHandle)
        this.mockup.front.top = sketch.loadImage(MockupFrontTop)
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
      if (this.activeTeam) this.drawDots()
      if (this.number) this.writeNumber()
      if (this.name && this.isInverted) this.writeName()
      this.sketch.randomSeed(this.uniqueSeed)
    },
    drawBorder(x, y, text) {
      const { sketch } = this
      sketch.push()
      sketch.translate(x, y)
      sketch.text(text, 0, 0)
      sketch.pop()
    },
    drawDots() {
      const {
        activeTeam,
        dotsSprites,
        dotsOpacity,
        size,
        sketch,
      } = this

      if (size) {
        const sprites = dotsSprites[size]
        sketch.tint(`${activeTeam.colors[1]}${dotsOpacity || 'FF'}`)

        sprites.forEach((sprite) => {
          sketch.image(sprite, 0, 0, sketch.width, sketch.height)
        })
      }
    },
    drawMockup() {
      const {
        activeTeam,
        mockupSide,
        sketch,
      } = this
      sketch.clear()
      sketch.push()
      if (activeTeam) sketch.tint(activeTeam.colors[0])
      sketch.image(mockupSide.body, 0, 0, sketch.width, sketch.height)
      if (activeTeam) sketch.tint(activeTeam.colors[1])
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
      const textSize = 40
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
