import Link from 'next/link';

// ── Constants ─────────────────────────────────────────────────
const GITHUB_URL = 'https://github.com/YOUR_USERNAME/blender-mcp';
const GUMROAD_PRO = 'https://blendermcp.gumroad.com/l/pro';
const GUMROAD_LIFETIME = 'https://blendermcp.gumroad.com/l/lifetime';

const FEATURES = [
  {
    tag: 'Protocolo',
    title: 'MCP nativo sobre stdio',
    desc: 'Compatible con cualquier cliente MCP: Claude Desktop, Cursor, Windsurf, VS Code + Continue. Sin bridges, sin wrappers.',
    accent: 'flame',
    size: 'large',
  },
  {
    tag: 'Visión',
    title: 'GPT Vision Bridge',
    desc: 'Pasa una imagen de referencia. La IA genera la escena Blender completa.',
    accent: 'sky',
    size: 'small',
  },
  {
    tag: 'Seguridad',
    title: 'Thread-safe garantizado',
    desc: 'bpy.app.timers ejecuta en el main thread de Blender. Sin WinError 10054.',
    accent: 'violet',
    size: 'small',
  },
  {
    tag: 'Privacidad',
    title: 'BYOK — Tu clave, tus datos',
    desc: 'La API key nunca toca nuestros servidores.',
    accent: 'sky',
    size: 'small',
  },
  {
    tag: 'Velocidad',
    title: 'Batch operations',
    desc: 'Un solo execute_python con un loop supera 10 llamadas individuales.',
    accent: 'flame',
    size: 'small',
  },
  {
    tag: 'Resiliencia',
    title: 'Auto-save incremental',
    desc: 'Cada mutación genera scene_v1.blend, _v2... Sin pérdida de trabajo.',
    accent: 'violet',
    size: 'small',
  },
];

const STEPS = [
  { n: '01', title: 'Instala el addon', desc: 'Preferences → Add-ons → Install → activa MCP Bridge' },
  { n: '02', title: 'Inicia el servidor', desc: 'View3D → Sidebar → MCP → Iniciar Servidor (puerto 9876)' },
  { n: '03', title: 'Conecta tu IA', desc: 'Añade el servidor MCP a Claude Desktop o Cursor. Empieza a crear.' },
];

const PLANS = [
  {
    name: 'Community',
    price: 'Free',
    period: 'para siempre',
    features: ['Código fuente completo', 'Sin validación de licencia', '13 herramientas MCP', 'Soporte via Issues'],
    cta: { label: 'Ver en GitHub', href: GITHUB_URL, external: true, primary: false },
    featured: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: 'pago único',
    badge: 'Más popular',
    features: ['Binario precompilado (Win/Mac/Linux)', 'GPT Vision Bridge incluido', 'Actualizaciones de por vida', 'Soporte prioritario'],
    cta: { label: 'Comprar Pro', href: GUMROAD_PRO, external: true, primary: true },
    featured: true,
  },
  {
    name: 'Lifetime',
    price: '$79',
    period: 'acceso vitalicio',
    features: ['Todo lo de Pro', '3 activaciones de hardware', 'Acceso a versiones beta', 'Discord privado'],
    cta: { label: 'Comprar Lifetime', href: GUMROAD_LIFETIME, external: true, primary: false },
    featured: false,
  },
];

const DEMO = `# Claude controla Blender en tiempo real
blender_execute_python("""
import bpy, math

# Crear cubo con material emisivo
bpy.ops.mesh.primitive_cube_add(location=(0, 0, 0))
cube = bpy.context.active_object

mat = bpy.data.materials.new("Ember")
mat.use_nodes = True
emit = mat.node_tree.nodes.new('ShaderNodeEmission')
emit.inputs['Color'].default_value = (1.0, 0.37, 0.12, 1)
emit.inputs['Strength'].default_value = 6.0
cube.data.materials.append(mat)
""")

# Render al final — nunca en pasos intermedios
blender_render_image(samples=128, output_path="/tmp/scene.png")`;

