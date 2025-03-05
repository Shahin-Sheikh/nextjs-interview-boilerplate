"use client";

import { Api, usePost } from "@/features/api";
import { TGlobalErrorResponse, TGlobalPostResponse } from "@/features/models";
import { FormikOtpField, FormikSubmitButton } from "@/features/ui";
import { AxiosError } from "axios";
import { Form, useFormikContext } from "formik";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { VerificationType } from "./form.config";

export function VerificationForm() {
  const [countdown, setCountdown] = useState<number>(59);
  const { setFieldValue, values } = useFormikContext<VerificationType>();

  const searchParams = useSearchParams();
  const encodedUserId = searchParams.get("tempToken");
  const verifyBy = searchParams.get("verify_by");

  useEffect(() => {
    if (encodedUserId) {
      const userId = atob(encodedUserId);
      setFieldValue("userId", userId);
    }
  }, [encodedUserId]);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown]);

  const { mutateAsync } = usePost<{}, TGlobalPostResponse>({
    url: Api.ResendOTP,
    auth: true,
    onSuccess: (data) => {
      toast.success(data?.data?.message);
    },
    onError: (error) => {
      const err = error as AxiosError<TGlobalErrorResponse>;
      toast.error(err?.response?.data?.message);
    },
  });

  const handleResendOTPCode = async () => {
    await mutateAsync({
      user_id: Number(values?.userId),
      verify_by: verifyBy,
    });
    setCountdown(59);
  };

  return (
    <Form className="mx-auto max-w-sm space-y-6">
      <div className="space-y-4 text-center">
        <h1 className="mb-2 text-2xl font-bold">OTP Verification</h1>
        <p className="text-center text-base font-medium text-[#344054]">
          Please enter the 6-digit code sent to your email or phone number to
          continue.
        </p>
      </div>

      <div className="space-y-6 ">
        <div className="flex justify-center p-0 text-center">
          <FormikOtpField
            name="verificationCode"
            label="Enter Code"
          />
        </div>
        <div className="flex justify-between">
          <p
            className={`${countdown !== 0 ? "visible" : "invisible"} text-sm font-bold text-highlight`}
          >
            {String(countdown % 60).padStart(1, "0")}s
          </p>

          <p className="text-sm text-[#667085]">
            <button
              disabled={countdown !== 0}
              className="cursor-pointer text-base font-semibold text-highlight underline disabled:cursor-not-allowed disabled:text-[#344054]"
              onClick={() => handleResendOTPCode()}
            >
              Resend OTP
            </button>
          </p>
        </div>

        <FormikSubmitButton
          disabled={values?.verificationCode?.length !== 6}
          className="text-md mx-auto h-12 w-full rounded-md bg-[linear-gradient(117.02deg,#00ACD4_-108.08%,#EC008C_68.12%)] font-bold text-[#FFFFFF] disabled:cursor-not-allowed disabled:bg-[#E4E7EC] disabled:bg-none disabled:text-[#98A2B3]"
        >
          Verify Account
        </FormikSubmitButton>
      </div>
    </Form>
  );
}
