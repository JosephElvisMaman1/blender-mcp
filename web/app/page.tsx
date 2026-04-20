import Link from 'next/link';

// ── Datos estáticos ───────────────────────────────────────────
const FEATURES = [
  {
    icon: '⚡',
    title: 'Control en tiempo real',
    desc: 'Envía código Python a Blender al instante vía socket TCP. Sin plugins intermediarios.',
    color: 'matrix',
  },
  {
    icon: '🧠',
    title: 'GPT Vision Bridge',
    desc: 'Pasa una imagen de referencia y la IA genera automáticamente la escena en Blender.',
    color: 'cyber',
  },
  {
    icon: '🔐',
    title: 'BYOK — Tu clave, tus datos',
    desc: 'La OpenAI API key se almacena solo en tu máquina. Nunca toca nuestros servidores.',
    color: 'neon',
  },
  {
    icon: '🛡️',
    title: 'Thread-safe garantizado',
    desc: 'Arquitectura con bpy.app.timers. Sin crashes de contexto ni WinError 10054.',
    color: 'matrix',
  },
  {
    icon: '💾',
    title: 'Auto-save incremental',
    desc: 'Cada operación mutante genera un backup automático: scene_v1.blend, _v2, _v3…',
    color: 'cyber',
  },
  {
    icon: '🚀',
    title: 'Compatible con todo',
    desc: 'Claude Desktop, Cursor, Windsurf, VS Code. Cualquier cliente MCP funciona.',
    color: 'neon',
  },
];

const PLANS = [
  {
    name: 'Community',
    price: 'Gratis',
    sub: 'Para siempre',
    color: 'border-gray-800',
    cta: { label: 'Ver en GitHub', href: 'https://github.com/YOUR_USERNAME/blender-mcp', outline: true },
    features: [
      'Código fuente completo',
      'Sin validación de licencia',
      'Soporte via Issues',
      '13 herramientas MCP',
    ],
  },
  {
    name: 'Pro',
    price: '$29',
    sub: 'pago único',
    color: 'border-matrix/40',
    badge: 'MÁS POPULAR',
    glow: true,
    cta: { label: 'Comprar Pro →', href: 'https://blendermcp.gumroad.com', outline: false },
    features: [
      'Binario precompilado (Win/Mac/Linux)',
      'GPT Vision Bridge incluido',
      'Actualizaciones de por vida',
      'Soporte prioritario',
    ],
  },
  {
    name: 'Lifetime',
    price: '$79',
    sub: 'acceso vitalicio',
    color: 'border-cyber/30',
    cta: { label: 'Comprar Lifetime →', href: 'https://blendermcp.gumroad.com', outline: false },
    features: [
      'Todo lo de Pro',
      '3 activaciones de hardware',
      'Acceso a versiones beta',
      'Acceso a Discord privado',
    ],
  },
];

const DEMO_CODE = `# Claude controla Blender en tiempo real
blender_execute_python("""
import bpy, math

# Crear cubo y aplicar material emisivo
bpy.ops.mesh.primitive_cube_add(location=(0,0,0))
cube = bpy.context.active_object
mat = bpy.data.materials.new("CyberGlow")
mat.use_nodes = True
emission = mat.node_tree.nodes.new('ShaderNodeEmission')
emission.inputs['Color'].default_value = (0, 1, 0.25, 1)
emission.inputs['Strength'].default_value = 5.0
cube.data.materials.append(mat)
""")

# Render automático al final
blender_render_image(samples=128, output_path="/tmp/scene.png")`;

