import React, { useState } from 'react';
import { Card, Steps, Typography, Button, Alert, Space, Divider, Collapse, Tag } from 'antd';
import { 
  WechatOutlined, 
  DownloadOutlined, 
  CodeOutlined,
  CloudUploadOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import styled from 'styled-components';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const DeployContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
`;

const CodeBlock = styled.pre`
  background: #f6f8fa;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  padding: 16px;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.45;
  margin: 16px 0;
`;

const FeatureCard = styled(Card)`
  margin-bottom: 16px;
  border-left: 4px solid #1890ff;
  
  .feature-title {
    color: #1890ff;
    font-weight: bold;
    margin-bottom: 8px;
  }
`;

const WechatDeploy = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const deploySteps = [
    {
      title: '准备开发环境',
      description: '安装微信开发者工具和相关依赖'
    },
    {
      title: '项目配置',
      description: '配置小程序基本信息和页面结构'
    },
    {
      title: '代码适配',
      description: '将React代码转换为小程序格式'
    },
    {
      title: '测试部署',
      description: '在开发者工具中测试和预览'
    },
    {
      title: '发布上线',
      description: '提交审核并发布到微信平台'
    }
  ];

  const wechatConfig = `{
  "pages": [
    "pages/index/index",
    "pages/divination/divination",
    "pages/library/library",
    "pages/learning/learning"
  ],
  "window": {
    "backgroundTextStyle": "light",
    "navigationBarBackgroundColor": "#667eea",
    "navigationBarTitleText": "周易学习平台",
    "navigationBarTextStyle": "white",
    "backgroundColor": "#f8f9fa"
  },
  "tabBar": {
    "color": "#666",
    "selectedColor": "#722ed1",
    "backgroundColor": "#ffffff",
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": "images/home.png",
        "selectedIconPath": "images/home-active.png"
      },
      {
        "pagePath": "pages/divination/divination",
        "text": "占卜",
        "iconPath": "images/divination.png",
        "selectedIconPath": "images/divination-active.png"
      },
      {
        "pagePath": "pages/library/library",
        "text": "卦象",
        "iconPath": "images/library.png",
        "selectedIconPath": "images/library-active.png"
      },
      {
        "pagePath": "pages/learning/learning",
        "text": "学习",
        "iconPath": "images/learning.png",
        "selectedIconPath": "images/learning-active.png"
      }
    ]
  },
  "permission": {
    "scope.userLocation": {
      "desc": "用于占卜时的地理位置参考"
    }
  },
  "sitemapLocation": "sitemap.json"
}`;

  const packageJson = `{
  "name": "yijing-wechat",
  "version": "1.0.0",
  "description": "周易学习平台微信小程序版",
  "main": "app.js",
  "scripts": {
    "build": "taro build --type weapp",
    "dev": "taro build --type weapp --watch",
    "upload": "taro upload --type weapp"
  },
  "dependencies": {
    "@tarojs/components": "^3.6.0",
    "@tarojs/runtime": "^3.6.0",
    "@tarojs/taro": "^3.6.0",
    "@tarojs/plugin-platform-weapp": "^3.6.0"
  }
}`;

  const features = [
    {
      title: '响应式设计',
      description: '完美适配微信小程序界面，支持各种屏幕尺寸'
    },
    {
      title: '离线功能',
      description: '核心功能支持离线使用，无网络也能进行占卜学习'
    },
    {
      title: '分享功能',
      description: '一键分享卦象解读到微信好友或朋友圈'
    },
    {
      title: '个人中心',
      description: '记录学习进度和占卜历史，个性化学习体验'
    }
  ];

  const requirements = [
    '微信开发者账号（个人或企业）',
    '微信开发者工具（最新版本）',
    'Node.js 环境（v14.0+）',
    'Taro 框架（推荐使用）',
    '小程序 AppID'
  ];

  return (
    <DeployContainer>
      <Card>
        <Title level={2} style={{ textAlign: 'center', color: '#722ed1' }}>
          <WechatOutlined /> 微信小程序部署
        </Title>
        <Paragraph style={{ textAlign: 'center', fontSize: '16px' }}>
          将周易学习平台部署为微信小程序，让更多用户便捷使用
        </Paragraph>
      </Card>

      <Alert
        message="部署提示"
        description="微信小程序版本将保留核心功能，并针对移动端进行优化。部署前请确保已获得微信小程序开发资质。"
        type="info"
        showIcon
        style={{ margin: '20px 0' }}
      />

      <Card title="部署流程" style={{ marginBottom: '20px' }}>
        <Steps
          current={currentStep}
          direction="vertical"
          items={deploySteps}
          onChange={setCurrentStep}
        />
      </Card>

      <Collapse defaultActiveKey={['1']} size="large">
        <Panel header={<><InfoCircleOutlined /> 环境要求</>} key="1">
          <Card size="small">
            <Title level={4}>开发环境准备</Title>
            <ul>
              {requirements.map((req, index) => (
                <li key={index} style={{ marginBottom: '8px' }}>
                  <Text>{req}</Text>
                </li>
              ))}
            </ul>
            <Divider />
            <Space>
              <Button 
                type="primary" 
                icon={<DownloadOutlined />}
                onClick={() => window.open('https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html', '_blank')}
              >
                下载开发者工具
              </Button>
              <Button 
                icon={<CodeOutlined />}
                onClick={() => window.open('https://taro-docs.jd.com/', '_blank')}
              >
                Taro 文档
              </Button>
            </Space>
          </Card>
        </Panel>

        <Panel header={<><CodeOutlined /> 项目配置</>} key="2">
          <Card size="small">
            <Title level={4}>app.json 配置文件</Title>
            <Paragraph>小程序的全局配置文件，定义页面路径、窗口样式、标签栏等：</Paragraph>
            <CodeBlock>{wechatConfig}</CodeBlock>
            
            <Title level={4}>package.json 依赖配置</Title>
            <Paragraph>项目依赖和构建脚本配置：</Paragraph>
            <CodeBlock>{packageJson}</CodeBlock>
          </Card>
        </Panel>

        <Panel header={<><CloudUploadOutlined /> 功能特性</>} key="3">
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            {features.map((feature, index) => (
              <FeatureCard key={index} size="small">
                <div className="feature-title">{feature.title}</div>
                <Paragraph>{feature.description}</Paragraph>
              </FeatureCard>
            ))}
          </Space>
        </Panel>

        <Panel header={<><CheckCircleOutlined /> 部署步骤</>} key="4">
          <Card size="small">
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <Title level={4}>1. 创建小程序项目</Title>
                <CodeBlock>{`# 安装 Taro CLI
