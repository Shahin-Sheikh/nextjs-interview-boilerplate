"use client";

import { useCleverTap } from "@/context/clevertap-provider";
import { formatPhoneNumber } from "@/features/helper";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export function ClevertapUserUpdateFn() {
  const { data: session } = useSession();
  const clevertap = useCleverTap();

  useEffect(() => {
    if (session?.user) {
      clevertap?.onUserLogin.push({
        Site: {
          Name: `${session?.user?.data?.user?.firstName} ${session?.user?.data?.user?.lastName}`,
          Identity: session?.user?.data?.user?.id,
          Email: session?.user?.data?.user?.email,
          Phone: formatPhoneNumber(session?.user?.data?.user?.phone ?? ""),
        },
      });
    }
  }, [session, clevertap]);

  return null;
}
