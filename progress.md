# 推进记录

## 2026-05-21
- 创建项目骨架
- 初始化 AI 协作文件与目录结构
- 落地 SOPilot V0 开源 MVP：
  - TypeScript monorepo：`apps/web`、`packages/core`、`packages/cli`
  - 核心 schema：SOP / Workflow / Evaluation
  - 无 API Key deterministic parser、评估逻辑和导出器
  - Web Demo：SOP 输入、节点分析、Mermaid 预览、人工审核点、导出
  - CLI：`sopilot generate`、`templates`、`generate-all`
  - 12 个示例模板、README、schema 文档、adapter roadmap、growth playbook、CI
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`、`pnpm build`
- 已生成：`docs/schema/*.json`、`examples/generated/*`、`docs/assets/sopilot-workbench.png`
- 本地预览：`http://localhost:3000`
- 增加 English / 中文语言切换、中文 README、中文界面截图 `docs/assets/sopilot-workbench-zh.png`
- 增加 MIT License 和 GitHub issue templates，为首次推送做仓库卫生补齐

## 2026-05-22
- 将 Web 首页升级为开源发布级视觉：
  - 深色玻璃质感、动态网格背景、扫描线、流程轨道、发光指标卡和 hover 动效
  - 第一屏保留真实工作台入口，不变成纯营销页
  - GitHub 链接指向 `https://github.com/Dewensong/sop-to-agent`
  - 重新生成英文 / 中文首页截图
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`、`pnpm build`
- 浏览器验证：桌面与 390px 移动端均无横向溢出，语言切换和 Mermaid 渲染正常
- 根据反馈将产品 UI 回退为白色简约工作台：
  - 保留中英文切换、GitHub 链接、CLI 提示、示例库和导出闭环
  - 将“花哨好看”的重点转移到 GitHub README 首页叙事
  - 重写英文 / 中文 README 首屏：定位、截图、Before / After、面试叙事、开发者叙事、路线图
  - 使用生产模式重新生成英文 / 中文 README 截图，移除开发模式标记
- 复测通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`、`pnpm build`
- 浏览器验证：生产模式桌面截图、中英文语言切换、Mermaid 渲染、390px 移动端无横向溢出
- 首次推送到 GitHub：`https://github.com/Dewensong/sop-to-agent`
- 补回 GitHub Actions CI，自动执行 install / lint / typecheck / test / build
- 调整 GitHub 默认首页语言：`README.md` 改为中文主页，英文版迁移到 `README.en.md`，保留 `README.zh-CN.md` 作为兼容跳转入口

## 记录规则
- 每次重要推进追加一条日期记录
- 记录做了什么、产出了什么、下一步是什么
- 不记录无实质价值的临时闲聊
