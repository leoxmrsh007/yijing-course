# 周易学习平台 ☯️

一个现代化的周易学习交互平台，集成占卜功能、卦象典籍、学习资料等模块，支持一键部署到网页和微信小程序。

## ✨ 功能特性

- 🎯 **智能占卜**：传统铜钱占卜法与现代随机算法结合
- 📚 **卦象典籍**：完整收录六十四卦详解，支持搜索和筛选
- 🎓 **学习中心**：系统的周易基础知识学习路径
- 📱 **响应式设计**：完美适配桌面端和移动端
- 🚀 **一键部署**：支持网页和微信小程序部署
- 🎨 **现代UI**：基于Ant Design的美观界面设计

## 🛠️ 技术栈

- **前端框架**：React 19.1.0
- **UI组件库**：Ant Design 5.0
- **路由管理**：React Router DOM 6.8
- **样式方案**：Styled Components + CSS
- **构建工具**：Create React App

## 🚀 快速开始

### 环境要求

- Node.js >= 14.0.0
- npm >= 6.0.0

### 安装和运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm start

# 构建生产版本
npm run build
```

访问 http://localhost:3000 查看应用

## 🚀 一键部署

本项目提供了完整的一键部署解决方案，支持多个平台的自动化部署。

### 快速部署菜单 (Windows)

```cmd
# 运行交互式部署菜单
quick-deploy.bat
```

### 命令行部署

```bash
# 使用 Node.js 脚本
node deploy.js vercel          # 部署到 Vercel
node deploy.js netlify         # 部署到 Netlify
node deploy.js github          # 部署到 GitHub Pages
node deploy.js wechat          # 创建微信小程序项目
node deploy.js all             # 部署到所有网站平台

# 使用 npm 脚本
npm run deploy:vercel          # 部署到 Vercel
npm run deploy:netlify         # 部署到 Netlify
npm run deploy:github          # 部署到 GitHub Pages
npm run deploy:all             # 部署到所有平台

# 使用批处理脚本 (Windows)
deploy.bat vercel              # 部署到 Vercel
deploy.bat all                 # 部署到所有平台

# 使用 PowerShell 脚本 (Windows)
.\deploy.ps1 -Platform vercel  # 部署到 Vercel
.\deploy.ps1 -Platform all     # 部署到所有平台
```

### 支持的部署平台

| 平台 | 特点 | 适用场景 |
|------|------|----------|
| **Vercel** | 零配置、全球CDN、自动HTTPS | 推荐用于生产环境 |
| **Netlify** | 简单易用、表单处理、函数支持 | 适合快速原型 |
| **GitHub Pages** | 免费托管、与GitHub集成 | 开源项目展示 |
| **微信小程序** | 原生小程序体验 | 移动端用户 |

### 微信小程序部署

1. **创建小程序项目**：
   ```bash
   node deploy.js wechat
   ```

2. **使用微信开发者工具**：
   - 下载并安装 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
   - 打开工具，选择「导入项目」
   - 选择生成的 `wechat-miniprogram` 目录
   - 输入你的小程序 AppID

3. **开发和发布**：
   - 在开发者工具中进行开发和调试
   - 点击「上传」按钮上传代码
   - 在微信公众平台提交审核并发布

### 环境配置

复制 `.env.example` 为 `.env` 并配置相应的环境变量：

```bash
cp .env.example .env
```

详细的部署配置和故障排除请参考 [DEPLOYMENT.md](DEPLOYMENT.md)。

## 📁 项目结构

```
src/
├── components/          # React组件
│   ├── Home.js         # 主页
│   ├── Divination.js   # 占卜功能
│   ├── HexagramLibrary.js  # 卦象典籍
│   ├── LearningCenter.js   # 学习中心
│   ├── Navigation.js   # 导航组件
│   └── WechatDeploy.js # 微信部署指南
├── data/               # 数据文件
│   └── yijingData.js   # 周易数据
├── App.js              # 主应用组件
├── App.css             # 全局样式
└── index.js            # 应用入口
```

## 🎯 主要功能

### 智能占卜
- 快速占卜：一键生成卦象和解读
- 铜钱占卜：模拟传统三枚铜钱投掷过程
- 详细解读：包含卦辞、象辞、含义和人生建议

### 卦象典籍
- 完整的64卦数据库
- 支持按卦名、描述搜索
- 详细的卦象信息展示
- 八卦基础知识介绍

### 学习中心
- 周易发展历史时间线
- 基础概念详细解释
- 八卦详解和组合规律
- 实用应用指导

## 🚀 部署指南

### 网页部署

支持多种部署平台：
- Vercel（推荐）
- Netlify
- GitHub Pages
- 自建服务器

详细部署步骤请查看 [DEPLOY.md](./DEPLOY.md)

### 微信小程序部署

1. 安装Taro框架
2. 创建小程序项目
3. 迁移组件代码
4. 配置小程序信息
5. 提交审核发布

详细指南请访问平台内的"微信部署"页面

## 🎨 界面预览

- **主页**：展示平台功能和快速入口
- **占卜页面**：提供两种占卜方式和详细解读
- **卦象典籍**：卡片式展示所有卦象，支持搜索
- **学习中心**：折叠式布局展示学习内容

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进项目！

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

感谢所有为传承和弘扬中华优秀传统文化做出贡献的人们。

---

**传承千年智慧 · 指导现代生活** ☯️

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
