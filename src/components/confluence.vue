<template lang="pug">
#confluence
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

/* eslint-disable import/no-default-export */
@Component({})
export default class Confluence extends Vue {
  @Prop()
  private originalBody!: string

  mounted(): void {
    this.$el.innerHTML = this.originalBody
  }
}
</script>
