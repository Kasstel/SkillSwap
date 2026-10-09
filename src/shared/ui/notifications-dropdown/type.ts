export interface INotificationItem {
  id: string;
  title: string;
  time: string;
  icon: string;
  isRead: boolean;
}

export interface INotificationsDropdownProps {
  notifications: INotificationItem[];
}
