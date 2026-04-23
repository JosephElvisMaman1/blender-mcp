export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];

export const translations = {
  en: {
    meta: {
      title: 'Blender MCP — Control Blender with AI',
      description: 'Connect Claude, GPT and Cursor to Blender 3D. Advanced academic research in MCP automation.',
    },
    nav: {
      features: 'Features',
      howItWorks: 'How it works',
      pricing: 'Pricing',
      dashboard: 'Dashboard',
      buyPro: 'Buy Pro →',
    },
    hero: {
      ctaPrimary: 'Buy Pro — $29 →',
      ctaSecondary: 'Academic Version — GitHub →',
      subtitle: 'Claude, GPT and Cursor control your scene in real time. The most complete MCP server for 3D automation.',
    },
    features: {
      eyebrow: '// Capabilities',
      h2Line1: 'Engineered for 3D artists',
      h2Line2: 'and AI engineers',
    },
    how: {
      eyebrow: '// Setup',
      h2: 'Running in',
      h2Accent: '3 steps',
      steps: [
        { n: '01', title: 'Install the addon', desc: 'Preferences → Add-ons → Install → activate MCP Bridge' },
        { n: '02', title: 'Start the server', desc: 'View3D → Sidebar → MCP → Start Server (port 9876)' },
        { n: '03', title: 'Connect your AI', desc: 'Add the MCP server to Claude Desktop or Cursor. Start creating.' },
      ],
    },
    pricing: {
      eyebrow: '// Licenses',
      h2: 'Choose your plan',
      sub: 'One-time payment · No subscriptions · No surprises',
    },
    footer: {
      tagline: '© 2025 BlenderMCP — Built for 3D artists and AI engineers',
    },
    dashboard: {
      eyebrow: '// Dashboard',
      h1: 'Welcome to BlenderMCP',
      subtitle: 'Download the binary for your system and follow the setup steps.',
      downloadTitle: 'Download binary',
      addonCalloutTitle: 'The Blender addon is exclusively bundled in the .zip download.',
      addonCalloutBody: 'Complete the installation guide before server initialization. The addon is not available separately — it is an integral part of the licensed package.',
      licenseTitle: 'Activate license',
      licenseSubtitle: 'When running the binary for the first time, you will be prompted for your Gumroad license key. Activation binds the binary to your hardware — no action needed here.',
      licenseCardTitle: 'Automatic activation on first run',
      licenseCardBody: 'The binary detects your hardware ID (SHA-256 of MAC address) and binds it to your license key. If you change devices, contact support to transfer your license.',
      setupTitle: 'Setup',
      disclosureEyebrow: '// Engineering Research Disclosure',
      disclosureH2: 'Advanced academic research project',
      disclosureBody: 'BlenderMCP is the result of applied research at the intersection of Model Context Protocol, 3D automation and multimodal AI systems. Revenue generated directly funds the continued development of open-source AI tools.',
      disclosureByok: 'The BYOK (Bring Your Own Key) architecture ensures that no user API key is ever transmitted to our servers. Your privacy and data sovereignty are fundamental principles, not optional features.',
      backHome: '← Back to home',
      setupSteps: [
        { step: '1', title: 'Install the addon', body: 'Blender → Edit → Preferences → Add-ons → Install → select the .py file included in your .zip package → activate "MCP Bridge"' },
        { step: '2', title: 'Start the server in Blender', body: 'View3D → Sidebar → MCP → Start Server (port 9876)' },
        { step: '3', title: 'Run the binary', body: 'Open a terminal and run the downloaded binary. Enter your license key when prompted.' },
        { step: '4', title: 'Connect your MCP client', body: 'Add the server to Claude Desktop, Cursor or Windsurf. The server is auto-detected.' },
      ],
    },
  },
  es: {
    meta: {
      title: 'Blender MCP — Controla Blender con IA',
      description: 'Conecta Claude, GPT y Cursor a Blender 3D. Investigación académica aplicada en automatización MCP.',
    },
    nav: {
      features: 'Características',
      howItWorks: 'Cómo funciona',
      pricing: 'Precios',
      dashboard: 'Dashboard',
      buyPro: 'Comprar Pro →',
    },
    hero: {
      ctaPrimary: 'Comprar Pro — $29 →',
      ctaSecondary: 'Versión Académica — GitHub →',
      subtitle: 'Claude, GPT y Cursor controlan tu escena en tiempo real. El servidor MCP más completo para automatización 3D.',
    },
    features: {
      eyebrow: '// Capacidades',
      h2Line1: 'Diseñado para artistas 3D',
      h2Line2: 'e ingenieros de IA',
    },
    how: {
      eyebrow: '// Setup',
      h2: 'Funcionando en',
      h2Accent: '3 pasos',
      steps: [
        { n: '01', title: 'Instala el addon', desc: 'Preferences → Add-ons → Install → activa MCP Bridge' },
        { n: '02', title: 'Inicia el servidor', desc: 'View3D → Sidebar → MCP → Iniciar Servidor (puerto 9876)' },
        { n: '03', title: 'Conecta tu IA', desc: 'Añade el servidor MCP a Claude Desktop o Cursor. Empieza a crear.' },
      ],
    },
    pricing: {
      eyebrow: '// Licencias',
      h2: 'Elige tu plan',
      sub: 'Pago único · Sin suscripciones · Sin sorpresas',
    },
    footer: {
      tagline: '© 2025 BlenderMCP — Hecho para artistas e ingenieros de IA',
    },
    dashboard: {
      eyebrow: '// Dashboard',
      h1: 'Bienvenido a BlenderMCP',
      subtitle: 'Descarga el binario para tu sistema y sigue los pasos de configuración.',
      downloadTitle: 'Descargar binario',
      addonCalloutTitle: 'El addon de Blender está incluido exclusivamente en el paquete .zip de descarga.',
      addonCalloutBody: 'Completa la guía de instalación antes de iniciar el servidor MCP. El addon no está disponible por separado — es parte integral del paquete licenciado.',
      licenseTitle: 'Activar licencia',
      licenseSubtitle: 'Al ejecutar el binario por primera vez, se te pedirá tu license key de Gumroad. La activación vincula el binario a tu hardware — no necesitas hacer nada aquí.',
      licenseCardTitle: 'Activación automática en primer arranque',
      licenseCardBody: 'El binario detecta tu hardware ID (SHA-256 del MAC address) y lo vincula a tu license key. Si cambias de equipo, contacta soporte para transferir la licencia.',
      setupTitle: 'Configuración',
      disclosureEyebrow: '// Engineering Research Disclosure',
      disclosureH2: 'Proyecto de investigación académica avanzada',
      disclosureBody: 'BlenderMCP es el resultado de investigación aplicada en la intersección de Model Context Protocol, automatización 3D y sistemas de IA multimodal. Los ingresos generados financian directamente el desarrollo continuo de herramientas de IA de código abierto.',
      disclosureByok: 'La arquitectura BYOK (Bring Your Own Key) garantiza que ninguna API key de usuario sea transmitida a nuestros servidores. Tu privacidad y soberanía sobre tus datos son principios fundamentales, no características opcionales.',
      backHome: '← Volver al inicio',
      setupSteps: [
        { step: '1', title: 'Instala el addon', body: 'Blender → Edit → Preferences → Add-ons → Install → selecciona el archivo .py incluido en tu paquete .zip → activa "MCP Bridge"' },
        { step: '2', title: 'Inicia el servidor en Blender', body: 'View3D → Sidebar → MCP → Iniciar Servidor (puerto 9876)' },
        { step: '3', title: 'Ejecuta el binario', body: 'Abre una terminal y corre el binario descargado. Introduce tu license key cuando se solicite.' },
        { step: '4', title: 'Conecta tu cliente MCP', body: 'Agrega el servidor a Claude Desktop, Cursor o Windsurf. El servidor se detecta automáticamente.' },
      ],
    },
  },
} as const;

export type Translations = typeof translations.es;
