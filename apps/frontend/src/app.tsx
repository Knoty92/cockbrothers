import { Suspense } from "solid-js";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";

export default function App() {
  return (
    <Router root={(props) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Cockbrothers</title>
        </head>
        <body>
          <Suspense>{props.children}</Suspense>
        </body>
      </html>
    )}>
      <FileRoutes />
    </Router>
  );
}
