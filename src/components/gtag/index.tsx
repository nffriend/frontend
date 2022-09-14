import Script from "next/script";

function GTA() {
  return (
    <div>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-3DQTDZHX2N"
        // strategy="afterInteractive"
      />
      <Script 
        id="google-analytics" 
        // strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); }
          gtag('js', new Date());
          gtag('config', 'G-3DQTDZHX2N');
        `}
      </Script>
    </div>
  );
}

export default GTA;
