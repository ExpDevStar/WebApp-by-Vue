import { required, confirmed, email } from "vee-validate/dist/rules";
import { extend } from "vee-validate";

extend("required", {
  ...required,
  message: "This field is required"
});

extend("email", {
  ...email,
  message: "This field must be a valid email"
});

extend("confirmed", {
  ...confirmed,
  message: "This field confirmation does not match"
});

extend("min", {
  validate(value, { length }) {
    return value.length >= length;
  },
  params: ["length"],
  message: "The password must have at least {length} characters"
});
