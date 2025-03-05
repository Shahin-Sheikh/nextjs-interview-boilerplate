import * as yup from "yup";

export const LoginSchema = yup.object({
  email_or_phone: yup
    .string()
    .label("Email / Phone")
    .min(1)
    .max(50)
    .required("Please enter a valid Email /Phone"),
  password: yup
    .string()
    .label("Password")
    .min(1)
    .required("Password is a required"),
});

export type LoginRequest = yup.InferType<typeof LoginSchema>;

export const InitialValue: LoginRequest = {
  email_or_phone: "",
  password: "",
};

export type LoginResponse = {
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
