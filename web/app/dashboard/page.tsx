import Link from 'next/link';

const GITHUB_USER = 'YOUR_USERNAME';
const RELEASE_BASE = `https://github.com/${GITHUB_USER}/blender-mcp/releases/download/v1.0.0`;

const DOWNLOADS = [
  {
    os: 'Windows',
    icon: '⊞',
    file: 'blender-mcp-win.exe',
    desc: 'Windows 10/11 — x64',
    url: `${RELEASE_BASE}/blender-mcp-win.exe`,
    accent: 'sky',
  },
  {
    os: 'macOS',
    icon: '',
    file: 'blender-mcp-mac',
    desc: 'macOS 12+ — Intel & Apple Silicon',
    url: `${RELEASE_BASE}/blender-mcp-mac`,
    accent: 'text-1',
  },
  {
    os: 'Linux',
    icon: '🐧',
    file: 'blender-mcp-linux',
    desc: 'Ubuntu 20.04+ — x64',
    url: `${RELEASE_BASE}/blender-mcp-linux`,
    accent: 'flame',
  },
];

const SETUP_STEPS = [
  { step: '1', title: 'Instala el addon', body: 'Blender → Edit → Preferences → Add-ons → Install → selecciona addon/__init__.py → activa "MCP Bridge"' },
  { step: '2', title: 'Inicia el servidor en Blender', body: 'View3D → Sidebar → MCP → Iniciar Servidor (puerto 9876)' },
  { step: '3', title: 'Ejecuta el binario', body: 'Abre una terminal y corre el binario descargado. Introduce tu license key cuando se solicite.' },
  { step: '4', title: 'Conecta tu cliente MCP', body: 'Agrega el servidor a Claude Desktop, Cursor o Windsurf. El servidor se detecta automáticamente.' },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-bg">

      {/* Header */}
      <header className="border-b border-border bg-surface/60 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-display font-bold text-text-1 hover:text-flame transition-colors">
            Blender<span className="text-flame">MCP</span>
          </Link>
          <span className="text-xs font-mono text-text-3 border border-border px-2.5 py-1 rounded-md">
            v1.0.0
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16 space-y-16">

        {/* Welcome */}
        <section>
          <p className="text-xs font-mono text-text-3 uppercase tracking-widest mb-3">// Dashboard</p>
          <h1 className="font-display font-bold text-4xl text-text-1 tracking-tight mb-2">
            Bienvenido a BlenderMCP
          </h1>
          <p className="text-text-2">Descarga el binario para tu sistema y sigue los pasos de configuración.</p>
        </section>

        {/* Downloads */}
        <section>
          <h2 className="font-display font-semibold text-xl text-text-1 mb-5">Descargar binario</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {DOWNLOADS.map((d) => (
              <a
                key={d.os}
                href={d.url}
                className="card rounded-2xl p-6 flex flex-col gap-4 group no-underline"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{d.icon}</span>
                  <span className="text-xs font-mono text-text-3 group-hover:text-flame transition-colors">
                    Descargar ↓
                  </span>
                </div>
                <div>
                  <p className="font-display font-bold text-text-1 text-lg">{d.os}</p>
                  <p className="text-xs text-text-3 font-mono mt-1">{d.desc}</p>
                </div>
                <div className="mt-auto pt-4 border-t border-border">
                  <span className="text-xs font-mono text-text-3 truncate block">{d.file}</span>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-4 p-4 rounded-xl bg-surface border border-border">
            <p className="text-xs text-text-3 font-mono">
              <span className="text-flame">nota:</span> El addon de Blender (
              <span className="text-sky">addon/__init__.py</span>) está disponible en el repositorio GitHub.
              Es necesario instalarlo en Blender antes de iniciar el servidor.
            </p>
          </div>
        </section>

        {/* License activation */}
        <section>
          <h2 className="font-display font-semibold text-xl text-text-1 mb-2">Activar licencia</h2>
          <p className="text-text-2 text-sm mb-6">
            Al ejecutar el binario por primera vez, se te pedirá tu license key de Gumroad.
            La activación vincula el binario a tu hardware — no necesitas hacer nada aquí.
          </p>

          <div className="card rounded-2xl p-6 border-flame/20 bg-flame/5">
            <div className="flex items-start gap-4">
              <span className="text-flame text-lg mt-0.5">⚡</span>
              <div>
                <p className="font-semibold text-text-1 mb-1">Activación automática en primer arranque</p>
                <p className="text-sm text-text-2 leading-relaxed">
                  El binario detecta tu hardware ID (SHA-256 del MAC address) y lo vincula a tu license key.
                  Si cambias de equipo, contacta soporte para transferir la licencia.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Setup steps */}
        <section>
          <h2 className="font-display font-semibold text-xl text-text-1 mb-6">Configuración</h2>
          <div className="space-y-0">
            {SETUP_STEPS.map((s, i) => (
              <div key={s.step} className="flex gap-6 relative">
                {/* Vertical connector */}
                {i < SETUP_STEPS.length - 1 && (
                  <div className="absolute left-5 top-10 bottom-0 w-px bg-border" />
                )}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center relative z-10">
                  <span className="text-sm font-mono font-bold text-flame">{s.step}</span>
                </div>
                <div className="pb-8">
                  <p className="font-semibold text-text-1 mb-1.5">{s.title}</p>
                  <p className="text-text-2 text-sm leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Community */}
        <section className="card rounded-2xl p-8 text-center">
          <p className="font-display font-bold text-2xl text-text-1 mb-2">Versión Community</p>
          <p className="text-text-2 text-sm mb-6 max-w-sm mx-auto">
            Clona el repositorio y ejecuta <span className="font-mono text-sky text-xs bg-surface px-1.5 py-0.5 rounded">python src/server.py</span> directamente.
            Sin binario, sin licencia.
          </p>
          <a
            href={`https://github.com/${GITHUB_USER}/blender-mcp`}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary inline-block px-6 py-3 rounded-xl text-sm font-medium border border-border"
          >
            Ver en GitHub
          </a>
        </section>

      </main>

      <footer className="border-t border-border py-8 px-6 mt-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-text-3 text-xs font-mono">© 2025 BlenderMCP</span>
          <Link href="/" className="text-xs text-text-3 hover:text-flame transition-colors">
            ← Volver al inicio
          </Link>
        </div>
      </footer>
    </div>
  );
}
