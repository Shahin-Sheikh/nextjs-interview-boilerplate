"use client";

import { Api, usePost } from "@/features/api";
import { TGlobalErrorResponse } from "@/features/models";
import { AuthWrapper } from "@/features/ui/auth";
import { AxiosError } from "axios";
import { Formik } from "formik";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { toast } from "sonner";
import {
  VerificationResponse,
  VerificationSchema,
  VerificationType,
} from "./form.config";
import { VerificationForm } from "./verification-form.component";

export function Verification() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const encodedUserId = searchParams.get("tempToken");

  const { mutateAsync } = usePost<VerificationType, VerificationResponse>({
    url: Api.OTPConfirmation,
    auth: true,
    onError: (error) => {
      const err = error as AxiosError<TGlobalErrorResponse>;
      toast.error(err?.response?.data?.message);
    },
  });

  const onSubmit = async (values: VerificationType) => {
    await mutateAsync({
      userId: Number(values?.userId),
      verificationCode: values?.verificationCode,
    }).then(() => {
      const encodedOtp = btoa(values?.verificationCode);
      router.push(
        `/auth/set-password?tempToken=${encodedUserId}&tempCode=${encodedOtp}`,
      );
    });
  };

  return (
    <AuthWrapper
      title="OTP Verification"
      text=""
      imageUrl="/new/auth/otp.svg"
    >
      <Formik
        initialValues={{ userId: 0, verificationCode: "" }}
        validationSchema={VerificationSchema}
        onSubmit={onSubmit}
      >
        <VerificationForm />
      </Formik>
    </AuthWrapper>
  );
}
