"use client"
import { ThemeProvider } from "next-themes"
import { AppWrapper } from "@/context/state"

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <AppWrapper>{children}</AppWrapper>
    </ThemeProvider>
  )
}

export default Providers