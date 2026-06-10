'use client';
import { useEffect } from 'react';
import Script from 'next/script';

export default function GoogleReviews() {
  useEffect(() => {
    const containerId = "JFWebsiteWidget-019d7bc2c0b3747ebcdd33f78f7d1c561170";
    const container = document.getElementById(containerId);

    if (container && container.children.length === 0) {
      const script = document.createElement('script')
      script.src = "https://www.jotform.com/website-widgets/embed/019d7bc2c0b3747ebcdd33f78f7d1c561170"
      script.async = true
      script.id = "jotform-widget-script" 
      document.body.appendChild(script)
    }

    return () => {
      const existingScript = document.getElementById("jotform-widget-script");
      if (existingScript) {
        existingScript.remove();
      }
      
      if (container) {
        container.innerHTML = "";
      }
    }
  }, [])

  return (
    <section className="py-10 bg-gray" style={{ borderBottom: '3px solid #00000014' }}>
      {/* <h2 className="font-bold text-center mb-6 text-white">Testimoniale</h2> */}
      {/* The widget container */}
      <div id="JFWebsiteWidget-019d7bc2c0b3747ebcdd33f78f7d1c561170"></div>
    </section>
  );
}
