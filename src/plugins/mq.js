import Vue from 'vue'
import VueMq from 'vue-mq'

Vue.use(VueMq, {
  breakpoints: {
    xs: 720,
    sm: 960,
    md: 1200,
    lg: 1920,
    xl: Infinity,
  },
})
