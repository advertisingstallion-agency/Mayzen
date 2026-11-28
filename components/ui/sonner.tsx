"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      position="bottom-right"
      offset={24}
      // Keeps toasts above the mobile sticky "Ajouter au panier" bar.
      mobileOffset={{ bottom: 88, left: 16, right: 16 }}
      gap={10}
      closeButton
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-5 stroke-[1.5] text-blush-300" />,
        info: <InfoIcon className="size-5 stroke-[1.5] text-blush-300" />,
        warning: <TriangleAlertIcon className="size-5 stroke-[1.5] text-blush-300" />,
        error: <OctagonXIcon className="size-5 stroke-[1.5] text-blush-300" />,
        loading: <Loader2Icon className="size-5 animate-spin stroke-[1.5] text-blush-300" />,
      }}
      style={
        {
          "--normal-bg": "var(--color-wine-700)",
          "--normal-text": "var(--color-ivory-100)",
          "--normal-border": "rgb(246 238 224 / 0.15)",
          "--border-radius": "2px",
          "--width": "380px",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "cn-toast !items-center !gap-3 !px-5 !py-4 !shadow-[0_16px_40px_rgba(62,17,22,0.28)] !border-l-[3px] !border-l-blush-300",
          title: "!text-[14px] !font-medium !leading-snug !tracking-normal",
          description: "!text-[13px] !text-ivory-100/75",
          actionButton:
            "!ml-auto !h-9 !rounded-[2px] !bg-ivory-100 !px-3 !text-[11px] !font-medium !uppercase !tracking-[0.08em] !text-wine-700 hover:!bg-blush-100",
          cancelButton: "!rounded-[2px] !bg-transparent !text-ivory-100/75",
          closeButton:
            "!border-ivory-100/20 !bg-wine-900 !text-ivory-100 hover:!bg-wine-500",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
