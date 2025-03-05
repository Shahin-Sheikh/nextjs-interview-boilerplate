import * as yup from "yup";

export const SignUpSchema = yup.object({
  email_or_phone: yup
    .string()
    .label("Username")
    .required("ⓘ Please enter a valid email or phone number.")
    .test(
      "email-or-phone",
      "ⓘ Please enter a valid email or phone number.",
      (value) => {
        if (!value) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const bdPhoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;
        return emailRegex.test(value) || bdPhoneRegex.test(value);
      },
    )
    .max(50, "Email or phone number must not exceed 50 characters"),
});

export type TSingUp = yup.InferType<typeof SignUpSchema>;

export const InitialValue: TSingUp = {
  email_or_phone: "",
};

export type SignUpResponse = {
  code: string;
  success: boolean;
  message: string;
  data: Data;
};

export type Data = {
  accessToken: string;
  tokenType: string;
  refreshToken: string;
  user: User;
};

export type User = {
  _id: string;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  profileImage: string;
  deviceToken: string;
};
