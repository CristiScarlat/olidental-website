'use client'

import Script from 'next/script'

export default function GoogleReviews() {
  return (
    <section className="py-10 bg-gray" style={{borderBottom: "3px solid #00000014"}}>
      {/* <h2 className="font-bold text-center mb-6 text-white">Testimoniale</h2> */}

      {/* PASTE THE DIV HERE */}
      <div id="JFWebsiteWidget-019d7bc2c0b3747ebcdd33f78f7d1c561170"></div>

      {/* CONVERT THE SCRIPT TAG TO THIS: */}
      <Script 
        src="https://www.jotform.com/website-widgets/embed/019d7bc2c0b3747ebcdd33f78f7d1c561170"
        strategy="afterInteractive" 
      />
    </section>
  )
}