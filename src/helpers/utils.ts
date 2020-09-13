import { notification } from "antd"
import { NotificationType } from "../types";
import moment from 'moment';

export const sendNotification = ({ message, duration, placement }: NotificationType) => {
    notification.open({
        message,
        'duration': duration ?? 1,
        'placement': placement ?? "topRight"
    });
}

export const formatDate = (dateTime: string) => {
    const localDateTime = moment(dateTime);
    return `${localDateTime.format('MM/DD/YYYY')} ${localDateTime.format('hh:mm A')}`;
}

export const checkEmptyOrNullString = (checkString: string) => {
    if (checkString && checkString !== '')
        return false;
    return true;
}

export const JsonPrettyStyle = {
    main: 'line-height:1.3;color:#66d9ef;background:#272822;overflow:auto;border-radius:5px;height:20vh',
    error: 'line-height:1.3;color:#66d9ef;background:#272822;overflow:auto;border-radius:5px',
    key: 'color:#f92672;',
    string: 'color:#fd971f;',
    value: 'color:#a6e22e;',
    boolean: 'color:#ac81fe;',
} 