// ── Nav ────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-border/60 bg-bg/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-display font-bold text-lg tracking-tight text-text-1">
            Blender<span className="text-flame">MCP</span>
          </span>
          <span className="hidden sm:inline text-xs font-mono text-text-3 border border-border px-2 py-0.5 rounded-md">
            v1.0.0
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Características', href: '#features' },
            { label: 'Cómo funciona', href: '#how' },
            { label: 'Precios', href: '#pricing' },
          ].map((l) => (
            <a key={l.label} href={l.href}
              className="text-sm text-text-2 hover:text-text-1 transition-colors font-medium">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/dashboard"
            className="btn-secondary text-sm px-4 py-2 rounded-lg hidden sm:block">
            Dashboard
          </Link>
          <a href={GUMROAD_PRO} target="_blank" rel="noreferrer"
            className="btn-primary text-sm px-4 py-2 rounded-lg">
            Comprar Pro →
          </a>
        </div>
      </div>
    </nav>
  );
}

// ── Hero ───────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative bg-hero bg-grid noise pt-32 pb-24 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_480px] gap-12 items-center">

          {/* Left: copy */}
          <div>
            <div className="badge-flame inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-mono font-medium mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-flame animate-glow-pulse" />
              Model Context Protocol — Open Standard
            </div>

            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight mb-6">
              <span className="text-text-1">Connect AI</span>
              <br />
              <span className="text-flame">to Blender 3D</span>
            </h1>

            <p className="text-text-2 text-lg sm:text-xl leading-relaxed max-w-md mb-10">
              Claude, GPT y Cursor controlan tu escena en tiempo real.
              El servidor MCP más completo para automatización 3D.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <a href={GUMROAD_PRO} target="_blank" rel="noreferrer"
                className="btn-primary px-6 py-3.5 rounded-xl text-sm font-semibold text-center">
                Comprar Pro — $29 →
              </a>
              <a href={GITHUB_URL} target="_blank" rel="noreferrer"
                className="btn-secondary px-6 py-3.5 rounded-xl text-sm font-medium text-center">
                Ver en GitHub (Community)
              </a>
            </div>

            <div className="flex items-center gap-6 text-xs text-text-3 font-mono">
              <span>✓ Windows · Mac · Linux</span>
              <span>✓ Pago único</span>
              <span>✓ Blender 3.0+</span>
            </div>
          </div>

          {/* Right: terminal */}
          <div className="code-block rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface/60">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full dot-red" />
                <div className="w-3 h-3 rounded-full dot-yellow" />
                <div className="w-3 h-3 rounded-full dot-green" />
              </div>
              <span className="text-xs text-text-3 font-mono ml-2 flex-1 text-center pr-8">
                claude → blender-mcp → blender:9876
              </span>
            </div>
            <pre className="p-5 text-xs font-mono text-sky/80 leading-relaxed overflow-x-auto">
              <code>{DEMO}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-bg to-transparent pointer-events-none" />
    </section>
  );
}

// ── Compatibility bar ──────────────────────────────────────────
function CompatBar() {
  const clients = ['Claude Desktop', 'Cursor IDE', 'Windsurf', 'VS Code + Continue', 'Cualquier cliente MCP'];
  return (
    <div className="border-y border-border bg-surface/40">
      <div className="max-w-6xl mx-auto px-6 py-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        <span className="text-xs font-mono text-text-3 uppercase tracking-widest mr-4">Compatible con</span>
        {clients.map((c) => (
          <span key={c} className="text-sm text-text-2 font-medium">{c}</span>
        ))}
      </div>
    </div>
  );
}

