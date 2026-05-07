import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en" class="h-full">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Cockbrothers - AI-powered brand kit generator & mockup studio for print-on-demand" />
          <meta name="theme-color" content="#6366f1" />

          {/* Open Graph */}
          <meta property="og:title" content="Cockbrothers - Brand Kit Generator" />
          <meta property="og:description" content="AI-powered brand kit generator & mockup studio for print-on-demand entrepreneurs." />
          <meta property="og:type" content="website" />

          {/* Preconnect to fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <title>Cockbrothers - Brand Kit Generator & Mockup Studio</title>
          {assets}
        </head>
        <body class="h-full">
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
