'use client'

import React, { useEffect } from 'react'

declare global {
  interface Window {
    ml: any
  }
}

const MailerLiteForm = () => {
  useEffect(() => {
    // Function to dynamically load the MailerLite script
    const loadMailerLiteScript = () => {
      const script = document.createElement('script')
      script.src = 'https://assets.mailerlite.com/js/universal.js'
      script.async = true
      document.body.appendChild(script)

      script.onload = () => {
        window.ml('account', '787573')
      }
    }

    // Load the script when the component mounts
    loadMailerLiteScript()
  }, [])

  return <div className="ml-embedded" data-form="AqQhWu"></div>
}

export default MailerLiteForm
