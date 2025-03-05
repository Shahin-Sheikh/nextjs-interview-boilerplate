"use client";

import { Api, usePost } from "@/features/api";
import { TGlobalErrorResponse } from "@/features/models";
import { AuthWrapper } from "@/features/ui/auth";
import { AxiosError } from "axios";
import { Formik } from "formik";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useEffect } from "react";
import { toast } from "sonner";
import { ForgetPasswordForm } from "./forget-password-form.component";
import {
  ForgetPasswordSchema,
  InitialValue,
  TForgetPassword,
  TForgetPasswordResponse,
} from "./form.config";

export function ForgetPassword() {
  const { status } = useSession();
  const { push } = useRouter();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  useEffect(() => {
    if (status === "authenticated") {
      push(callbackUrl as string);
    }
  }, [status]);

  const { mutateAsync } = usePost<TForgetPassword, TForgetPasswordResponse>({
    url: Api.ForgetPassword,

    auth: true,
    onSuccess: (data, variables) => {
      toast.success(data?.data?.message);
      const queryParam = encodeURIComponent(variables.email_or_phone);
      push(`/auth/reset-new-password?contact=${queryParam}`);
    },
    onError: (error) => {
      const err = error as AxiosError<TGlobalErrorResponse>;
      toast.error(err?.response?.data?.message);
    },
  });

  const onSubmit = async (value: TForgetPassword) => {
    await mutateAsync(value);
  };

  return (
    <AuthWrapper
      title="Forgot Password ?"
      text=""
      imageUrl="/new/auth/forget-password.svg"
    >
      <Formik
        initialValues={InitialValue}
        validationSchema={ForgetPasswordSchema}
        onSubmit={onSubmit}
      >
        <ForgetPasswordForm />
      </Formik>
    </AuthWrapper>
  );
}
