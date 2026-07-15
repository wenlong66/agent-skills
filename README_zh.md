# Agent Skills

[English](README.md) | 中文

**面向 AI 编程代理的生产级工程技能。**

Skills 将资深工程师构建软件时使用的工作流、质量门禁和最佳实践编码成可复用流程。这个仓库把这些流程打包成技能，让 AI 代理能在软件开发的每个阶段持续遵循它们。

<a href="https://trendshift.io/repositories/25200" target="_blank"><img src="https://trendshift.io/api/badge/repositories/25200" alt="addyosmani%2Fagent-skills | Trendshift" style="width: 250px; height: 55px;" width="250" height="55"/></a>

![Addy's Agent Skills](https://addyosmani.com/assets/images/addys-agent-skills.jpg)

```
  定义            计划           构建           验证           审查           发布
 ┌──────┐      ┌──────┐      ┌──────┐      ┌──────┐      ┌──────┐      ┌──────┐
 │ 想法 │ ───▶ │ 规格 │ ───▶ │ 代码 │ ───▶ │ 测试 │ ───▶ │ 质量 │ ───▶ │ 上线 │
 │细化 │      │ PRD  │      │ 实现 │      │调试 │      │ 门禁 │      │ 生产 │
 └──────┘      └──────┘      └──────┘      └──────┘      └──────┘      └──────┘
  /spec          /plan          /build        /test         /review       /ship
```

---

## 命令

8 个斜杠命令对应完整开发生命周期。每个命令都会自动激活合适的技能。

| 你正在做什么 | 命令 | 核心原则 |
|---|---|---|
| 定义要构建什么 | `/spec` | 先写规格，再写代码 |
| 规划如何构建 | `/plan` | 小而原子的任务 |
| 增量构建 | `/build` | 一次一个切片 |
| 证明它能工作 | `/test` | 测试就是证据 |
| 合并前审查 | `/review` | 改善代码健康度 |
| 审计 Web 性能 | `/webperf` | 先测量，再优化 |
| 简化代码 | `/code-simplify` | 清晰优先于聪明 |
| 发布到生产 | `/ship` | 更快反馈更安全 |

规格已经存在后，如果想减少手动步骤，可以使用 **`/build auto`**。它会生成计划，并在一次批准后自主实现所有任务。它减少的是任务之间的人类确认，不是验证：每个任务仍然必须由测试驱动、单独提交，并会在失败或高风险步骤处暂停。

技能也会根据你正在做的事情自动激活：设计 API 会触发 `api-and-interface-design`，构建 UI 会触发 `frontend-ui-engineering`，等等。

---

## 快速开始

**最快路径：任意代理，一个命令。** 开源 [skills CLI](https://github.com/vercel-labs/skills) 可安装到 70+ 种代理（Claude Code、Cursor、Codex、Copilot、Cline 等）：

```bash
npx skills add addyosmani/agent-skills            # 安装全部 24 个技能
npx skills add addyosmani/agent-skills --list     # 安装前浏览
```

也可以只安装单个技能：

```bash
npx skills add addyosmani/agent-skills --skill code-review-and-quality   # 合并前五轴审查
npx skills add addyosmani/agent-skills --skill interview-me              # 一次一个问题地澄清需求
npx skills add addyosmani/agent-skills --skill test-driven-development   # 强制红绿重构
```

更偏好原生集成？选择下面的工具。

<details>
<summary><b>Claude Code（推荐）</b></summary>

**Marketplace 安装：**

```
/plugin marketplace add addyosmani/agent-skills
/plugin install agent-skills@addy-agent-skills
```

> **SSH 报错？** Marketplace 通过 SSH 克隆仓库。如果你没有配置 GitHub SSH key，可以[添加 SSH key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-your-ssh-key-to-the-ssh-agent)，也可以在 marketplace-add 步骤使用完整 HTTPS URL 强制通过 HTTPS 克隆：
> ```bash
> /plugin marketplace add https://github.com/addyosmani/agent-skills.git
> /plugin install agent-skills@addy-agent-skills
> ```
>
> 如果 `/plugin install` 在 Windows 或 macOS 上仍然因为 `git@github.com: Permission denied (publickey)` 失败，推荐一次性配置 Git，把 GitHub SSH URL 重写成 HTTPS，供子进程克隆使用：
> ```bash
> git config --global url."https://github.com/".insteadOf git@github.com:
> ```

**本地 / 开发安装：**

```bash
git clone https://github.com/addyosmani/agent-skills.git
claude --plugin-dir /path/to/agent-skills
```

</details>

<details>
<summary><b>Cursor</b></summary>

把工作流技能放在 `.cursor/skills/` 下（从 `agent-skills/skills/` 同步），短规则放在 `.cursor/rules/*.mdc` 下；不要把完整技能粘贴进 rules。见 [docs/cursor-setup.md](docs/cursor-setup.md)。

</details>

<details>
<summary><b>Antigravity CLI</b></summary>

作为原生插件安装，获得技能、子代理和斜杠命令支持。见 [docs/antigravity-setup.md](docs/antigravity-setup.md)。

**从仓库安装：**

```bash
agy plugin install https://github.com/addyosmani/agent-skills.git
```

**从本地克隆安装：**

```bash
git clone https://github.com/addyosmani/agent-skills.git
agy plugin install ./agent-skills
```

</details>

<details>
<summary><b>Gemini CLI</b></summary>

可作为原生技能安装以支持自动发现，也可以添加到 `GEMINI.md` 作为持久上下文。见 [docs/gemini-cli-setup.md](docs/gemini-cli-setup.md)。

**从仓库安装：**

```bash
gemini skills install https://github.com/addyosmani/agent-skills.git --path skills
```

**从本地克隆安装：**

```bash
gemini skills install ./agent-skills/skills/
```

</details>

<details>
<summary><b>Windsurf</b></summary>

把技能内容添加到 Windsurf 规则配置中。见 [docs/windsurf-setup.md](docs/windsurf-setup.md)。

</details>

<details>
<summary><b>OpenCode</b></summary>

通过 AGENTS.md 和 `skill` 工具使用代理驱动的技能执行。见 [docs/opencode-setup.md](docs/opencode-setup.md)。

</details>

<details>
<summary><b>GitHub Copilot</b></summary>

把 `agents/` 中的代理定义作为 Copilot personas 使用，并把技能内容放进 `.github/copilot-instructions.md`。见 [docs/copilot-setup.md](docs/copilot-setup.md)。

</details>

<details>
  <summary><b>Kiro IDE & CLI</b></summary>
  Kiro 的技能位于 `.kiro/skills/`，可以存放在项目级或全局级。Kiro 也支持 Agents.md。见 Kiro 文档：https://kiro.dev/docs/skills/
</details>

<details>
<summary><b>Codex</b></summary>

作为原生 Codex 插件安装（Codex CLI v0.122+）：

```bash
codex plugin marketplace add addyosmani/agent-skills
```

Codex 会通过 `.codex-plugin/plugin.json` 直接读取根目录的 `skills/`。安装后，在聊天中使用 `@` 调用技能（例如 `@spec-driven-development`）。本地安装和故障排查见 [docs/codex-setup.md](docs/codex-setup.md)。

</details>

<details>
<summary><b>其他代理</b></summary>

技能是普通 Markdown 文件，任何接受系统提示或指令文件的代理都可以使用。见 [docs/getting-started.md](docs/getting-started.md)。

</details>

---

## 采用方式

已经安装？如何在代码库中落地取决于你的项目状态。**[Adoption Guide](docs/adoption-guide.md)** 提供两条路径：绿地项目从第一天开始使用完整生命周期；已有代码库则采用增量、验证优先的 rollout。

---

## 全部 24 个技能

上面的命令是入口。这个包包含 24 个技能：23 个生命周期技能加上 `using-agent-skills` 元技能。每个技能都是包含步骤、验证门禁和反合理化表格的结构化工作流。你也可以直接引用任意技能。

### Meta - 发现适用技能

| 技能 | 作用 | 使用场景 |
|---|---|---|
| [using-agent-skills](skills/using-agent-skills/SKILL.md) | 把当前工作映射到正确技能工作流，并定义共享操作规则 | 开始会话或判断哪个技能适用时 |

### Define - 澄清要构建什么

| 技能 | 作用 | 使用场景 |
|---|---|---|
| [interview-me](skills/interview-me/SKILL.md) | 一次一个问题地访谈，提取用户真正想要的东西，而不是他们以为自己应该想要的东西，直到约 95% 置信度 | 需求不明确，或用户说“interview me”/“grill me”时 |
| [idea-refine](skills/idea-refine/SKILL.md) | 通过结构化发散/收敛思考，把模糊想法变成具体方案 | 有粗略概念，需要探索变体时 |
| [spec-driven-development](skills/spec-driven-development/SKILL.md) | 在写代码前编写 PRD，覆盖目标、命令、结构、代码风格、测试和边界 | 开始新项目、新功能或重大变更时 |

### Plan - 拆解任务

| 技能 | 作用 | 使用场景 |
|---|---|---|
| [planning-and-task-breakdown](skills/planning-and-task-breakdown/SKILL.md) | 把规格拆成带验收标准和依赖顺序的小型可验证任务 | 已有规格，需要可执行任务时 |

### Build - 编写代码

| 技能 | 作用 | 使用场景 |
|---|---|---|
| [incremental-implementation](skills/incremental-implementation/SKILL.md) | 薄垂直切片：实现、测试、验证、提交。使用 feature flag、安全默认值和易回滚变更 | 任何触及多个文件的改动 |
| [test-driven-development](skills/test-driven-development/SKILL.md) | 红绿重构、测试金字塔（80/15/5）、测试粒度、DAMP 优于 DRY、Beyonce Rule、浏览器测试 | 实现逻辑、修 bug 或改变行为时 |
| [context-engineering](skills/context-engineering/SKILL.md) | 在正确时间给代理提供正确资料：规则文件、上下文打包、MCP 集成 | 开始会话、切换任务或输出质量下降时 |
| [source-driven-development](skills/source-driven-development/SKILL.md) | 每个框架决策都基于官方文档：验证、引用来源、标注未验证内容 | 希望框架/库相关代码有权威来源支撑时 |
| [doubt-driven-development](skills/doubt-driven-development/SKILL.md) | 对每个非平凡决策做 fresh-context 对抗式审查：CLAIM → EXTRACT → DOUBT → RECONCILE → STOP，可在用户授权后跨模型升级 | 风险高（生产、安全、不可逆）、代码不熟悉，或现在验证比以后调试更便宜时 |
| [frontend-ui-engineering](skills/frontend-ui-engineering/SKILL.md) | 组件架构、设计系统、状态管理、响应式设计、WCAG 2.1 AA 可访问性 | 构建或修改面向用户的界面时 |
| [api-and-interface-design](skills/api-and-interface-design/SKILL.md) | 契约优先设计、Hyrum's Law、One-Version Rule、错误语义、边界校验 | 设计 API、模块边界或公开接口时 |

### Verify - 证明它能工作

| 技能 | 作用 | 使用场景 |
|---|---|---|
| [browser-testing-with-devtools](skills/browser-testing-with-devtools/SKILL.md) | 用 Chrome DevTools MCP 获取真实运行时数据：DOM 检查、控制台日志、网络追踪、性能分析 | 构建或调试任何运行在浏览器里的东西时 |
| [debugging-and-error-recovery](skills/debugging-and-error-recovery/SKILL.md) | 五步排查：复现、定位、最小化、修复、加保护。Stop-the-line 规则和安全 fallback | 测试失败、构建失败或行为异常时 |

### Review - 合并前质量门禁

| 技能 | 作用 | 使用场景 |
|---|---|---|
| [code-review-and-quality](skills/code-review-and-quality/SKILL.md) | 五轴审查、变更大小（约 100 行）、严重级别（Nit/Optional/FYI）、审查速度规范、拆分策略 | 合并任何变更前 |
| [code-simplification](skills/code-simplification/SKILL.md) | Chesterton's Fence、Rule of 500，在保持行为不变的前提下降低复杂度 | 代码能运行但可读性或可维护性不足时 |
| [security-and-hardening](skills/security-and-hardening/SKILL.md) | OWASP Top 10 防护、认证模式、密钥管理、依赖审计、三层边界系统 | 涉及用户输入、认证、数据存储或外部集成时 |
| [performance-optimization](skills/performance-optimization/SKILL.md) | 先测量再优化：Core Web Vitals 目标、profiling 工作流、bundle 分析、反模式检测 | 有性能要求或怀疑性能回退时 |

### Ship - 有信心地发布

| 技能 | 作用 | 使用场景 |
|---|---|---|
| [git-workflow-and-versioning](skills/git-workflow-and-versioning/SKILL.md) | Trunk-based development、原子提交、变更大小（约 100 行）、commit-as-save-point 模式 | 进行任何代码改动时（总是） |
| [ci-cd-and-automation](skills/ci-cd-and-automation/SKILL.md) | Shift Left、Faster is Safer、feature flag、质量门禁流水线、失败反馈循环 | 设置或修改构建/部署流水线时 |
| [deprecation-and-migration](skills/deprecation-and-migration/SKILL.md) | code-as-liability 心智、强制/建议型废弃、迁移模式、僵尸代码清理 | 移除旧系统、迁移用户或下线功能时 |
| [documentation-and-adrs](skills/documentation-and-adrs/SKILL.md) | 架构决策记录、API 文档、内联文档标准：记录“为什么” | 做架构决策、修改 API 或发布功能时 |
| [observability-and-instrumentation](skills/observability-and-instrumentation/SKILL.md) | 结构化日志、RED 指标、OpenTelemetry tracing、基于症状的告警：边构建边埋点 | 添加遥测，或发布任何会运行在生产环境的东西时 |
| [shipping-and-launch](skills/shipping-and-launch/SKILL.md) | 发布前检查清单、feature flag 生命周期、分阶段 rollout、回滚流程、监控设置 | 准备部署到生产环境时 |

---

## 代理角色

用于定向审查的预配置专家 persona：

| Agent | 角色 | 视角 |
|---|---|---|
| [code-reviewer](agents/code-reviewer.md) | Senior Staff Engineer | 五轴代码审查，以“Staff 工程师会批准吗？”为标准 |
| [test-engineer](agents/test-engineer.md) | QA Specialist | 测试策略、覆盖率分析和 Prove-It 模式 |
| [security-auditor](agents/security-auditor.md) | Security Engineer | 漏洞检测、威胁建模、OWASP 评估 |
| [web-performance-auditor](agents/web-performance-auditor.md) | Web Performance Engineer | Core Web Vitals 审计，支持 Quick/Deep 模式和 metric-honesty 规则；通过 `/webperf` 运行 |

决策矩阵、编排规则，以及 persona 如何与技能和斜杠命令组合，见 [docs/agents.md](docs/agents.md)。

---

## 参考检查清单

技能需要时会拉取的快速参考材料：

| Reference | 覆盖内容 |
|---|---|
| [definition-of-done.md](references/definition-of-done.md) | 每个变更都要满足的项目级完成标准，并与每个任务的验收标准区分 |
| [testing-patterns.md](references/testing-patterns.md) | 测试结构、命名、mock、React/API/E2E 示例、反模式 |
| [security-checklist.md](references/security-checklist.md) | 提交前检查、认证、输入校验、安全头、CORS、OWASP Top 10 |
| [performance-checklist.md](references/performance-checklist.md) | Core Web Vitals 目标、前后端检查表、测量命令 |
| [accessibility-checklist.md](references/accessibility-checklist.md) | 键盘导航、屏幕阅读器、视觉设计、ARIA、测试工具 |
| [observability-checklist.md](references/observability-checklist.md) | On-call 问题、结构化日志、RED/USE 指标、tracing、基于症状的告警、发布前门禁 |
| [orchestration-patterns.md](references/orchestration-patterns.md) | 被认可的多 persona 编排模式、反模式，以及“persona 不调用 persona”规则 |

---

## 技能如何工作

每个技能都遵循一致结构：

```
┌─────────────────────────────────────────────────┐
│  SKILL.md                                       │
│                                                 │
│  ┌─ Frontmatter ─────────────────────────────┐  │
│  │ name: lowercase-hyphen-name               │  │
│  │ description: Guides agents through [task].│  │
│  │              Use when…                    │  │
│  └───────────────────────────────────────────┘  │
│  Overview         → 这个技能做什么              │
│  When to Use      → 触发条件                    │
│  Process          → 分步工作流                  │
│  Rationalizations → 借口 + 反驳                 │
│  Red Flags        → 出错信号                    │
│  Verification     → 证据要求                    │
└─────────────────────────────────────────────────┘
```

**关键设计选择：**

- **流程，不是散文。** 技能是代理要执行的工作流，不是只读参考文档。每个技能都有步骤、检查点和退出标准。
- **反合理化。** 每个技能都包含代理常用跳步骤借口的表格（例如“我稍后再加测试”）以及对应反驳。
- **验证不可协商。** 每个技能都以证据要求结尾：测试通过、构建输出、运行时数据。“看起来对”永远不够。
- **渐进披露。** `SKILL.md` 是入口。支持资料只在需要时加载，保持 token 使用最小化。

---

## 项目结构

```
agent-skills/
├── skills/                            # 24 个技能（23 个生命周期技能 + 1 个 meta）
│   ├── interview-me/                  #   Define
│   ├── idea-refine/                   #   Define
│   ├── spec-driven-development/       #   Define
│   ├── planning-and-task-breakdown/   #   Plan
│   ├── incremental-implementation/    #   Build
│   ├── context-engineering/           #   Build
│   ├── source-driven-development/     #   Build
│   ├── doubt-driven-development/      #   Build
│   ├── frontend-ui-engineering/       #   Build
│   ├── test-driven-development/       #   Build
│   ├── api-and-interface-design/      #   Build
│   ├── browser-testing-with-devtools/ #   Verify
│   ├── debugging-and-error-recovery/  #   Verify
│   ├── code-review-and-quality/       #   Review
│   ├── code-simplification/           #   Review
│   ├── security-and-hardening/        #   Review
│   ├── performance-optimization/      #   Review
│   ├── git-workflow-and-versioning/   #   Ship
│   ├── ci-cd-and-automation/          #   Ship
│   ├── deprecation-and-migration/     #   Ship
│   ├── documentation-and-adrs/        #   Ship
│   ├── observability-and-instrumentation/ # Ship
│   ├── shipping-and-launch/           #   Ship
│   └── using-agent-skills/            #   Meta：如何使用这个包
├── agents/                            # 4 个专家 persona
├── references/                        # 7 个补充检查清单
├── hooks/                             # 会话生命周期 hooks
├── .claude/commands/                  # 8 个斜杠命令（Claude Code）
├── .gemini/commands/                  # 8 个斜杠命令（Gemini CLI）
├── commands/                          # 8 个斜杠命令（Antigravity CLI）
├── plugin.json                        # Antigravity 插件清单
└── docs/                              # 各工具设置指南
```

---

## 为什么需要 Agent Skills？

AI 编程代理默认会走最短路径——这通常意味着跳过规格、测试、安全审查，以及让软件可靠的工程实践。Agent Skills 给代理提供结构化工作流，强制执行资深工程师在生产代码中会坚持的纪律。

每个技能都编码了来之不易的工程判断：*什么时候*写规格、*测试什么*、*如何*审查、以及*什么时候*发布。这些不是通用提示词，而是有明确立场、流程驱动的工作流，用来区分生产级工作和原型级工作。

Skills 融入了 Google 工程文化中的最佳实践，包括 [Software Engineering at Google](https://abseil.io/resources/swe-book) 和 Google 的 [engineering practices guide](https://google.github.io/eng-practices/)。你会在 API 设计中看到 Hyrum's Law，在测试中看到 Beyonce Rule 和测试金字塔，在代码审查中看到变更大小和审查速度规范，在简化中看到 Chesterton's Fence，在 Git 工作流中看到 trunk-based development，在 CI/CD 中看到 Shift Left 和 feature flags，并有专门的废弃技能把代码视为负债。这些不是抽象原则，而是直接嵌入代理要执行的分步工作流中。

---

## 与其他方案的比较

想知道它和 [Superpowers](https://github.com/obra/superpowers) 或 [Matt Pocock's skills](https://github.com/mattpocock/skills) 相比如何？见 **[docs/comparison.md](docs/comparison.md)**，其中诚实地并排比较了三者的形态差异、适用时机，并链接到一个受控的 [head-to-head experiment](https://www.linkedin.com/pulse/superpowers-vs-agent-skills-faster-shipping-safer-reasoning-om-mishra-dzakf/)。

---

## 贡献

技能应该是 **具体的**（可执行步骤，而不是模糊建议）、**可验证的**（明确退出标准和证据要求）、**经过实战检验的**（基于真实工作流）、**最小化的**（只包含指导代理所需内容）。

格式规范见 [docs/skill-anatomy.md](docs/skill-anatomy.md)，贡献指南见 [CONTRIBUTING.md](CONTRIBUTING.md)。

---

## 团队

agent-skills 由以下成员构建和维护：

| | 姓名 | GitHub | 角色 |
|---|---|---|---|
| <img src="https://github.com/addyosmani.png?size=120" width="60" height="60" alt="Addy Osmani"> | **Addy Osmani** | [@addyosmani](https://github.com/addyosmani) | Creator |
| <img src="https://github.com/federicobartoli.png?size=120" width="60" height="60" alt="Federico Bartoli"> | **Federico Bartoli** | [@federicobartoli](https://github.com/federicobartoli) | Collaborator |
| <img src="https://github.com/nucliweb.png?size=120" width="60" height="60" alt="Joan León"> | **Joan León** | [@nucliweb](https://github.com/nucliweb) | Collaborator |

---

## 许可证

MIT - 可在你的项目、团队和工具中使用这些技能。
