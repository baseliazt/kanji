// app/docs/page.tsx
"use client";

import { useEffect, useRef } from "react";
import SwaggerUI from "swagger-ui-dist/swagger-ui-es-bundle";
import "swagger-ui-dist/swagger-ui.css";

export default function SwaggerPage() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      SwaggerUI({
        domNode: ref.current,
        url: "/api/openapi",
      });
    }
  }, []);

  return <div ref={ref} />;
}
