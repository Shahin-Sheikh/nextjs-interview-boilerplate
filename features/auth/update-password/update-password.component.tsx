"use client";

import { Api, usePost } from "@/features/api";
import { TGlobalErrorResponse, TGlobalPostResponse } from "@/features/models";
import { AuthWrapper } from "@/features/ui/auth";
import { AxiosError } from "axios";
import { Formik } from "formik";
import { useRouter } from "nextjs-toploader/app";
import { toast } from "sonner";
import {
  InitialValue,
  TUpdatePassword,
  UpdatePasswordSchema,
} from "./form.config";
import { UpdatePasswordForm } from "./update-password-form.component";

export function UpdatePassword() {
  const { push } = useRouter();

  const { mutateAsync } = usePost<TUpdatePassword, TGlobalPostResponse>({
    url: Api.ResetNewPassword,
    auth: true,
    onSuccess: (data) => {
      toast.success(data?.data?.message);
      push("/auth/login");
    },
    onError: (error) => {
      const err = error as AxiosError<TGlobalErrorResponse>;
      toast.error(err?.response?.data?.message);
    },
  });

  const onSubmit = async (value: TUpdatePassword) => {
    await mutateAsync(value);
  };
  return (
    <AuthWrapper
      title="Create Password"
      text=""
      imageUrl="/new/auth/create-password.svg"
    >
      <Formik
        initialValues={InitialValue}
        validationSchema={UpdatePasswordSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        <UpdatePasswordForm />
      </Formik>
    </AuthWrapper>
  );
}
