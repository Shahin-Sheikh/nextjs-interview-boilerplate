import * as yup from "yup";

export const ForgetPasswordSchema = yup.object({
  email_or_phone: yup
    .string()
    .label("Email or Phone")
    .min(1)
    .max(50)
    .required(),
});

export type TForgetPassword = yup.InferType<typeof ForgetPasswordSchema>;

export const InitialValue: TForgetPassword = {
  email_or_phone: "",
};

export type TForgetPasswordResponse = {
  code: string;
  message: string;
  success: boolean;
  data: Data;
};

export type Data = {
  PhoneOrEmail: string;
  verifyBy: string;
};
