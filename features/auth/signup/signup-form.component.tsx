"use client";

import { FormikAuthTextField, FormikSubmitButton } from "@/features/ui";

import { Form, useFormikContext } from "formik";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { RiCloseCircleLine } from "react-icons/ri";

export function SignUpForm() {
  const { setFieldValue, values, isValid } = useFormikContext<any>();

  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <Form>
      <div className="space-y-4">
        <div className="relative">
          <FormikAuthTextField
            className="!rounded-md border-[#E4E7EC]"
            name="email_or_phone"
            props={{
              label: "Email /Phone Number",
              placeholder: "Email /Phone Number",
              className: "text-[#181717] text-xs",
              showPersonIcon: true,
            }}
          />
          <RiCloseCircleLine
            className="absolute right-4 top-[55px] h-5 w-5 -translate-y-1/2 transform cursor-pointer text-xl text-[#667085] hover:text-gray-700"
            onClick={() => setFieldValue("email_or_phone", "")}
          />
        </div>
      </div>
      <div className="space-y-4 pt-4">
        <FormikSubmitButton
          disabled={values?.email_or_phone === "" || isValid === false}
          className="text-md mx-auto h-12 w-full rounded-lg bg-[linear-gradient(117.02deg,#00ACD4_-108.08%,#EC008C_68.12%)] font-bold text-[#FFFFFF] disabled:cursor-not-allowed disabled:bg-[#E4E7EC] disabled:bg-none disabled:text-[#98A2B3] md:w-[358px]"
        >
          Continue
        </FormikSubmitButton>

        <div className="flex w-full items-center py-2 font-medium text-[#667085]">
          <div className="flex-grow border-t border-dashed border-[#FDE6F4]"></div>
          <span className="mx-4">Or Sign In with</span>
          <div className="flex-grow border-t border-dashed border-[#FDE6F4]"></div>
        </div>
        <div className="flex justify-center gap-4">
          <button
            type="button"
            className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-[#E4E7EC] bg-white text-[#3C5A99] hover:shadow-md"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle />
          </button>
        </div>

        <div className="h-auto w-full max-w-md flex-none flex-grow-0 px-2 pt-2 text-left">
          <span className="text-sm font-normal text-[#181717]">
            By continuing, you agree to our
            <Link
              href="/content/terms-and-conditions"
              className="text-[#175CD3] no-underline"
            >
              {" "}
              Terms of Service{" "}
            </Link>
            and
            <Link
              href="/content/privacy-policy"
              className="text-[#175CD3] no-underline"
            >
              {" "}
              Privacy Policy{" "}
            </Link>
            .
          </span>
        </div>

        <p className="text-md pt-8 text-center font-semibold text-[#667085]">
          Already have an account?{" "}
          <Link
            className="text-md text-highlight underline"
            href="/auth/login"
          >
            Log in
          </Link>
        </p>
      </div>
    </Form>
  );
}
