# BIBO Internship Progress Report — Jack · 3D Creator Portfolio + Boomerang Landing

**🌐 线上地址：<https://2497436958-code.github.io/>**（GitHub Pages）

> 我在 **BIBO（毕博）** 第一段实习期间完成的 Web 端交付物。
> 一个 React 单页作品集（"Jack · 3D Creator"），以及配套的 `/boomerang` 营销落地页（"Boomerang · Conversational AI"）。

## 项目背景

这是我在 BIBO（毕博）实习期间作为前端交付物完成的项目，旨在把公司的两个对外页面统一收敛到一套 React + Vite 工程里：

整站是一个单页应用（无客户端路由），按章节依次为：

1. **Hero** — 编辑式首屏，背景视频 + 磁吸肖像（magnet）
2. **Brand** — BIBO Intelligence 品牌揭幕，6 张 Agent 概念卡
3. **Boomerang** — Conversational AI 营销区块，白底 + 视频帧采样回放（Canvas ping-pong）
4. **Terminal** — Agent 系统控制台（见下节）
5. **Projects** — 5 个 3D 项目文件夹画廊 + 截图查看器
6. **Contact** — 页脚

锚点：`#brand` / `#boomerang` / `#terminal` / `#projects` / `#contact`

两套页面共享一套设计 token（近黑色 `#0C0C0C` / 冷灰白 `#D7E2EA`、Kanit / Inter / P22 Mackinac 字体）和一套动画原语（Framer Motion）。

## 技术栈

| 层 | 选型 |
|---|---|
| 框架 | **React 19 + TypeScript** |
| 构建 | **Vite 8** |
| 样式 | **Tailwind CSS 4** + 原生 CSS |
| 动画 | **Framer Motion**（`useScroll` + `useTransform` 驱动 sticky scroll chapters；magnet 磁吸；fade-in / marquee）|
| 测试 | **Vitest** + `@testing-library/react` |
| 字体 | Google Fonts（Inter、Noto Serif SC）+ OnlineWebFonts（P22 Mackinac）|

## 仓库结构

```
.
├── index.html                    # Vite 入口
├── package.json                  # name: jack-3d-creator-portfolio
├── pnpm-lock.yaml                # pnpm 锁定
├── vite.config.ts                # Vite 配置（带 @vitejs/plugin-react、@tailwindcss/vite）
├── tailwind.config.ts            # Tailwind v4 配置
├── tsconfig*.json                # TS 工程配置
├── postcss.config.cjs
├── public/                       # 直接被 Vite 复制到根路径的静态资源
│   ├── bibo-building-logo.jpg
│   ├── bibo-industrial.html
│   ├── bibo-logo.jpg
│   ├── boomerang-background.mp4  # /boomerang 视频背景（10MB）
│   ├── hero-background.mp4       # ⚠ 见 Asset Note（不在仓库里）
│   ├── jack-hero.mp4             # 主页肖像视频（3.7MB）
│   └── projects/                 # 项目画廊截图（5 个项目 × 多张截图）
├── src/
│   ├── main.tsx                  # 入口；单页应用，无客户端路由
│   ├── App.tsx                   # 主页（hero + brand + boomerang + terminal + projects + contact）
│   ├── BoomerangPage.tsx         # Boomerang 区块（页内 section，非独立路由）
│   ├── styles.css                # 全局样式 + 章节滚动样式
│   ├── boomerang.css             # boomerang 页面样式
│   └── components/
│       ├── FadeIn.tsx            # 入场动画
│       ├── Magnet.tsx            # 磁吸交互
│       ├── AnimatedText.tsx      # 字符级滚动揭示
│       ├── MarqueeSection.tsx    # 跑马灯
│       ├── BrandRevealSection.tsx# 品牌章节
│       ├── ScrollChapter.tsx     # 滚动驱动 sticky chapter 包装器
│       ├── ProjectGallery.tsx    # 3D 项目文件夹画廊
│       ├── ProjectViewer.tsx     # 项目截图查看器
│       ├── DraggableProjectFolder.tsx
│       ├── TerminalPage.tsx      # 终端风格项目页
│       ├── TerminalSurface.tsx
│       ├── BoomerangVideoBg.tsx  # boomerang 视频帧采样回放
│       ├── SingleSystemCard.tsx
│       ├── Buttons.tsx           # ContactButton / StartButton
│       └── ui/3d-card.tsx        # 3D 卡片
└── README.md
```

