import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
class Notifications {
  constructor() {
    PushNotification.configure({
    
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      popInitialNotification: true,
      requestPermissions: true,
      onPermissionRequest: function (status) {
        console.log('PERMISSION:', status);
      },


      onAction: function (notification) {
        if (notification.action === 'Accept') {
          console.log('Alarm Snoozed');
        } else if (notification.action === 'Reject') {
          console.log('Alarm Stoped');
        } else {
          console.log('Notification opened');
        }
      },
      actions: ['Accept', 'Reject'],
    });

    PushNotification.createChannel(
      {
        channelId: 'reminders', // (required)
        channelName: 'Task reminder notifications', // (required)
        channelDescription: 'Reminder for any tasks',
      },
      () => {},
    );

    PushNotification.getScheduledLocalNotifications(rn => {
    });
  }

  schduleNotification(date, message) {

    PushNotification.localNotificationSchedule({
      channelId: 'reminders',
      title: '🔔 Reminder!',
      message: message,
      actions: ['Accept', 'Reject'],
      allowWhileIdle: true,
      invokeApp: false,
      date,
    });
  }
}

export default new Notifications();
