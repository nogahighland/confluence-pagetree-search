<template lang="pug">
  p Copied {{text}}
</template>

<script lang="ts">
/* eslint-disable import/no-default-export */
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class Copied extends Vue {
  @Prop({ required: true })
  private text!: string
}
</script>
