"use client";

import { Provider } from "@/features/chakra/provider";
import { Toaster } from "@/features/chakra/toaster";
import { SiteHeader } from "@/features/shared";
import { queryClient } from "@/features/shared/query-client";
import { Box } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body>
        <QueryClientProvider client={queryClient}>
          <Provider>
            <Box maxW="900px" margin="0 auto">
              <SiteHeader />
              {children}
            </Box>
            <Toaster />
          </Provider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
