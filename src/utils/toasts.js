import { ToastProgrammatic as Toast } from "buefy";

export const error = message => {
  Toast.open({
    message,
    position: "is-bottom",
    type: "is-danger",
    queue: false
  });
};
