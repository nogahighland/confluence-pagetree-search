<template lang="pug">
li(@click='onClick' :class='{ unread: !body.read }')
  p {{notification.item.title}}
  p {{time}}
  img(:src='iconUrl')
  span {{body.metadata.username}}
  p.notification-title {{body.title}}
  .content(v-html='body.description')
</template>

<script lang="ts">
/* eslint-disable import/no-default-export */
import moment from 'moment'
import { Component, Prop, Vue } from 'vue-property-decorator'

import { Notification, NotificationBody } from '@/types'

@Component({})
export default class NotificationItem extends Vue {
  @Prop()
  private notification!: Notification

  onClick(): void {
    switch (this.notification.item.entity) {
      case 'page':
      case 'comment':
        window.open(`/confluence${this.body.url}`, '_blank')
        break
      case 'issue':
        window.open(
          `${process.env['JIRA_HOST']}/jira${this.body.url}`,
          '_blank'
        )
        break
    }
  }

  get body(): NotificationBody {
    return this.notification.notifications[0]
  }

  get iconUrl(): string {
    switch (this.notification.item.entity) {
      case 'page':
      case 'comment':
        return `/confluence${this.body.iconUrl}`
      case 'issue':
        return `${process.env['JIRA_HOST']}/jira${this.body.iconUrl}`
      default:
        return ''
    }
  }

  get time(): string {
    return moment(this.body.created).format('LLLL')
  }
}
</script>

<style lang="scss" scoped>
li {
  cursor: pointer;
  list-style-type: none;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  min-height: 4em;
  border-bottom: 1px #000 solid;

  .content {
    text-overflow: ellipsis;
  }

  img {
    width: 20px;
  }
}

li:hover {
  background-color: gray;
}

.unead {
  background-color: pink;
}
</style>
