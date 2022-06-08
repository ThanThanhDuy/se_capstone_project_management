import { notification } from "antd";

const openNotification = (type, message, description = "") => {
  notification[type]({
    message: message,
    description: description,
  });
};

export default openNotification;
