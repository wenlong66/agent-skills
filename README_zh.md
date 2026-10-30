# Agent Skills — 六技能精简版

[English](README.md) | 中文

从 [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) 中保留 6 个生产级工程技能，聚焦账号系统、AI 应用、公共调用库和 Web 界面。此分支不再包含上游其余技能及其专属命令、钩子和评测资源。

## 保留技能与选择理由

| 技能 | 选择理由 |
|---|---|
| [security-and-hardening](skills/security-and-hardening/SKILL.md) | 账号系统和 AI 应用都直接受益：认证、输入校验、密钥、隐私和 LLM 安全边界。 |
| [api-and-interface-design](skills/api-and-interface-design/SKILL.md) | 公共调用库、账号接口和多应用复用需要稳定契约。 |
| [constraint-driven-development](skills/constraint-driven-development/SKILL.md) | 把对 AI 产出的要求落实成可检查的项目规则。 |
| [frontend-ui-engineering](skills/frontend-ui-engineering/SKILL.md) | 补管理后台、配置网页和产品页面的完整状态及前端规范。 |
| [browser-testing-with-devtools](skills/browser-testing-with-devtools/SKILL.md) | 验证实际页面、交互和请求是否正确；需要配置 Chrome DevTools MCP。 |
| [performance-optimization](skills/performance-optimization/SKILL.md) | 补前端加载、接口和数据库性能的专项流程。 |

## 使用当前精简版

在本仓库根目录执行：

```bash
# 浏览或安装本地的 6 个技能
npx skills add . --list
npx skills add .

# 或只安装其中一个
npx skills add . --skill security-and-hardening

# 在 Claude Code 中加载当前本地插件
claude --plugin-dir .
```

也可以通过本地 marketplace 持久安装：

```text
/plugin marketplace add /absolute/path/to/agent-skills
/plugin install agent-skills@addy-agent-skills
```

Marketplace 指向当前检出内容，而不是上游远程仓库。直接安装远程的 `addyosmani/agent-skills` 仍会得到上游目录，**不会**自动选择此分支的六技能子集。各宿主的本地配置见 [入门指南](docs/getting-started.md)。

> 单技能安装只复制 `skills/<name>/`，不会带上根目录 `references/`。需要共享检查清单时，优先使用整个仓库的集成方式；或把所需清单复制到已安装技能内，并调整引用路径。

## 保留的命令与角色

Claude Code、Gemini CLI 和 Antigravity 的命令包装均只保留两项：

| 命令 | 用途 |
|---|---|
| `/constraints` | 通过 `constraint-driven-development` 建立书面质量契约。 |
| `/webperf` | 调用 `web-performance-auditor`，依据真实运行数据审计 Web 性能。 |

保留的两个角色是 [security-auditor](agents/security-auditor.md) 和 [web-performance-auditor](agents/web-performance-auditor.md)。调用及组合规则见 [角色指南](docs/agents.md)。也可以直接按名称调用技能；本精简版没有完整生命周期路由或会话钩子。

## 配套参考

- [安全检查清单](references/security-checklist.md)
- [性能检查清单](references/performance-checklist.md)
- [无障碍检查清单](references/accessibility-checklist.md)
- [安全加固模式](skills/security-and-hardening/references/hardening-patterns.md)
- [性能优化模式](skills/performance-optimization/references/optimization-patterns.md)
- [项目约束底线检查参考](skills/constraint-driven-development/references/floor-guard.md)

## 验证

以下检查均不需要安装额外依赖：

```bash
node scripts/validate-skills.js
node scripts/validate-commands.js
node scripts/validate-reference-links.js
node scripts/validate-versions.js
node scripts/run-evals.js --min-rank1 95
node --test scripts/lib/skill-lint-test.js scripts/*-test.js
```

[评测说明](evals/README.md)介绍确定性路由检查，以及可选、消耗模型额度的行为评测。每个保留技能都有对应评测案例及所需样例。维护方式见 [CONTRIBUTING.md](CONTRIBUTING.md)，技能格式见 [docs/skill-anatomy.md](docs/skill-anatomy.md)。

## 来源与许可

基于 Addy Osmani 及上游贡献者维护的 Agent Skills。原项目：[addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)。

[MIT](LICENSE)。
