import * as yup from "yup";

export const ResetNewPasswordSchema = yup.object({
  email_or_phone: yup
    .string()
    .label("Email or Phone")
    .min(1)
    .max(50)
    .required(),

  otp: yup.string().label("OTP").required(),
});

export type TResetNewPassword = yup.InferType<typeof ResetNewPasswordSchema>;

export const InitialValue: TResetNewPassword = {
  email_or_phone: "",
  otp: "",
};

export type TNewResetPasswordResponse = {
  code: string;
  message: string;
  success: boolean;
  data: null;
};
