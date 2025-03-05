"use client";

import { FormikAuthTextField, FormikSubmitButton } from "@/features/ui";
import { Form, useFormikContext } from "formik";
import { RiCloseCircleLine } from "react-icons/ri";

export function ForgetPasswordForm() {
  const { setFieldValue } = useFormikContext<any>();

  return (
    <Form className="space-y-6">
      <div className="space-y-4 text-center">
        <h1 className="mb-2 text-2xl font-bold">Get Verification Code</h1>
        <p className="text-center text-base font-medium text-[#344054]">
          Enter your email or phone number below to receive a verification code.
        </p>
      </div>
      <div className="space-y-4">
        <div className="relative">
          <FormikAuthTextField
            className="!rounded-md border-[#E4E7EC]"
            name="email_or_phone"
            props={{
              label: "Email/Phone",
              placeholder: "Email /Phone Number",
              className: "text-[#181717]",
              showPersonIcon: true,
            }}
          />
          <RiCloseCircleLine
            className="absolute right-4 top-[55px] h-5 w-5 -translate-y-1/2 transform cursor-pointer text-xl text-[#667085] hover:text-gray-700"
            onClick={() => setFieldValue("email_or_phone", "")}
          />
        </div>

        <FormikSubmitButton
          style={{
            background:
              "linear-gradient(117.02deg, #00ACD4 -108.08%, #EC008C 68.12%)",
          }}
          className="text-md rounded-[48px] font-bold text-[#FFFFFF]"
        >
          Reset Password
        </FormikSubmitButton>
      </div>
    </Form>
  );
}
