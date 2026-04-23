'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';

const GITHUB_USER = 'JoSeph_MM';
const RELEASE_BASE = `https://github.com/JosephElvisMaman1/blender-mcp/releases/download/v1.0.0`;

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

export default function DashboardPage() {
  const { t } = useI18n();

  const SETUP_STEPS = [
    { step: '1', title: t.dashboard.setupSteps[0].title, body: t.dashboard.setupSteps[0].body },
    { step: '2', title: t.dashboard.setupSteps[1].title, body: t.dashboard.setupSteps[1].body },
    { step: '3', title: t.dashboard.setupSteps[2].title, body: t.dashboard.setupSteps[2].body },
    { step: '4', title: t.dashboard.setupSteps[3].title, body: t.dashboard.setupSteps[3].body },
  ];

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
          <p className="text-xs font-mono text-text-3 uppercase tracking-widest mb-3">{t.dashboard.eyebrow}</p>
          <h1 className="font-display font-bold text-4xl text-text-1 tracking-tight mb-2">
            {t.dashboard.h1}
          </h1>
          <p className="text-text-2">{t.dashboard.subtitle}</p>
        </section>

        {/* Downloads */}
        <section>
          <h2 className="font-display font-semibold text-xl text-text-1 mb-5">{t.dashboard.downloadTitle}</h2>
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

          <div className="mt-4 p-5 rounded-xl border border-amber-500/40 bg-amber-500/5 flex items-start gap-4">
            <span className="text-amber-400 text-xl flex-shrink-0 mt-0.5">⚠</span>
            <div>
              <p className="font-semibold text-amber-300 mb-1 text-sm">
                {t.dashboard.addonCalloutTitle}
              </p>
              <p className="text-xs text-text-3 leading-relaxed">
                {t.dashboard.addonCalloutBody}
              </p>
            </div>
          </div>
        </section>

        {/* License activation */}
        <section>
          <h2 className="font-display font-semibold text-xl text-text-1 mb-2">{t.dashboard.licenseTitle}</h2>
          <p className="text-text-2 text-sm mb-6">
            {t.dashboard.licenseSubtitle}
          </p>

          <div className="card rounded-2xl p-6 border-flame/20 bg-flame/5">
            <div className="flex items-start gap-4">
              <span className="text-flame text-lg mt-0.5">⚡</span>
              <div>
                <p className="font-semibold text-text-1 mb-1">{t.dashboard.licenseCardTitle}</p>
                <p className="text-sm text-text-2 leading-relaxed">
                  {t.dashboard.licenseCardBody}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Setup steps */}
        <section>
          <h2 className="font-display font-semibold text-xl text-text-1 mb-6">{t.dashboard.setupTitle}</h2>
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

        {/* Research Disclosure */}
        <section className="card rounded-2xl p-8 border border-violet/20 bg-violet/5">
          <div className="flex items-start gap-4">
            <span className="text-violet text-xl mt-0.5 flex-shrink-0">🔬</span>
            <div>
              <p className="text-xs font-mono text-text-3 uppercase tracking-widest mb-2">
                {t.dashboard.disclosureEyebrow}
              </p>
              <h2 className="font-display font-bold text-xl text-text-1 mb-3">
                {t.dashboard.disclosureH2}
              </h2>
              <p className="text-text-2 text-sm leading-relaxed mb-3">
                {t.dashboard.disclosureBody}
              </p>
              <p className="text-text-3 text-xs leading-relaxed">
                {t.dashboard.disclosureByok}
              </p>
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t border-border py-8 px-6 mt-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-text-3 text-xs font-mono">© 2025 BlenderMCP</span>
          <Link href="/" className="text-xs text-text-3 hover:text-flame transition-colors">
            {t.dashboard.backHome}
          </Link>
        </div>
      </footer>
    </div>
  );
}
