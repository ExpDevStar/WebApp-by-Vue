import { ToastProgrammatic as Toast } from "buefy";

export const error = (message, duration = 2000) => {
  Toast.open({
    message,
    position: "is-bottom",
    type: "is-danger",
    queue: false,
    duration
  });
};

export const success = (message, duration = 2000) => {
  Toast.open({
    message,
    position: "is-bottom",
    type: "is-success",
    queue: false,
    duration
  });
};
