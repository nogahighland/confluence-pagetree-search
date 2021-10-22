<template lang="pug">
div.outer
  div.container(:class='classes' @animationend='onAnimationEnd')
    span
      font-awesome-icon(icon='copy')
    span.target {{text}}
</template>

<script lang="ts">
/* eslint-disable import/no-default-export */
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class Copied extends Vue {
  @Prop({ required: true })
  private text!: string

  @Prop({ required: true })
  private show = false

  onAnimationEnd(): void {
    this.$emit('animationend')
  }

  get classes(): { show: boolean } {
    return { show: this.show }
  }
}
</script>

<style lang="scss" scoped>
.outer {
  width: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
}

.container {
  display: none;
  position: fixed;
  background-color: #00dd99;
  color: #ffffff;
  z-index: 12;
  box-shadow: 0 0 8px #bbbbbb;
  align-items: center;
  justify-content: center;
  height: 3em;
  padding: 0 1em;
  @media screen and (min-width: 480px) {
    width: 50%;
  }
  @media screen and (min-width: 480px) and (max-width: 1500px) {
    width: 40%;
  }
  @media screen and (min-width: 1500px) {
    width: 30%;
  }
}

.show {
  display: flex;
  animation: fade 3s ease-in-out;
}

@keyframes fade {
  0% {
    top: 0;
    opacity: 0;
  }
  30% {
    top: 30px;
    opacity: 1;
  }
  70% {
    top: 30px;
    opacity: 1;
  }
  100% {
    top: 0;
    opacity: 0;
  }
}

.target {
  font-weight: bold;
  margin-left: 1em;
  font-size: smaller;
}
</style>
