"use client";

import { FormikAuthPasswordField, FormikSubmitButton } from "@/features/ui";

import { Form, useFormikContext } from "formik";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TUpdatePassword } from "./form.config";

export function UpdatePasswordForm() {
  const { setFieldValue, values, errors } = useFormikContext<TUpdatePassword>();

  const searchParams = useSearchParams();

  const contactInfo = searchParams.get("contact");
  const encodedOtp = searchParams.get("tempCode");

  useEffect(() => {
    if (contactInfo) {
      setFieldValue("email_or_phone", contactInfo);
    }
  }, [contactInfo]);

  useEffect(() => {
    if (encodedOtp) {
      const otpCode = atob(encodedOtp);
      setFieldValue("otp", otpCode);
    }
  }, [encodedOtp]);

  return (
    <Form className="space-y-6">
      <div className="space-y-4 text-center">
        <h1 className="mb-2 text-2xl font-bold">Create Password</h1>
        <p className="text-center text-base font-medium text-[#344054]">
          Set a strong password for your account. It must be at least 8
          characters long.
        </p>
      </div>
      <div className="space-y-4">
        <div className="relative">
          <FormikAuthPasswordField
            name="new_password"
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
            onClick={() => setFieldValue("new_password", "")}
          />
        </div>

        <div className="relative">
          <FormikAuthPasswordField
            name="confirm_new_password"
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
            onClick={() => setFieldValue("confirm_new_password", "")}
          />
        </div>

        <FormikSubmitButton
          disabled={
            values?.new_password !== values?.confirm_new_password ||
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
