<template lang="pug">
#notification-wrapper
  #notification-icon(@click='notificationVisible = !notificationVisible' :class='{ unread: hasUnread }')
    font-awesome-icon.bell(icon='bell')

  #notifications(v-if='notificationVisible')
    notification-item(v-for="(n, i) in notifications" :notification='n' :key='i')
</template>

<script lang="ts">
/* eslint-disable import/no-default-export */
import axios from 'axios'
import { Component, Vue } from 'vue-property-decorator'

import NotificationItem from '@/components/notification-item.vue'
import { Notification } from '@/types'

@Component({ components: { NotificationItem } })
export default class NotificationWrapper extends Vue {
  notifications: Notification[] = []
  notificationVisible = false

  async mounted(): Promise<void> {
    const response = await axios.get(
      '/confluence/rest/mywork/latest/notification/nested?limit=30'
    )
    this.notifications = response.data as Notification[]
  }

  get hasUnread(): boolean {
    return !!this.notifications.find(n => !n.notifications[0].read)
  }
}
</script>

<style lang="scss" scoped>
#notification-icon {
  background-color: #0040a3;
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 102; // ヘッダーより上
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 0 8px gray;
  cursor: pointer;

  .bell {
    font-size: x-large;
    color: #d8e8fe;
  }
}
#notification-icon.unread {
  background-color: red;
}

#notifications {
  background-color: #ffffff;
  position: fixed;
  top: 45px;
  z-index: 102; // ヘッダーより上
  right: 0px;
  width: 500px;
  box-shadow: 0 0 8px gray;
  padding: 1em;
}
</style>
