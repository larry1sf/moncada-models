"use client"

import {
  IconCircleCheck,
  IconInfoCircle,
  IconLoader2,
  IconCircleX,
  IconAlertCircle,
} from "@tabler/icons-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <IconCircleCheck className="size-5" />,
        info: <IconInfoCircle className="size-5" />,
        warning: <IconAlertCircle className="size-5" />,
        error: <IconCircleX className="size-5" />,
        loading: <IconLoader2 className="size-5 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--background)",
          "--normal-text": "var(--color-text-dark)",
          "--normal-border": "var(--border-border)",
          "--border-radius": "var(--radius-lg)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
