import Script from 'next/script.js'

const googleAnalyticsTrackingId = 'G-KT4DGN4JQC'

export default function Tracking() {
  return (
    <>
      <Script
        id="_next-ga-init"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag() {
                window.dataLayer.push(arguments);
              }
              gtag('consent', 'default', {
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                analytics_storage: 'denied',
                functionality_storage: 'denied',
                personalization_storage: 'denied',
                security_storage: 'granted',
                wait_for_update: 2000,
              });
              gtag('set', 'ads_data_redaction', true);
              gtag('set', 'url_passthrough', true);
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsTrackingId}');
            `,
        }}
      />
      <Script
        id="_next-ga"
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsTrackingId}`}
      />
      <Script
        id="cookieyes"
        src="https://cdn-cookieyes.com/client_data/739849a5eac0f01ccbb5f5cd/script.js"
      />
    </>
  )
}
