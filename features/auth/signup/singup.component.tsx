"use client";

import { useAdjust } from "@/context/adjust-provider";
import { useCleverTap } from "@/context/clevertap-provider";
import {
  Api,
  EAdjustEventNames,
  EAdjustEventTokens,
  ECleverTapEvent,
  ECleverTapEventProperties,
  usePost,
} from "@/features/api";
import { TGlobalErrorResponse, TSignUpData } from "@/features/models";
import { AuthWrapper } from "@/features/ui/auth";
import { AxiosError, AxiosResponse } from "axios";
import { Formik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "nextjs-toploader/app";
import { useEffect } from "react";
import { toast } from "sonner";
import { InitialValue, SignUpSchema, TSingUp } from "./form.config";
import { SignUpForm } from "./signup-form.component";

export function SignUp() {
  const clevertap = useCleverTap();
  const { push } = useRouter();
  const { status } = useSession();
  const { adjust } = useAdjust();

  useEffect(() => {
    if (status === "authenticated") {
      push("/");
    }
  }, [status]);

  const { mutateAsync } = usePost<TSingUp, TSignUpData>({
    url: Api.SingUp,

    auth: true,
    onSuccess: (data: AxiosResponse<TSignUpData>) => {
      const userId = String(data?.data?.data?.id);
      const encodedUserId = btoa(userId);
      const verifyBy = data?.data?.data?.email ? "email" : "phone";
      push(
        `/auth/verification?tempToken=${encodedUserId}&verify_by=${verifyBy}`,
      );
    },
    onError: (error) => {
      const err = error as AxiosError<TGlobalErrorResponse>;
      toast.error(err?.response?.data?.message);
    },
  });

  const onSubmit = async (value: TSingUp) => {
    adjust?.trackEvent({
      eventToken: EAdjustEventTokens.USER_REGISTERED,
      callbackParams: [
        {
          key: EAdjustEventNames.USER_REGISTERED,
          value: JSON.stringify(value),
        },
      ],
    });

    clevertap.event.push(ECleverTapEvent.Signup, {
      [value.email_or_phone.includes("@")
        ? ECleverTapEventProperties.Email
        : ECleverTapEventProperties.PhoneNumber]: value.email_or_phone,
    });

    await mutateAsync({
      email_or_phone: value.email_or_phone,
    });
  };

  return (
    <AuthWrapper
      title="Register"
      text="to Access the Best Deals and Products in Bangladesh!"
      imageUrl="/new/auth/register.svg"
    >
      <Formik
        initialValues={InitialValue}
        validationSchema={SignUpSchema}
        onSubmit={onSubmit}
      >
        <SignUpForm />
      </Formik>
    </AuthWrapper>
  );
}
