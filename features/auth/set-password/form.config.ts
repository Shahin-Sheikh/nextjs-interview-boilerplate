import * as yup from "yup";

export const SetPasswordSchema = yup.object({
  userId: yup.number().required(),
  password: yup.string().label("Password").required().min(6),
  ConfirmPassword: yup
    .string()
    .label("Confirm Password")
    .required()
    .test(
      "passwords-match",
      "Passwords must match",
      function passwordsMatch(value) {
        return value === this.parent.password;
      },
    ),
  verificationCode: yup.string().label("OTP").required(),
});

export type TSetPassword = yup.InferType<typeof SetPasswordSchema>;

export const InitialValue: TSetPassword = {
  userId: 0,
  password: "",
  ConfirmPassword: "",
  verificationCode: "",
};
