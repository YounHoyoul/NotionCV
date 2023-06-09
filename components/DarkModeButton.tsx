"use client"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"

export default function DarkModeButton() {
  const [mounted, setMounted] = useState(false)
  const { systemTheme, theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const currentTheme = theme === "system" ? systemTheme : theme

  return (
    <div className={clsx('absolute', 'right-0', '-top-20')}>
      {currentTheme === "dark" ? (
        <SunIcon
          className="h-6 w-6 cursor-pointer text-yellow-400"
          onClick={() => {
            setTheme("light")
          }}
        />
      ) : (
        <MoonIcon
          className="h-6 w-6 cursor-pointer text-slate-700"
          onClick={() => {
            setTheme("dark")
          }}
        />
      )}
    </div>
  )
}
