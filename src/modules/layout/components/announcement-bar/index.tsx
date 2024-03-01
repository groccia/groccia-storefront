"use client"
import React, { Fragment, useEffect, useState } from "react"
import Link from "next/link"
import { getGlobal } from "@lib/data/content"
import { useParams } from "next/navigation"

type Props = {}

export default function AnnouncementBar({}: Props) {
  const params = useParams<{ countryCode: string }>()
  const [announcementBar, setAnnouncementBar] = useState<any>()

  useEffect(() => {
    getGlobal(params.countryCode, ["announcement_bar"]).then((content) =>
      setAnnouncementBar(content?.data?.announcement_bar)
    )
  }, [params.countryCode])

  if (!announcementBar) {
    return <Fragment />
  }

  return (
    <div className="flex items-center justify-center w-full bg-primary h-9">
      <div className="container inline-flex justify-center">
        <Link href={announcementBar.url || "/"} target={announcementBar.target}>
          <h3 className="font-medium text-white font-poppins">
            {announcementBar.text}
          </h3>
        </Link>
      </div>
    </div>
  )
}
