import * as yup from "yup";

export const VerificationSchema = yup.object({
  userId: yup.number(),
  verificationCode: yup.string().required(" "),
});

export type VerificationType = yup.InferType<typeof VerificationSchema>;

export const InitialValue: VerificationType = {
  userId: 0,
  verificationCode: "",
};

export type VerificationResponse = {
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
