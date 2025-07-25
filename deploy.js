#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 颜色输出函数
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  title: (msg) => console.log(`\n${colors.cyan}${colors.bright}${msg}${colors.reset}\n`)
};

// 检查命令是否存在
function commandExists(command) {
  try {
    execSync(`${command} --version`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// 执行命令并处理错误
function runCommand(command, description) {
  try {
    log.info(`${description}...`);
    execSync(command, { stdio: 'inherit' });
    log.success(`${description} 完成`);
    return true;
  } catch (error) {
    log.error(`${description} 失败: ${error.message}`);
    return false;
  }
}

// 检查环境
function checkEnvironment() {
  log.title('🔍 检查部署环境');
  
  const checks = [
    { command: 'node', name: 'Node.js' },
    { command: 'npm', name: 'npm' }
  ];
  
  let allPassed = true;
  
  checks.forEach(({ command, name }) => {
    if (commandExists(command)) {
      log.success(`${name} 已安装`);
    } else {
      log.error(`${name} 未安装`);
      allPassed = false;
    }
  });
  
  return allPassed;
}

// 构建项目
function buildProject() {
  log.title('🏗️ 构建项目');
  return runCommand('npm run build', '构建生产版本');
}

// 部署到 Vercel
function deployToVercel() {
  log.title('🚀 部署到 Vercel');
  
  if (!commandExists('vercel')) {
    log.warning('Vercel CLI 未安装，正在安装...');
    if (!runCommand('npm install -g vercel', '安装 Vercel CLI')) {
      return false;
    }
  }
  
  return runCommand('vercel --prod', '部署到 Vercel');
}

// 部署到 Netlify
function deployToNetlify() {
  log.title('🌐 部署到 Netlify');
  
  if (!commandExists('netlify')) {
    log.warning('Netlify CLI 未安装，正在安装...');
    if (!runCommand('npm install -g netlify-cli', '安装 Netlify CLI')) {
      return false;
    }
  }
  
  return runCommand('netlify deploy --prod --dir=build', '部署到 Netlify');
}

// 部署到 GitHub Pages
function deployToGitHub() {
  log.title('📚 部署到 GitHub Pages');
  
  // 检查是否安装了 gh-pages
  try {
    require.resolve('gh-pages');
  } catch {
    log.warning('gh-pages 未安装，正在安装...');
    if (!runCommand('npm install --save-dev gh-pages', '安装 gh-pages')) {
      return false;
    }
  }
  
  return runCommand('npm run deploy:github', '部署到 GitHub Pages');
}

// 创建微信小程序项目结构
function createWechatProject() {
  log.title('📱 创建微信小程序项目');
  
  const wechatDir = path.join(process.cwd(), 'wechat-miniprogram');
  
  if (!fs.existsSync(wechatDir)) {
    fs.mkdirSync(wechatDir);
    log.success('创建微信小程序目录');
  }
  
  // 创建 app.json
  const appConfig = {
    pages: [
      'pages/index/index',
      'pages/divination/divination',
      'pages/library/library',
      'pages/learning/learning'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#667eea',
      navigationBarTitleText: '周易学习平台',
      navigationBarTextStyle: 'white',
      backgroundColor: '#f8f9fa'
    },
    tabBar: {
      color: '#666',
      selectedColor: '#722ed1',
      backgroundColor: '#ffffff',
      list: [
        {
          pagePath: 'pages/index/index',
          text: '首页',
          iconPath: 'images/home.png',
          selectedIconPath: 'images/home-active.png'
        },
        {
          pagePath: 'pages/divination/divination',
          text: '占卜',
          iconPath: 'images/divination.png',
          selectedIconPath: 'images/divination-active.png'
        },
        {
          pagePath: 'pages/library/library',
          text: '卦象',
          iconPath: 'images/library.png',
          selectedIconPath: 'images/library-active.png'
        },
        {
          pagePath: 'pages/learning/learning',
          text: '学习',
          iconPath: 'images/learning.png',
          selectedIconPath: 'images/learning-active.png'
        }
      ]
    },
    sitemapLocation: 'sitemap.json'
  };
  
  fs.writeFileSync(
    path.join(wechatDir, 'app.json'),
    JSON.stringify(appConfig, null, 2)
  );
  
  // 创建 sitemap.json
  const sitemap = {
    desc: '关于本文件的更多信息，请参考文档 https://developers.weixin.qq.com/miniprogram/dev/framework/sitemap.html',
    rules: [{
      action: 'allow',
      page: '*'
    }]
  };
  
  fs.writeFileSync(
    path.join(wechatDir, 'sitemap.json'),
    JSON.stringify(sitemap, null, 2)
  );
  
  log.success('微信小程序配置文件创建完成');
  log.info(`项目路径: ${wechatDir}`);
  log.info('请使用微信开发者工具打开该目录进行开发');
  
  return true;
}

// 主函数
function main() {
  const args = process.argv.slice(2);
  const platform = args[0];
  
  console.log(`
${colors.magenta}${colors.bright}🌟 周易学习平台一键部署工具${colors.reset}\n`);
  
  if (!checkEnvironment()) {
    log.error('环境检查失败，请安装必要的依赖后重试');
    process.exit(1);
  }
  
  switch (platform) {
    case 'vercel':
      if (buildProject() && deployToVercel()) {
        log.success('🎉 Vercel 部署成功！');
      }
      break;
      
    case 'netlify':
      if (buildProject() && deployToNetlify()) {
        log.success('🎉 Netlify 部署成功！');
      }
      break;
      
    case 'github':
      if (buildProject() && deployToGitHub()) {
        log.success('🎉 GitHub Pages 部署成功！');
      }
      break;
      
    case 'wechat':
      if (createWechatProject()) {
        log.success('🎉 微信小程序项目创建成功！');
      }
      break;
      
    case 'all':
      if (buildProject()) {
        let successCount = 0;
        
        if (deployToVercel()) successCount++;
        if (deployToNetlify()) successCount++;
        if (deployToGitHub()) successCount++;
        
        log.success(`🎉 完成部署！成功部署到 ${successCount} 个平台`);
      }
      break;
      
    default:
      console.log(`
使用方法: node deploy.js <platform>

可用平台:
  vercel    - 部署到 Vercel
  netlify   - 部署到 Netlify
  github    - 部署到 GitHub Pages
  wechat    - 创建微信小程序项目
  all       - 部署到所有网站平台

示例:
  node deploy.js vercel
  node deploy.js all
`);
      break;
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  checkEnvironment,
  buildProject,
  deployToVercel,
  deployToNetlify,
  deployToGitHub,
  createWechatProject
};