# Design System — Stellantis Veículos (Montadora CMMS)
> Baseado no método do `design.md` (Fronteira AI / Felipe Barros)
> Referências de origem: Lusion.co, Stripe, Codrops, Awwwards, SuperCMMS, Fiix

---

## 1. Princípios Visuais Fundamentais
1. **Contrato de Verdade**: Toda decisão visual deve ser derivada deste documento. Proibido improvisar estilos genéricos ("cara de IA").
2. **Estética Industrial Dark-Tech**: Fundo ultraescuro (`#07080b`), cartões com profundidade vítrea e acentos de cor estritamente semânticos.
3. **Telemetria e Densidade de Dados**: Inspirado em CMMS fabris (Fiix / SuperCMMS), onde cada dado, status e métrica tem significado operacional.
4. **Microinterações com Física**: Iluminação por spotlight que segue o cursor do mouse (Lusion) e animações de shimmer discretas (Codrops).

---

## 2. Paleta de Cores & Tokens

| Token | Valor / Hex / RGBA | Uso Semântico |
|---|---|---|
| `canvas-bg` | `#080c14` | Fundo principal da aplicação (Dark Navy Industrial) |
| `card-bg` | `rgba(14, 20, 32, 0.75)` | Superfície dos cards com glassmorphism vítreo |
| `card-header` | `rgba(8, 12, 20, 0.88)` | Navbar fixa superior com blur de 24px |
| `border-subtle` | `rgba(255, 255, 255, 0.08)` | Bordas padrão de separação e contorno |
| `border-hover` | `rgba(0, 151, 220, 0.40)` | Realce de foco e hover com acento Fiix Blue |
| `text-primary` | `#f4f4f5` (zinc-100) | Títulos, métricas e textos principais |
| `text-muted` | `#a1a1aa` (zinc-400) | Subtítulos, labels e descrições |
| `text-subtle` | `#71717a` (zinc-500) | Microtextos, metadados e legendas |
| `accent-primary` | `#0097dc` (Fiix Blue) | CTAs, focus rings, status ativos e destaques |
| `accent-navy` | `#14499a` (Rockwell Navy) | Gradientes de botão, cabeçalhos de alta autoridade |
| `accent-cyan` | `#00aaef` (Fiix Bright Cyan) | Preços de tabela, indicadores elétricos e links |
| `accent-electric` | `#06b6d4` (cyan-500) | Veículos 100% Elétricos (BEV) |
| `accent-hybrid` | `#38bdf8` (sky-400) | Veículos Híbridos (HEV/PHEV) |
| `accent-success` | `#10b981` (emerald-500) | Status Em Produção, linha ativa e validações |
| `accent-danger` | `#ef4444` (rose-500) | Exclusão, descontinuação e alertas |

---

## 3. Tipografia & Escala

- **Família Sans**: `Inter`, `-apple-system`, `sans-serif` (legibilidade editorial)
- **Família Mono**: `JetBrains Mono`, `monospace` (dados numéricos, IDs, códigos e latência)

| Nível | Tamanho | Peso | Tracking | Uso |
|---|---|---|---|---|
| **Display KPI** | `30px / 1.875rem` | 800 (ExtraBold) | `-0.025em` | Números dos cards de KPI |
| **H1 Navbar** | `18px / 1.125rem` | 900 (Black) | `-0.035em` | Marca "STELLANTIS" |
| **Card Title** | `16px / 1rem` | 700 (Bold) | `-0.015em` | Nome do modelo do veículo |
| **Body** | `14px / 0.875rem` | 400 (Regular) | `normal` | Conteúdo do dossiê técnico |
| **UI Small** | `12px / 0.75rem` | 500 (Medium) | `normal` | Botões, inputs e cabeçalhos |
| **Micro Mono** | `11px / 0.6875rem` | 600 (SemiBold) | `+0.05em` | Tags, IDs (`#1`), latência e datas |

---

## 4. Espaçamento & Grid

- **Grid Base**: Sistema de 4px (`p-1` = 4px, `p-2` = 8px, `p-3` = 12px, `p-4` = 16px, `p-5` = 20px, `p-6` = 24px, `p-8` = 32px)
- **Grid Layout**:
  - KPIs: `grid-cols-2 lg:grid-cols-4 gap-4`
  - Catálogo: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
  - Largura Máxima: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

---

## 5. Raios de Borda (Border Radius)

- **Cards & Cockpit**: `rounded-2xl` (16px)
- **Modais & Diálogos**: `rounded-3xl` (24px)
- **Inputs & Botões**: `rounded-xl` (12px)
- **Badges & Pills**: `rounded-full` (9999px)
- **Micro Kbd / Tags**: `rounded-md` (6px)

---

## 6. Sombras & Profundidade

- **Card Base**: `0 4px 24px -1px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.02)`
- **Card Hover Glow**: `0 12px 36px -4px rgba(0, 0, 0, 0.5), 0 0 24px -2px rgba(99, 102, 241, 0.15)`
- **Modal Backdrop**: `bg-black/80 backdrop-blur-md`
- **Backdrop Blur dos Cards**: `20px`

---

## 7. Componentes e Padrões de Interface

### A. Spotlight Card (Lusion / Codrops)
- Superfície translúcida com listener de mouse.
- Gradiente radial de 450px que acompanha o cursor em `--mouse-x` e `--mouse-y`.
- Mascaramento em `-webkit-mask-composite: xor` para acender somente o contorno da borda.

### B. Shimmer Button (Codrops)
- Gradiente linear `indigo-500` → `violet-500` → `indigo-600` com `background-size: 200% 200%`.
- Animação suave `shimmerFlow 5s ease infinite`.
- Atalho de teclado `<kbd>N</kbd>` embutido no botão.

### C. Industrial Gauges (SuperCMMS / MaintainX / Fiix)
- Barras de telemetria para Autonomia (base 800 km) e Bateria (base 100 kWh).
- Transição de largura com curva `cubic-bezier(0.16, 1, 0.3, 1)`.

### D. Ficha Técnica / Dossiê (@tailwindcss/typography)
- Container estilizado com `prose prose-invert prose-zinc max-w-none`.
- Renderização de Markdown completo (especificações de powertrain, tempos de recarga, payloads REST JSON).

---

## 8. Microinterações & Atalhos Globais

| Ação | Atalho | Comportamento |
|---|---|---|
| Foco na Busca | `/` ou `⌘K` | Foca o campo de pesquisa sem scroll |
| Novo Veículo | `N` | Abre o formulário modal de cadastro |
| Fechar Diálogo | `ESC` | Fecha modais e dossiês abertos |
| Exportar Dados | Clique em `Exportar CSV` | Download instantâneo de planilha `.csv` |

