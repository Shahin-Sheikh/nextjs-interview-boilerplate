"use client";

import { Api, usePost } from "@/features/api";
import { TGlobalErrorResponse, TGlobalPostResponse } from "@/features/models";
import { AuthWrapper } from "@/features/ui/auth";
import { AxiosError } from "axios";
import { Formik } from "formik";
import { useRouter } from "nextjs-toploader/app";
import { toast } from "sonner";
import { InitialValue, SetPasswordSchema, TSetPassword } from "./form.config";
import { SetPasswordForm } from "./set-password-form.component";

export function SetPassword() {
  const { push } = useRouter();

  const { mutateAsync } = usePost<TSetPassword, TGlobalPostResponse>({
    url: Api.SetPassword,
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

  const onSubmit = async (value: TSetPassword) => {
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
        validationSchema={SetPasswordSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        <SetPasswordForm />
      </Formik>
    </AuthWrapper>
  );
}
