"use client";

import { Api, usePost } from "@/features/api";
import { TGlobalErrorResponse, TGlobalPostResponse } from "@/features/models";
import { AuthWrapper } from "@/features/ui/auth";
import { AxiosError } from "axios";
import { Formik } from "formik";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useEffect } from "react";
import { toast } from "sonner";
import {
  InitialValue,
  ResetNewPasswordSchema,
  TResetNewPassword,
} from "./form.config";
import { ResetNewPasswordForm } from "./reset-new-password-form.component";

export function ResetNewPassword() {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const router = useRouter();
  const contact = searchParams.get("contact");

  useEffect(() => {
    if (!contact) {
      push("/auth/forget-password");
    }
  }, [contact, push]);

  const initialValues = {
    ...InitialValue,
    email_or_phone: contact ?? "",
  };

  const { mutateAsync } = usePost<TResetNewPassword, TGlobalPostResponse>({
    url: Api.OTPVerification,
    auth: true,

    onError: (error) => {
      const err = error as AxiosError<TGlobalErrorResponse>;
      toast.error(err?.response?.data?.message);
    },
  });

  const onSubmit = async (value: TResetNewPassword) => {
    mutateAsync(value).then(() => {
      const encodedOtp = btoa(value?.otp);
      router.push(
        `/auth/update-password?contact=${value?.email_or_phone}&tempCode=${encodedOtp}`,
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
        initialValues={initialValues}
        validationSchema={ResetNewPasswordSchema}
        onSubmit={onSubmit}
      >
        <ResetNewPasswordForm isContactPresent={!!contact} />
      </Formik>
    </AuthWrapper>
  );
}
