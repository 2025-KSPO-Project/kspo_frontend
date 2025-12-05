"use client";

import { ReactNode } from "react";
import { SWRConfig } from "swr";
import { api } from "@/api/axios";

interface Props {
  children: ReactNode;
}

export function SWRProvider({ children }: Props) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => api.get(url).then((res) => res.data),
        revalidateOnFocus: false,
      }}
    >
      {children}
    </SWRConfig>
  );
}
