"use client"
import { SessionProvider } from "next-auth/react"
import {NextUIProvider} from "@nextui-org/react";

export const NextAuthProvider =({children}) => {
    return(
      <SessionProvider>
        <NextUIProvider>
          {children}
        </NextUIProvider>
      </SessionProvider>
    ) 

  }