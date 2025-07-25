# 🚀 周易学习平台一键部署指南

本项目提供了完整的一键部署解决方案，支持多个平台的自动化部署，包括网站部署和微信小程序部署。

## 📋 目录

- [快速开始](#快速开始)
- [部署选项](#部署选项)
- [网站部署](#网站部署)
- [微信小程序部署](#微信小程序部署)
- [环境配置](#环境配置)
- [故障排除](#故障排除)

## 🚀 快速开始

### 前置要求

- Node.js (版本 14 或更高)
- npm 或 yarn
- Git

### 安装依赖

```bash
npm install
```

## 🎯 部署选项

### 方式一：使用 Node.js 脚本

```bash
# 部署到 Vercel
node deploy.js vercel

# 部署到 Netlify
node deploy.js netlify

# 部署到 GitHub Pages
node deploy.js github

# 创建微信小程序项目
node deploy.js wechat

# 部署到所有网站平台
node deploy.js all
```

### 方式二：使用批处理脚本 (Windows)

```cmd
# 部署到 Vercel
deploy.bat vercel

# 部署到所有平台
deploy.bat all
```

### 方式三：使用 PowerShell 脚本 (Windows)

```powershell
# 部署到 Vercel
.\deploy.ps1 -Platform vercel

# 部署到所有平台
.\deploy.ps1 -Platform all
```

### 方式四：使用 npm 脚本

```bash
# 构建项目
npm run build

# 部署到 Vercel
npm run deploy:vercel

# 部署到 Netlify
npm run deploy:netlify

# 部署到 GitHub Pages
npm run deploy:github

# 部署到所有平台
npm run deploy:all
```

## 🌐 网站部署

### Vercel 部署

**优势：**
- 零配置部署
- 自动 HTTPS
- 全球 CDN
- 自动预览部署

**步骤：**
1. 注册 [Vercel](https://vercel.com) 账号
2. 运行部署命令：
   ```bash
   node deploy.js vercel
   ```
3. 首次部署时会要求登录和授权
4. 部署完成后会提供访问链接

### Netlify 部署

**优势：**
- 简单易用
- 表单处理
- 函数支持
- 分支预览

**步骤：**
1. 注册 [Netlify](https://netlify.com) 账号
2. 运行部署命令：
   ```bash
   node deploy.js netlify
   ```
3. 首次部署时会要求登录
4. 部署完成后会提供访问链接

### GitHub Pages 部署

**优势：**
- 免费托管
- 与 GitHub 集成
- 自定义域名支持

**步骤：**
1. 确保项目已推送到 GitHub
2. 运行部署命令：
   ```bash
   node deploy.js github
   ```
3. 在 GitHub 仓库设置中启用 Pages
4. 选择 `gh-pages` 分支作为源

## 📱 微信小程序部署

### 创建小程序项目

```bash
node deploy.js wechat
```

这将创建一个 `wechat-miniprogram` 目录，包含：
- `app.json` - 小程序配置文件
- `sitemap.json` - 站点地图配置
- 基础页面结构

### 开发流程

1. **环境准备**
   - 下载并安装 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
   - 注册微信小程序账号
   - 获取 AppID

2. **项目导入**
   - 打开微信开发者工具
   - 选择「导入项目」
   - 选择 `wechat-miniprogram` 目录
   - 输入 AppID

3. **开发调试**
   - 在开发者工具中进行开发
   - 实时预览和调试
   - 真机测试

4. **发布上线**
   - 点击「上传」按钮
   - 在微信公众平台提交审核
   - 审核通过后发布

### 使用 Taro 框架 (可选)

如果需要使用 Taro 框架进行跨平台开发：

```bash
# 安装 Taro CLI
npm install -g @tarojs/cli

# 创建 Taro 项目
taro init wechat-taro

# 编译为微信小程序
npm run build:weapp

# 开发模式
npm run dev:weapp
```

## ⚙️ 环境配置

### 环境变量

创建 `.env` 文件配置环境变量：

```env
# 生产环境配置
REACT_APP_API_BASE_URL=https://api.yijing.example.com
REACT_APP_ENVIRONMENT=production
GENERATE_SOURCEMAP=false

# 分析工具
REACT_APP_GA_TRACKING_ID=your-ga-tracking-id
REACT_APP_BAIDU_TRACKING_ID=your-baidu-tracking-id

# 微信小程序配置
REACT_APP_WECHAT_APPID=your-wechat-appid
```

### 部署配置

编辑 `deploy.config.json` 文件自定义部署配置：

```json
{
  "vercel": {
    "name": "your-project-name",
    "regions": ["hkg1", "sin1"]
  },
  "netlify": {
    "name": "your-site-name"
  },
  "github": {
    "repository": "username/repository-name",
    "cname": "your-domain.com"
  }
}
```

## 🔧 故障排除

### 常见问题

**1. 构建失败**
```bash
# 清理缓存
npm run clean
rm -rf node_modules package-lock.json
npm install

# 检查依赖
npm audit
npm audit fix
```

**2. 部署权限问题**
```bash
# Vercel 重新登录
vercel logout
vercel login

# Netlify 重新登录
netlify logout
netlify login
```

**3. GitHub Pages 404 错误**
- 确保仓库是公开的
- 检查 `gh-pages` 分支是否存在
- 验证 `PUBLIC_URL` 环境变量

**4. 微信小程序开发者工具问题**
- 确保使用最新版本的开发者工具
- 检查 AppID 是否正确
- 验证项目配置文件格式

### 调试命令

```bash
# 分析打包文件
npm run analyze

# 检查依赖更新
npm run check-updates

# 安全审计
npm run security-audit

# 查看构建详情
npm run build -- --verbose
```

### 性能优化

**代码分割**
```javascript
// 使用 React.lazy 进行代码分割
const LazyComponent = React.lazy(() => import('./LazyComponent'));
```

**图片优化**
- 使用 WebP 格式
- 实现懒加载
- 压缩图片文件

**缓存策略**
- 配置适当的 Cache-Control 头
- 使用 Service Worker
- 启用 CDN 缓存

## 📞 技术支持

如果遇到问题，可以：

1. 查看 [部署日志](#调试命令)
2. 检查 [常见问题](#常见问题)
3. 提交 [Issue](https://github.com/your-username/yijing-course/issues)
4. 联系技术支持团队

## 📄 许可证

本项目采用 MIT 许可证。详情请参阅 [LICENSE](LICENSE) 文件。

---

**祝您部署顺利！** 🎉