npm install -g @tarojs/cli

# 创建项目
taro init yijing-wechat

# 选择模板：React + TypeScript`}</CodeBlock>
              </div>
              
              <div>
                <Title level={4}>2. 配置项目</Title>
                <CodeBlock>{`# 进入项目目录
cd yijing-wechat

# 安装依赖
npm install

# 配置 AppID（在 project.config.json 中）
{
  "appid": "your-app-id",
  "projectname": "yijing-wechat"
}`}</CodeBlock>
              </div>
              
              <div>
                <Title level={4}>3. 开发调试</Title>
                <CodeBlock>{`# 启动开发模式
npm run dev:weapp

# 在微信开发者工具中导入项目
# 选择 dist 目录作为项目根目录`}</CodeBlock>
              </div>
              
              <div>
                <Title level={4}>4. 构建发布</Title>
                <CodeBlock>{`# 构建生产版本
npm run build:weapp

# 在开发者工具中点击"上传"按钮
# 填写版本号和项目备注
# 提交代码审核`}</CodeBlock>
              </div>
            </Space>
          </Card>
        </Panel>

        <Panel header={<><WechatOutlined /> 发布注意事项</>} key="5">
          <Card size="small">
            <Alert
              message="重要提醒"
              description="小程序发布需要通过微信官方审核，请确保内容合规，功能完整。"
              type="warning"
              showIcon
              style={{ marginBottom: '20px' }}
            />
            
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div>
                <Text strong>审核要点：</Text>
                <ul style={{ marginTop: '8px' }}>
                  <li>确保所有功能正常运行</li>
                  <li>页面加载速度符合要求</li>
                  <li>用户隐私政策完善</li>
                  <li>内容健康积极向上</li>
                </ul>
              </div>
              
              <div>
                <Text strong>优化建议：</Text>
                <ul style={{ marginTop: '8px' }}>
                  <li>压缩图片资源，减小包体积</li>
                  <li>使用懒加载提升性能</li>
                  <li>添加错误处理和用户反馈</li>
                  <li>适配不同设备屏幕</li>
                </ul>
              </div>
              
              <Divider />
              
              <div style={{ textAlign: 'center' }}>
                <Space size="large">
                  <Tag color="blue">预计审核时间：1-7个工作日</Tag>
                  <Tag color="green">发布后即可在微信中搜索使用</Tag>
                </Space>
              </div>
            </Space>
          </Card>
        </Panel>
      </Collapse>

      <Card style={{ marginTop: '20px', background: '#f6ffed' }}>
        <Title level={4} style={{ color: '#389e0d' }}>技术支持</Title>
        <Paragraph>
          如果在部署过程中遇到问题，可以参考微信官方文档或联系技术支持。
          我们也提供完整的部署服务，帮助您快速上线微信小程序版本。
        </Paragraph>
        <Space>
          <Button 
            type="primary"
            onClick={() => window.open('https://developers.weixin.qq.com/miniprogram/dev/framework/', '_blank')}
          >
            微信官方文档
          </Button>
          <Button>
            联系技术支持
          </Button>
        </Space>
      </Card>
    </DeployContainer>
  );
};

export default WechatDeploy;