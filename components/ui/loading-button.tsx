"use client"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"
import type React from "react"

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  loadingText?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export function LoadingButton({
  children,
  className,
  isLoading = false,
  loadingText,
  disabled,
  variant = "default",
  size = "default",
  ...props
}: LoadingButtonProps) {
  return (
    <Button className={cn(className)} disabled={isLoading || disabled} variant={variant} size={size} {...props}>
      {isLoading && <Spinner size="sm" className="mr-2" />}
      {isLoading && loadingText ? loadingText : children}
    </Button>
  )
}
