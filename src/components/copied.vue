<template lang="pug">
div(class='container' :class='classes' @animationend='onAnimationEnd')
  span Copied
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
.container {
  position: fixed;
  background-color: #00dd99;
  color: #ffffff;
  z-index: 12;
  box-shadow: 0 0 8px gray;
  align-items: center;
  display: none;
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
  animation: fadeIn 1s, fadeOut 1s 1s;
}

@keyframes fadeIn {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}

.target {
  font-weight: bold;
  margin-left: 1em;
}
</style>
