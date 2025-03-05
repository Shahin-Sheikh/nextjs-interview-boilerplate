import { passwordMessage, passwordRegex } from "@/features/helper";
import * as yup from "yup";

export const UpdatePasswordSchema = yup.object({
  email_or_phone: yup
    .string()
    .label("Email or Phone")
    .min(1)
    .max(50)
    .required(),
  new_password: yup
    .string()
    .label("New Password")
    .required()
    .matches(passwordRegex, passwordMessage),
  confirm_new_password: yup
    .string()
    .label("Confirm Password")
    .required()
    .matches(passwordRegex, passwordMessage)
    .test(
      "passwords-match",
      "Confirm Password must match New Password",
      function passwordsMatch(value) {
        return value === this.parent.new_password;
      },
    ),
  otp: yup.string().label("OTP").required(),
});

export type TUpdatePassword = yup.InferType<typeof UpdatePasswordSchema>;

export const InitialValue: TUpdatePassword = {
  email_or_phone: "",
  new_password: "",
  confirm_new_password: "",
  otp: "",
};
