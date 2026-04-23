import type { Metadata } from 'next';
import './globals.css';
import { I18nProvider } from '@/lib/i18n/context';

export const metadata: Metadata = {
  title: {
    default: 'Blender MCP — Control Blender with AI',
    template: '%s | BlenderMCP',
  },
  description: 'Connect Claude, GPT and Cursor to Blender 3D. Advanced academic research in MCP automation.',
  keywords: ['blender', 'mcp', 'ai', 'claude', 'gpt', '3d', 'automation', 'byok', 'academic'],
  openGraph: {
    title: 'Blender MCP',
    description: 'Control Blender with AI in real time',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg text-text-1 font-sans antialiased overflow-x-hidden">
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
