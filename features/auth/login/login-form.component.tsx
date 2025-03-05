"use client";

import { useCleverTap } from "@/context/clevertap-provider";
import { ECleverTapEvent, ECleverTapEventProperties } from "@/features/api";
import { FormikAuthTextField, FormikSubmitButton } from "@/features/ui";
import { FormikAuthPasswordField } from "@/features/ui/form/formik-password-input-auth.component";
import { Form, useFormikContext } from "formik";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FaInfoCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { PiWarningCircle } from "react-icons/pi";
import { RiCloseCircleLine } from "react-icons/ri";
import { LoginRequest } from "./form.config";

type TProps = {
  errorMessage: string;
  isSuccess: boolean;
};

export function LoginForm({ errorMessage, isSuccess }: TProps) {
  const clevertap = useCleverTap();
  const { setFieldValue, values, errors } = useFormikContext<LoginRequest>();

  const handleGoogleSignIn = async () => {
    await signIn("google").then(() => {
      clevertap.event.push(ECleverTapEvent.SocialLogin, {
        [ECleverTapEventProperties.SocialType]: "Google",
      });
    });
  };

  const ForgotButton = ({ text }: { text: string }) => {
    return (
      <Link
        className="absolute right-[6px] top-[38px] flex h-[36px] w-[78px] items-center justify-center rounded-[4px]  bg-[#FDE6F4] text-[14px] font-bold text-highlight"
        type="button"
        href="/auth/forget-password"
      >
        {text}
      </Link>
    );
  };

  return (
    <Form>
      {errorMessage && !isSuccess ? (
        <div className="mb-6 grid grid-cols-12 space-y-4 rounded-[12px] border-[1px] border-[#F04438] bg-[#FFFBFA] p-2">
          <FaInfoCircle className="col-1 col-span-1 text-2xl text-[#DD2727]" />
          <p className="col-11 col-span-11 !m-0 pl-2 text-[#F04438]">
            {errorMessage}
          </p>
        </div>
      ) : null}
      <div className="space-y-4">
        <div className="relative">
          <FormikAuthTextField
            className="!rounded-md border-[#E4E7EC]"
            name="email_or_phone"
            props={{
              label: "Email/Phone Number",
              placeholder: "Email /Phone Number",
              requiredIcon: "*",
              className:
                "text-[#181717] text-[16px] font-bold leading-[20px] h-[44px]",
              showPersonIcon: true,
              warningIcon: <PiWarningCircle size={20} />,
            }}
          />
          <RiCloseCircleLine
            className="absolute right-4 top-[55px] h-5 w-5 -translate-y-1/2 transform cursor-pointer text-xl text-[#667085] hover:text-gray-700"
            onClick={() => setFieldValue("email_or_phone", "")}
          />
        </div>
        <div className="relative">
          <FormikAuthPasswordField
            className="!rounded-md border-[#E4E7EC]"
            name="password"
            props={{
              label: "Password",
              placeholder: "Password",
              requiredIcon: "*",
              showLockIcon: true,
              // feedback: false,
              pt: {
                input: {
                  className:
                    "!h-[48px] mt-2 w-full rounded-lg border text-base shadow-none text-gray placeholder:leading-[18px] placeholder:text-[#98A2B3] placeholder:text-[16px] pl-10 pr-[135px]",
                },
                hideIcon: {
                  className: "pr-[118px] pt-[4px] h-[16px] w-[16px] text-base",
                },
                showIcon: {
                  className: "pr-[118px] pt-[4px] h-[16px] w-[16px] text-base",
                },
                panel: {
                  className: "mt-2",
                },
              },
              className:
                "text-[#181717] text-[14px] font-bold leading-[20px] h-[48px] mb-2",
              warningIcon: <PiWarningCircle size={20} />,
            }}
          />
          <ForgotButton text="Forgot?" />
          <div className="absolute right-[85px] top-[40px] mr-3 h-[32px] w-[1px] bg-[#E4E7EC]"></div>
        </div>
      </div>
      <div className="space-y-4 pt-4">
        <FormikSubmitButton
          disabled={
            !!errors.email_or_phone ||
            !!errors.password ||
            values.email_or_phone === "" ||
            values.password === ""
          }
          className="text-md h-[48px] bg-[linear-gradient(117.02deg,#00ACD4_-108.08%,#EC008C_68.12%)] font-bold text-[#FFFFFF] disabled:!bg-[#E4E7EC] disabled:bg-none disabled:text-[#98A2B3]"
        >
          Sign In
        </FormikSubmitButton>

        <div className="flex w-full items-center py-2 font-medium text-[#667085]">
          <div className="flex-grow border-t border-dashed border-[#FDE6F4]"></div>
          <span className="mx-4">Or Sign In with</span>
          <div className="flex-grow border-t border-dashed border-[#FDE6F4]"></div>
        </div>
        <div className="flex justify-center gap-4 pb-2">
          <button
            type="button"
            className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-[#E4E7EC] bg-white text-[#3C5A99] hover:shadow-md"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle />
          </button>
        </div>
        <p className="text-center font-medium">
          New to Cartup?{" "}
          <Link
            href="/auth/signup"
            className="font-bold text-highlight underline"
          >
            Register
          </Link>
        </p>
      </div>
    </Form>
  );
}