// ── Componentes Server ────────────────────────────────────────
function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-matrix/10 bg-dark/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-matrix font-mono font-bold text-lg tracking-widest text-glow-matrix">
            BLENDER<span className="text-cyber">MCP</span>
          </span>
          <span className="text-xs text-gray-600 font-mono border border-gray-800 px-2 py-0.5 rounded">
            v1.0.0
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['Características', 'Precios', 'Docs'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm text-gray-400 hover:text-matrix transition-colors font-mono"
            >
              {item}
            </a>
          ))}
        </div>
        <Link
          href="/dashboard"
          className="text-sm font-mono font-bold px-4 py-2 border border-matrix/40 text-matrix rounded hover:bg-matrix/10 hover:border-matrix transition-all"
        >
          Dashboard →
        </Link>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-grid overflow-hidden pt-20">
      {/* Fondo glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-matrix/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-cyber/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-matrix/30 rounded-full px-4 py-1.5 mb-8 bg-matrix/5">
          <span className="w-2 h-2 rounded-full bg-matrix animate-pulse" />
          <span className="text-matrix text-xs font-mono tracking-widest">PROTOCOLO MCP ACTIVO</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold font-mono leading-tight mb-6">
          <span className="text-white">Controla</span>{' '}
          <span className="text-matrix text-glow-matrix">Blender</span>
          <br />
          <span className="text-white">con</span>{' '}
          <span className="text-cyber text-glow-cyber">Inteligencia Artificial</span>
        </h1>

        <p className="text-gray-400 text-xl md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed">
          El servidor MCP más avanzado para Blender 3D.
          Conecta <span className="text-white">Claude</span>,{' '}
          <span className="text-white">GPT</span> y{' '}
          <span className="text-white">Cursor</span> directamente a tu escena.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a
            href="https://blendermcp.gumroad.com"
            className="px-8 py-4 bg-matrix text-black font-bold font-mono text-sm rounded-lg hover:bg-matrix/90 transition-all shadow-matrix"
          >
            COMPRAR PRO — $29 →
          </a>
          <a
            href="https://github.com/YOUR_USERNAME/blender-mcp"
            className="px-8 py-4 border border-gray-700 text-gray-300 font-mono text-sm rounded-lg hover:border-matrix/50 hover:text-matrix transition-all"
            target="_blank" rel="noreferrer"
          >
            Ver en GitHub (Community)
          </a>
        </div>

        {/* Terminal demo */}
        <div className="max-w-3xl mx-auto card-cyber rounded-xl overflow-hidden text-left">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-matrix/10 bg-black/40">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-matrix/70" />
            </div>
            <span className="text-xs text-gray-500 font-mono ml-2">claude → blender-mcp → blender</span>
          </div>
          <pre className="p-6 text-sm font-mono text-matrix/80 overflow-x-auto leading-relaxed">
            <code>{DEMO_CODE}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const colorMap: Record<string, string> = {
    matrix: 'text-matrix border-matrix/20 bg-matrix/5 hover:border-matrix/50',
    cyber:  'text-cyber  border-cyber/20  bg-cyber/5  hover:border-cyber/50',
    neon:   'text-neon   border-neon/20   bg-neon/5   hover:border-neon/50',
  };
  return (
    <section id="características" className="py-24 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-matrix font-mono text-sm tracking-widest mb-3">// CAPACIDADES</p>
          <h2 className="text-4xl font-bold text-white">
            Engineered for <span className="text-matrix">3D Artists</span> & <span className="text-cyber">AI Engineers</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className={`p-6 rounded-xl border transition-all duration-300 ${colorMap[f.color]}`}>
              <span className="text-3xl mb-4 block">{f.icon}</span>
              <h3 className="font-bold text-white text-lg mb-2 font-mono">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CompatibilitySection() {
  const tools = [
    { name: 'Claude Desktop', icon: '◆', color: 'text-orange-400' },
    { name: 'Cursor IDE', icon: '⊕', color: 'text-cyber' },
    { name: 'Windsurf', icon: '◈', color: 'text-purple-400' },
    { name: 'VS Code + Continue', icon: '⬡', color: 'text-blue-400' },
    { name: 'Terminal / CLI', icon: '▸', color: 'text-matrix' },
    { name: 'Cualquier cliente MCP', icon: '∞', color: 'text-gray-400' },
  ];
  return (
    <section className="py-16 px-6 border-y border-matrix/10">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-gray-500 font-mono text-xs tracking-widest mb-8">
          // COMPATIBLE CON TU STACK ACTUAL
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {tools.map((t) => (
            <div key={t.name} className="flex items-center gap-2 text-sm font-mono">
              <span className={`${t.color} text-lg`}>{t.icon}</span>
              <span className="text-gray-400">{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="precios" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-matrix font-mono text-sm tracking-widest mb-3">// LICENCIAS</p>
          <h2 className="text-4xl font-bold text-white">Elige tu plan</h2>
          <p className="text-gray-500 mt-3 font-mono text-sm">Pago único. Sin suscripciones. Sin sorpresas.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-8 rounded-xl border ${plan.color} bg-surface transition-all duration-300 ${
                plan.glow ? 'shadow-matrix' : ''
              } hover:scale-[1.02]`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-matrix text-black text-xs font-bold font-mono px-3 py-1 rounded-full">
                  {plan.badge}
                </div>
              )}
              <h3 className="font-bold text-white text-xl font-mono mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-bold text-white">{plan.price}</span>
                <span className="text-gray-500 text-sm font-mono">{plan.sub}</span>
              </div>
              <hr className="border-gray-800 my-5" />
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-matrix mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={plan.cta.href}
                target={plan.cta.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className={`block text-center py-3 rounded-lg font-mono font-bold text-sm transition-all ${
                  plan.cta.outline
                    ? 'border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'
                    : 'bg-matrix text-black hover:bg-matrix/90 shadow-matrix'
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

function FooterSection() {
  return (
    <footer className="border-t border-matrix/10 py-10 px-6 bg-surface">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono text-matrix font-bold">BLENDER<span className="text-cyber">MCP</span></span>
        <p className="text-gray-600 text-xs font-mono">
          © 2025 BlenderMCP. Hecho para artistas e ingenieros IA.
        </p>
        <div className="flex gap-6">
          {[
            { label: 'GitHub', href: 'https://github.com/YOUR_USERNAME/blender-mcp' },
            { label: 'Docs', href: '/docs' },
            { label: 'Dashboard', href: '/dashboard' },
          ].map((l) => (
            <a key={l.label} href={l.href} className="text-xs text-gray-500 hover:text-matrix font-mono transition-colors">
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ── Page principal (Server Component) ────────────────────────
export default function HomePage() {
  return (
    <>
      <div className="scan-line" />
      <NavBar />
      <HeroSection />
      <CompatibilitySection />
      <FeaturesSection />
      <PricingSection />
      <FooterSection />
    </>
  );
}
