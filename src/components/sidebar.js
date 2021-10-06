import React from 'react'

import { Jotai, Navigation } from '../components'

export const Sidebar = () => {
  return (
    <aside className="sticky top-0 hidden lg:flex flex-col flex-shrink-0 justify-between w-full max-w-md min-h-full h-full max-h-screen overflow-y-auto overscroll-none p-16 pb-8 pr-8">
      <div className="flex-grow">
        <Jotai />
        <Navigation
          className="flex flex-col mt-6 space-y-4"
          docsNavClassName="px-3"
        />
      </div>
      <a
        href="https://jessiewaters.com"
        target="_blank"
        title="Jessie Waters"
        className="block mt-6 text-xs text-gray-400 text-center tracking-widest uppercase">
        Artwork by Jessie Waters
      </a>
    </aside>
  )
}
