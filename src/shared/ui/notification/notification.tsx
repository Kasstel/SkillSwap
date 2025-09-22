import styles from "./notification.module.css";

interface NotificationProps {
  senderName: string;
  onClose: () => void;
  onAction?: () => void;
}

export const Notification = ({
  senderName,
  onClose,
  onAction,
}: NotificationProps) => {
  const message = `${senderName} предлагает вам обмен`;

  return (
    <div className={styles.notification}>
      <div className={styles.content}>
        <div className={styles.messageWrapper}>
          <svg
            className={styles.ideaIcon}
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.09 13.998C4.70066 13.118 4.49969 12.1663 4.5 11.204C4.5 7.49905 7.41 4.49805 11 4.49805C14.59 4.49805 17.5 7.50005 17.5 11.204C17.5003 12.1663 17.2993 13.118 16.91 13.998M11 0.998047V1.99805M21 10.998H20M2 10.998H1M18.07 3.92705L17.363 4.63405M4.637 4.63505L3.93 3.92805M13.517 18.305C14.527 17.978 14.933 17.053 15.047 16.123C15.081 15.845 14.852 15.614 14.572 15.614H7.477C7.40862 15.613 7.3408 15.6264 7.278 15.6535C7.21521 15.6806 7.15888 15.7207 7.11275 15.7712C7.06662 15.8216 7.03173 15.8813 7.0104 15.9463C6.98906 16.0113 6.98177 16.08 6.989 16.148C7.101 17.076 7.383 17.754 8.453 18.304M13.517 18.305L8.453 18.304M13.517 18.305C13.396 20.25 12.834 21.02 11.007 20.998C9.053 21.034 8.603 20.081 8.453 18.304"
              stroke="#253017"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={styles.message}>{message}</span>
        </div>
        <div className={styles.actions}>
          {onAction && (
            <button className={styles.actionButton} onClick={onAction}>
              Перейти
            </button>
          )}
          <button className={styles.closeButton} onClick={onClose}>
            <svg
              className={styles.crossIcon}
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.7442 2.28919L2.25896 10.7745C1.96905 11.0644 1.48821 11.0644 1.1983 10.7745C0.908385 10.4846 0.908385 10.0037 1.1983 9.71381L9.68358 1.22853C9.9735 0.938614 10.4543 0.938614 10.7442 1.22853C11.0342 1.51844 11.0342 1.99927 10.7442 2.28919Z"
                fill="#253017"
              />
              <path
                d="M10.7442 10.7734C10.4543 11.0633 9.9735 11.0633 9.68358 10.7734L1.1983 2.28814C0.908385 1.99823 0.908385 1.5174 1.1983 1.22748C1.48821 0.937569 1.96905 0.937569 2.25896 1.22748L10.7442 9.71277C11.0342 10.0027 11.0342 10.4835 10.7442 10.7734Z"
                fill="#253017"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
