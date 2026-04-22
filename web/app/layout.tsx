import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Blender MCP — Control Blender con IA',
  description: 'Conecta Claude, GPT y Cursor a Blender 3D. El MCP server más avanzado para artistas 3D e ingenieros de IA.',
  keywords: ['blender', 'mcp', 'ai', 'claude', 'gpt', '3d', 'automation'],
  openGraph: {
    title: 'Blender MCP',
    description: 'Controla Blender con IA en tiempo real',
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
        {children}
      </body>
    </html>
  );
}
