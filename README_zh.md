# Agent Skills 中文说明

## 技能介绍

Agent Skills 是一组面向 AI 编程代理的工程化技能包。每个技能都是一个结构化工作流，帮助代理在需求定义、计划拆解、编码实现、验证测试、代码审查和发布上线等阶段按生产级标准执行任务。

这些技能不是普通提示词，而是包含步骤、检查点、质量门禁和验证要求的操作流程，用来减少跳过规格说明、测试、审查、安全检查等常见问题。

## 如何使用

- 在 Claude Code 中可以通过斜杠命令使用，例如 `/spec`、`/plan`、`/build`、`/test`、`/review`、`/webperf`、`/code-simplify`、`/ship`。
- 也可以直接引用某个技能文件，例如 [spec-driven-development](skills/spec-driven-development/SKILL.md) 或 [test-driven-development](skills/test-driven-development/SKILL.md)。
- 当代理识别到当前任务类型时，相关技能也会自动触发。例如：设计 API 时使用 `api-and-interface-design`，构建界面时使用 `frontend-ui-engineering`，调试失败时使用 `debugging-and-error-recovery`。

## 什么时候用

| 场景 | 推荐使用 |
|------|----------|
| 不确定当前任务该用哪个技能 | `using-agent-skills` |
| 想通过提问澄清真实需求 | `interview-me` |
| 想把模糊想法变成具体方案 | `idea-refine` |
| 需要先写清楚要做什么 | `/spec` 或 `spec-driven-development` |
| 已有需求，需要拆成可执行任务 | `/plan` 或 `planning-and-task-breakdown` |
| 开始实现新功能 | `/build` 或 `incremental-implementation` |
| 修复 bug 或改变已有行为 | `test-driven-development` |
| 需要给代理补充上下文或规则 | `context-engineering` |
| 需要基于官方文档做技术决策 | `source-driven-development` |
| 生产、安全或高风险改动需要反复校验 | `doubt-driven-development` |
| 构建或修改用户界面 | `frontend-ui-engineering` |
| 设计 API、模块边界或公开接口 | `api-and-interface-design` |
| 需要在浏览器中验证页面行为 | `browser-testing-with-devtools` |
| 测试失败、构建失败或行为异常 | `debugging-and-error-recovery` |
| 合并前做代码质量审查 | `/review` 或 `code-review-and-quality` |
| 代码能运行但过于复杂 | `/code-simplify` 或 `code-simplification` |
| 涉及输入、认证、存储或外部集成 | `security-and-hardening` |
| 有性能目标或怀疑性能回退 | `/webperf` 或 `performance-optimization` |
| 需要管理提交、分支或版本 | `git-workflow-and-versioning` |
| 配置或修改构建发布流水线 | `ci-cd-and-automation` |
| 迁移、废弃或移除旧系统 | `deprecation-and-migration` |
| 记录架构决策、API 或功能说明 | `documentation-and-adrs` |
| 增加日志、指标、追踪或告警 | `observability-and-instrumentation` |
| 准备发布到生产环境 | `/ship` 或 `shipping-and-launch` |