// ── Features ───────────────────────────────────────────────────
function Features() {
  const accentMap: Record<string, string> = {
    flame:  'text-flame border-flame/20 bg-flame/5',
    sky:    'text-sky border-sky/20 bg-sky/5',
    violet: 'text-violet border-violet/20 bg-violet/5',
  };
  const [large, ...small] = FEATURES;

  return (
    <section id="features" className="py-24 px-6 bg-surface-glow">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="text-xs font-mono text-text-3 uppercase tracking-widest mb-3">// Capacidades</p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-text-1 tracking-tight">
            Engineered for <span className="text-flame">3D artists</span>
            <br />
            <span className="text-text-2">and AI engineers</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Large card spans 2 cols */}
          <div className={`card rounded-2xl p-8 md:col-span-2 border ${accentMap[large.accent]}`}>
            <span className={`inline-block text-xs font-mono font-medium px-2 py-1 rounded-md mb-4 ${accentMap[large.accent]}`}>
              {large.tag}
            </span>
            <h3 className="font-display font-bold text-2xl text-text-1 mb-3">{large.title}</h3>
            <p className="text-text-2 leading-relaxed max-w-lg">{large.desc}</p>

            {/* Architecture diagram */}
            <div className="mt-8 flex items-center gap-3 font-mono text-sm flex-wrap">
              {['Claude / GPT', '──stdio──▶', 'MCP Server', '──TCP:9876──▶', 'Blender'].map((part, i) => (
                <span key={i}
                  className={i % 2 === 0 ? 'px-3 py-1.5 bg-bg rounded-lg border border-border text-text-2' : 'text-text-3'}>
                  {part}
                </span>
              ))}
            </div>
          </div>

          {/* Small cards */}
          {small.map((f) => (
            <div key={f.title} className={`card rounded-2xl p-6 border ${accentMap[f.accent]}`}>
              <span className={`inline-block text-xs font-mono font-medium px-2 py-1 rounded-md mb-4 ${accentMap[f.accent]}`}>
                {f.tag}
              </span>
              <h3 className="font-semibold text-text-1 mb-2">{f.title}</h3>
              <p className="text-text-2 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── How it works ───────────────────────────────────────────────
function HowItWorks() {
  return (
    <section id="how" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="text-xs font-mono text-text-3 uppercase tracking-widest mb-3">// Setup</p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-text-1 tracking-tight">
            Funcionando en <span className="text-flame">3 pasos</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {STEPS.map((step, i) => (
            <div key={step.n} className="relative flex gap-6 md:block md:pr-12">
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] right-0 h-px bg-gradient-to-r from-border to-transparent" />
              )}
              <div className="flex-shrink-0 md:mb-5">
                <span className="font-mono text-4xl font-bold text-flame/30 select-none">{step.n}</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-text-1 mb-2">{step.title}</h3>
                <p className="text-text-2 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Pricing ────────────────────────────────────────────────────
function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 bg-surface/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-mono text-text-3 uppercase tracking-widest mb-3">// Licencias</p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-text-1 tracking-tight mb-3">
            Elige tu plan
          </h2>
          <p className="text-text-2 text-sm font-mono">Pago único · Sin suscripciones · Sin sorpresas</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PLANS.map((plan) => (
            <div key={plan.name}
              className={`relative card rounded-2xl p-7 flex flex-col ${
                plan.featured ? 'border-flame/40 shadow-flame' : ''
              }`}>
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-flame text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-display font-bold text-xl text-text-1 mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-text-1 font-display">{plan.price}</span>
                  <span className="text-text-3 text-sm">{plan.period}</span>
                </div>
              </div>

              <hr className="border-border mb-6" />

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-text-2">
                    <span className="text-flame mt-0.5 flex-shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={plan.cta.href}
                target={plan.cta.external ? '_blank' : undefined}
                rel="noreferrer"
                className={`block text-center py-3 rounded-xl text-sm font-semibold transition-all ${
                  plan.cta.primary ? 'btn-primary' : 'btn-secondary border border-border'
                }`}
              >
                {plan.cta.label}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-border py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="font-display font-bold text-text-1">
          Blender<span className="text-flame">MCP</span>
        </span>
        <p className="text-text-3 text-xs font-mono order-last md:order-none">
          © 2025 BlenderMCP — Hecho para artistas e ingenieros de IA
        </p>
        <div className="flex gap-8">
          {[
            { label: 'GitHub', href: GITHUB_URL },
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Gumroad', href: GUMROAD_PRO },
          ].map((l) => (
            <a key={l.label} href={l.href}
              className="text-xs text-text-3 hover:text-flame transition-colors font-medium">
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ── Page ───────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <CompatBar />
        <Features />
        <HowItWorks />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
