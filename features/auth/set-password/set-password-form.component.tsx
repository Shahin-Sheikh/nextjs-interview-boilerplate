"use client";

import { FormikAuthPasswordField, FormikSubmitButton } from "@/features/ui";

import { Form, useFormikContext } from "formik";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TSetPassword } from "./form.config";

export function SetPasswordForm() {
  const { setFieldValue, values, errors } = useFormikContext<TSetPassword>();

  const searchParams = useSearchParams();

  const encodedUserId = searchParams.get("tempToken");
  const encodedOtp = searchParams.get("tempCode");

  useEffect(() => {
    if (encodedUserId) {
      const userId = atob(encodedUserId);
      setFieldValue("userId", Number(userId));
    }
  }, [encodedUserId]);

  useEffect(() => {
    if (encodedOtp) {
      const otpCode = atob(encodedOtp);
      setFieldValue("verificationCode", otpCode);
    }
  }, [encodedOtp]);

  const ResetIcon = ({ fieldName }: { fieldName: string }) => {
    const { setFieldValue, values } = useFormikContext<any>();

    return (
      values[fieldName] && (
        <RiCloseCircleLine
          className="absolute right-10 top-[56px] h-5 w-5 -translate-y-1/2 transform cursor-pointer text-[#667085] hover:text-gray-700"
          onClick={() => setFieldValue(fieldName, "")}
        />
      )
    );
  };

  return (
    <Form className="space-y-6">
      <div className="space-y-4 text-center">
        <h1 className="mb-2 text-2xl font-bold">Create Password</h1>
        <p className="text-center text-base font-medium text-[#344054]">
          Set a strong password for your account. It must be at least 6
          characters long.
        </p>
      </div>
      <div className="space-y-4">
        <div className="relative">
          <FormikAuthPasswordField
            name="password"
            props={{
              label: "Create Password",
              placeholder: "Type a Password",
              feedback: true,
              className: "text-[#000]",
              showLockIcon: true,
              pt: {
                input: {
                  className:
                    "!h-[48px] mt-2 w-full rounded-lg border text-base shadow-none text-gray placeholder:leading-[18px] placeholder:text-[#98A2B3] placeholder:text-[16px] pl-10 pr-[135px]",
                },
                hideIcon: {
                  className: "text-base",
                },
                showIcon: {
                  className: "text-base",
                },
              },
            }}
          />
          <RiCloseCircleLine
            className="absolute right-10 top-[56px] h-5 w-5 -translate-y-1/2 transform cursor-pointer text-[#667085] hover:text-gray-700"
            onClick={() => setFieldValue("password", "")}
          />
        </div>

        <div className="relative">
          <FormikAuthPasswordField
            name="ConfirmPassword"
            props={{
              label: "Confirm New Password",
              placeholder: "Retype Password",
              feedback: true,
              className: "text-[#000]",
              showLockIcon: true,
              pt: {
                input: {
                  className:
                    "!h-[48px] mt-2 w-full rounded-lg border text-base shadow-none text-gray placeholder:leading-[18px] placeholder:text-[#98A2B3] placeholder:text-[16px] pl-10 pr-[135px]",
                },
                hideIcon: {
                  className: "text-base",
                },
                showIcon: {
                  className: "text-base",
                },
              },
            }}
          />
          <RiCloseCircleLine
            className="absolute right-10 top-[56px] h-5 w-5 -translate-y-1/2 transform cursor-pointer text-[#667085] hover:text-gray-700"
            onClick={() => setFieldValue("ConfirmPassword", "")}
          />
        </div>

        <FormikSubmitButton
          disabled={
            values?.password !== values?.ConfirmPassword ||
            Object.keys(errors).length > 0
          }
          className="text-md mx-auto h-12 w-full rounded-lg bg-[linear-gradient(117.02deg,#00ACD4_-108.08%,#EC008C_68.12%)] font-bold text-[#FFFFFF] disabled:cursor-not-allowed disabled:bg-[#E4E7EC] disabled:bg-none disabled:text-[#98A2B3] md:w-[358px]"
        >
          Save & Continue
        </FormikSubmitButton>
      </div>
    </Form>
  );
}
