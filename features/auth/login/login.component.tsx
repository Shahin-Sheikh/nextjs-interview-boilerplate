"use client";

import { useAdjust } from "@/context/adjust-provider";
import { useCleverTap } from "@/context/clevertap-provider";
import {
  EAdjustEventNames,
  EAdjustEventTokens,
  ECleverTapEvent,
  ECleverTapEventProperties,
} from "@/features/api";
import { AuthWrapper } from "@/features/ui/auth";
import { Formik } from "formik";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";
import { InitialValue, LoginRequest, LoginSchema } from "./form.config";
import { LoginForm } from "./login-form.component";

type TProps = {
  isModal?: boolean;
};

export function Login({ isModal = false }: Readonly<TProps>) {
  const clevertap = useCleverTap();
  const { status } = useSession();
  const { push } = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const { adjust } = useAdjust();

  useEffect(() => {
    if (status === "authenticated") {
      push("/");
    }
  }, [status]);

  const [callbackUrl, setCallbackUrl] = useState<string>("/");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const url = params.get("callbackUrl") ?? "/";
    setCallbackUrl(url);
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      push(callbackUrl);
    }
  }, [status]);

  const onSubmit = async (value: LoginRequest) => {
    const res = await signIn("credentials", {
      redirect: false,
      ...value,
    });

    if (res) {
      setErrorMessage(String(res?.error));
      setIsSuccess(res.ok);
    }

    if (res?.ok) {
      adjust?.trackEvent({
        eventToken: EAdjustEventTokens.LOGIN,
        callbackParams: [
          {
            key: EAdjustEventNames.LOGIN,
            value: JSON.stringify(value.email_or_phone),
          },
        ],
      });

      clevertap?.event.push(ECleverTapEvent.Login, {
        email_or_phone: value.email_or_phone,
        [ECleverTapEventProperties.LoggedIn]: true,
      });

      window.location.href = callbackUrl;
    }
  };

  return !isModal ? (
    <AuthWrapper
      title="Sign In"
      text="to Access the Best Deals and Products in Bangladesh!"
      imageUrl="/new/auth/sign-in.svg"
    >
      <Formik
        initialValues={InitialValue}
        validationSchema={LoginSchema}
        onSubmit={onSubmit}
      >
        <LoginForm
          errorMessage={errorMessage}
          isSuccess={isSuccess}
        />
      </Formik>
    </AuthWrapper>
  ) : (
    <Formik
      initialValues={InitialValue}
      validationSchema={LoginSchema}
      onSubmit={onSubmit}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-[28px] font-bold text-highlight">Sign In</h1>
        </div>
        <img
          src="/new/auth/sign-in.svg"
          alt="auth-image"
          className="mb-6 mt-4 h-[100px] w-auto object-contain"
        />
        <LoginForm
          errorMessage={errorMessage}
          isSuccess={isSuccess}
        />
      </div>
    </Formik>
  );
}
