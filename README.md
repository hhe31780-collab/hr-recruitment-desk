# 人贩子系统 · HR 招聘工作台

可公开访问、每个浏览器独立保存资料的招聘工具。包括招聘台账、日历待办、岗位仓库、招聘分析、工作文档与 HR资源。

本仓库准备使用 GitHub 私有仓库 `hr-recruitment-desk` 保存源代码，使用 Cloudflare Pages 的 Git 集成托管公开网页。

## 项目特点

- 纯静态 HTML / CSS / JavaScript，没有服务器数据库或运行时密钥。
- IndexedDB 保存候选人、日程、岗位、指标配置和上传文件，刷新后保留。
- 招聘台账支持表格与看板、动态流程、新建编辑、详情、Excel/CSV 导入导出，以及逐行／本页／全部筛选结果选择和批量删除。
- 删除候选人时保留日程和附件，只解除关联；原简历附件可在工作文档继续查找。
- 岗位卡片删除只从岗位仓库移除，原岗位与候选人的关联信息继续保留。
- 招聘分析含核心指标、招聘漏斗、岗位对比，支持自定义分子和分母。
- 日历支持日／周／月及当日安排、手动短期待办、长期待办。
- 字体、Excel 库与相关许可均本地附带，不依赖外部 CDN。

## 本地运行与检查

安装 Node.js 22 或以上版本（建议 Node.js 24），在本目录执行：

```sh
npm run build
npm start
```

打开 http://localhost:4173 。不需要安装生产依赖；`build` 只做 JavaScript 语法检查，现有 `dist/` 即可直接部署。

## Cloudflare Pages 设置

请使用 Git 集成，避免先创建 Direct Upload 项目后无法原地切换 Git 自动部署。

1. 在 GitHub 创建名为 `hr-recruitment-desk` 的私有仓库，并提交本目录内容。
2. 在 Cloudflare 控制台进入 Workers & Pages → Create application → Pages → Connect to Git（部分界面显示 Import an existing Git repository）。
3. 连接 GitHub，只授权此项目仓库，选择 `hr-recruitment-desk`。
4. 填入以下设置，然后保存并部署：

| 设置 | 值 |
|---|---|
| 项目名称 | hr-recruitment-desk（如名称已被占用，需要另选可用名称） |
| 生产分支 | main |
| 框架预设 | None / 无 |
| 根目录 | 仓库根目录，保持默认 |
| 构建命令 | npm run build |
| 构建输出目录 | dist |
| 环境变量 | 无需设置 |

Cloudflare 完成后会返回实际的 `*.pages.dev` 网址；本说明中的项目名称不代表已创建项目或已经有可用网址。连接 Git 集成后，提交到生产分支会触发后续部署。

官方参考：

- https://developers.cloudflare.com/pages/get-started/git-integration/
- https://developers.cloudflare.com/pages/framework-guides/deploy-anything/

## 数据与换网址

网站公开不等于访客共享同一份招聘资料。每个浏览器分别保存数据，没有账号同步。

换成新的 Pages 域名或自定义域名，会形成新的浏览器存储空间：旧网址中的候选人、日程和文件不会自动搬过去，新网址初次打开会填充虚构示例数据。请先在旧站使用“备份数据”保留完整备份，再按需要安排迁移。本版有备份导出，还没有完整 JSON 备份恢复功能；候选人表格可通过现有 Excel/CSV 导入导出迁移。

仓库只应包含程序代码及虚构示例数据，不应提交浏览器备份、真实候选人简历、上传文件、密码或账号凭据。私有仓库不影响 Cloudflare 网站公开访问；静态网页的前端脚本仍会发送到访客浏览器。

## 主要文件

| 路径 | 用途 |
|---|---|
| dist/ | 直接部署的静态网页、字体和 Excel 库 |
| dist/model.js | 示例数据与统计计算 |
| dist/storage.js | 浏览器存储接口，后续可替换为云端接口 |
| dist/deletion.js | 单个和批量删除时的关联保留规则 |
| data-schema.json | 数据结构定义 |
| 数据结构说明.md | 字段及业务规则说明 |
| 使用说明.md | 产品操作说明 |
| THIRD_PARTY_NOTICES.md | 第三方组件与字体许可说明 |

此导出目录不包含原 Sites 项目的托管身份配置、Git 元数据、账号凭据或访客本地数据。
