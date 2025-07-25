# 周易学习平台部署指南

## 项目简介

周易学习平台是一个现代化的交互式学习平台，集成了占卜功能、卦象典籍、学习资料等模块，支持一键部署到网页和微信小程序。

## 功能特性

- 🎯 **智能占卜**：传统铜钱占卜法与现代随机算法结合
- 📚 **卦象典籍**：完整收录六十四卦详解
- 🎓 **学习中心**：系统的周易基础知识学习
- 📱 **响应式设计**：完美适配桌面端和移动端
- 🚀 **一键部署**：支持网页和微信小程序部署

## 技术栈

- **前端框架**：React 19.1.0
- **UI组件库**：Ant Design 5.0
- **路由管理**：React Router DOM 6.8
- **样式方案**：Styled Components + CSS
- **构建工具**：Create React App
- **部署平台**：支持 Vercel、Netlify、GitHub Pages 等

## 快速开始

### 环境要求

- Node.js >= 14.0.0
- npm >= 6.0.0 或 yarn >= 1.0.0

### 安装依赖

```bash
# 克隆项目（如果从Git仓库）
git clone <repository-url>
cd yijing-course

# 安装依赖
npm install
# 或
yarn install
```

### 本地开发

```bash
# 启动开发服务器
npm start
# 或
yarn start
```

访问 http://localhost:3000 查看应用

### 构建生产版本

```bash
# 构建生产版本
npm run build
# 或
yarn build
```

构建文件将生成在 `build/` 目录中

## 部署方案

### 1. Vercel 部署（推荐）

#### 方法一：通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 部署项目
vercel

# 生产环境部署
vercel --prod
```

#### 方法二：通过 GitHub 集成

1. 将代码推送到 GitHub 仓库
2. 访问 [Vercel](https://vercel.com)
3. 点击 "Import Project"
4. 选择 GitHub 仓库
5. 配置构建设置（通常自动检测）
6. 点击 "Deploy"

### 2. Netlify 部署

#### 方法一：拖拽部署

1. 运行 `npm run build` 构建项目
2. 访问 [Netlify](https://netlify.com)
3. 将 `build/` 文件夹拖拽到部署区域

#### 方法二：Git 集成

1. 将代码推送到 GitHub/GitLab
2. 在 Netlify 中连接仓库
3. 配置构建设置：
   - Build command: `npm run build`
   - Publish directory: `build`
4. 点击 "Deploy site"

### 3. GitHub Pages 部署

```bash
# 安装 gh-pages
npm install --save-dev gh-pages

# 在 package.json 中添加部署脚本
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}

# 部署到 GitHub Pages
npm run deploy
```

### 4. 服务器部署

#### 使用 Nginx

1. 构建项目：`npm run build`
2. 将 `build/` 目录上传到服务器
3. 配置 Nginx：

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/build;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # 静态资源缓存
    location /static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### 使用 Apache

在 `build/` 目录中创建 `.htaccess` 文件：

```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

## 微信小程序部署

### 环境准备

1. 微信开发者账号
2. 微信开发者工具
3. Taro 框架

### 部署步骤

```bash
# 安装 Taro CLI
npm install -g @tarojs/cli

# 创建小程序项目
taro init yijing-wechat

# 选择 React + TypeScript 模板
# 将现有组件迁移到 Taro 项目中

# 开发调试
npm run dev:weapp

# 构建发布
npm run build:weapp
```

详细的微信小程序部署指南请参考平台内的"微信部署"页面。

## 环境变量配置

创建 `.env` 文件（可选）：

```env
# API 基础URL（如果有后端API）
REACT_APP_API_BASE_URL=https://api.example.com

# 应用标题
REACT_APP_TITLE=周易学习平台

# 微信小程序 AppID（用于分享等功能）
REACT_APP_WECHAT_APPID=your-wechat-appid
```

## 性能优化

### 1. 代码分割

```javascript
// 使用 React.lazy 进行路由级别的代码分割
const Home = React.lazy(() => import('./components/Home'));
const Divination = React.lazy(() => import('./components/Divination'));
```

### 2. 图片优化

- 使用 WebP 格式图片
- 实现图片懒加载
- 压缩图片资源

### 3. 缓存策略

```javascript
// 在 public/index.html 中添加缓存策略
<meta http-equiv="Cache-Control" content="max-age=31536000">
```

## 监控和分析

### Google Analytics

```javascript
// 在 public/index.html 中添加
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 故障排除

### 常见问题

1. **构建失败**
   - 检查 Node.js 版本
   - 清除缓存：`npm cache clean --force`
   - 删除 node_modules 重新安装

2. **路由问题**
   - 确保服务器配置支持 SPA 路由
   - 检查 basename 配置

3. **样式问题**
   - 检查 CSS 导入顺序
   - 确认 Ant Design 样式正确加载

### 调试技巧

```bash
# 查看详细构建信息
npm run build -- --verbose

# 分析包大小
npx webpack-bundle-analyzer build/static/js/*.js
```

## 更新和维护

### 依赖更新

```bash
# 检查过时的依赖
npm outdated

# 更新依赖
npm update

# 更新到最新版本
npx npm-check-updates -u
npm install
```

### 安全检查

```bash
# 检查安全漏洞
npm audit

# 自动修复
npm audit fix
```

## 技术支持

如果在部署过程中遇到问题，可以：

1. 查看项目文档和 FAQ
2. 提交 Issue 到项目仓库
3. 联系技术支持团队

## 许可证

本项目采用 MIT 许可证，详情请查看 LICENSE 文件。

---

**祝您部署顺利！传承千年智慧，指导现代生活。** ☯️