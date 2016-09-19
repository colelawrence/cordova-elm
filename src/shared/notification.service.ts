import { LocalNotifications } from 'ionic-native'

export type NotificationId = any;

export class NotificationService {
  constructor() { }
  send(message: string): NotificationId {
    LocalNotifications.schedule({
      text: message
    })
  }
}