## 本地运行

> 需要 **Node ≥ 22.12**（vite 8 要求），推荐 **pnpm**。

```bash
pnpm install
pnpm dev          # 启动 vite dev server（默认 5173）
pnpm build        # 类型检查 + vite build → dist/
pnpm preview      # 启动 vite preview（默认 4175），可访问 /  与 /boomerang
pnpm test         # 跑 Vitest
```

## Agent System Console（终端交互页）

页面里的 **AGENT SYSTEM CONSOLE** 是本地 Agent 系统的启动器，会在你机器上打开 4 个本地开发服务：

| 命令 | 系统 | 端口 | 启动命令 |
|---|---|---|---|
| `open mes` | MES Agent | 5173 | `cd ~/Desktop/AI\ agent/02_MES_Agent/frontend && npm run dev -- --strictPort --port 5173` |
| `open inspection` | Equipment Inspection | 8001 | `cd ~/Desktop/AI\ agent/01_设备点检Agent && API_PORT=8001 python3 api_server.py` |
| `open meeting` | Meeting Agent | 8000 | `cd ~/Desktop/AI\ agent/03_meeting-agent/backend && PATH="$PWD/../frontend/node_modules/.bin:$PATH" ALEMBIC_SKIP=1 ./.venv/bin/python -m uvicorn app.main:app --port 8000` |
| `open high-tech` | High-Tech Enterprise | 3000 | `cd ~/Documents/ChatGPT/重点专精特长企业/frontend && npm run dev -- --port 3000 --host 127.0.0.1 --strictPort`<br>后端另开：<br>`cd ~/Documents/ChatGPT/重点专精特长企业 && uvicorn backend.app:app --host 127.0.0.1 --port 8004` |

终端会先探测目标服务是否在线：

- **在线** → 新标签页打开该系统
- **未运行** → 终端里直接打印「未运行 + 无响应地址 + 对应启动命令」，**不会**留下一个 `ERR_CONNECTION_REFUSED` 的死标签页

其他可用命令：`help` / `systems` / `projects` / `about` / `whoami` / `clear`（↑↓ 可翻历史）。

### 端口说明

- 5173 MES Agent frontend（vite 硬编码）· 8765 MES Agent API
- 8001 设备点检（`api_server.py`，web UI + `/api` 同源）
- 8000 会议记录 Agent backend（monolith 模式，自带 Next.js 在 3001）
- 3000 重点专精特新 frontend · 8004 重点专精特新 backend

> 前端 `VITE_API_BASE_URL` 指向 8004（`frontend/.env`）；8000 已被会议记录 Agent 占用。
> 后端 CORS 白名单同时允许 `:5173` 与 `:3000`。

> 注意：这 4 个系统是**本地开发服务**，只在作者机器上存在。别人克隆这个仓库后终端会提示未运行 —— 这是预期行为。

## 设计文档

开发期我额外维护了几份 spec / plan（`docs/superpowers/specs/`、`docs/superpowers/plans/`），为了仓库体积没传上来。主要设计决策：

- `docs/superpowers/specs/2026-08-06-jack-3d-creator-design.md` — 主页设计
- `docs/superpowers/specs/2026-08-06-boomerang-landing-page-design.md` — /boomerang 设计
- `docs/superpowers/specs/2026-08-06-scroll-chapter-transitions-design.md` — 滚动章节包装器
- `docs/superpowers/specs/2026-08-06-project-console-terminal-design.md` — 终端风格项目页

## Asset Note

视频资产已重编码为浏览器通用格式：

| 文件 | 原始 | 现在 |
|---|---|---|
| `public/hero-background.mp4` | HEVC 3804×2160 60fps **131 MB** | H.264 1920×1080 30fps **11 MB** |
| `public/jack-hero.mp4` | HEVC 640×480 60fps 3.7 MB | H.264 640×480 **464 KB** |

HEVC 在 Chrome / Firefox / Safari 之外的浏览器上**无法解码**（原视频在这些浏览器里是静默不播的），转成 H.264 后兼容性恢复，同时体积降到 1/12。`public/projects/` 下的 20 张画廊截图保持 PNG 原样（懒加载）。

## License

Personal internship deliverable. 联系作者（commit author）后再决定 License。
