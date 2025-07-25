import React, { useState } from 'react';
import { Card, Collapse, Typography, Row, Col, Timeline, Tag, Space, Divider, Tabs, Progress, Button } from 'antd';
import { ReadOutlined, BulbOutlined, HistoryOutlined, BookOutlined, BarChartOutlined, TrophyOutlined } from '@ant-design/icons';
import { learningMaterials, trigrams } from '../data/yijingData';
import LearningProgress from './LearningProgress';
import styled from 'styled-components';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const LearningContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`;

const TrigramCard = styled(Card)`
  text-align: center;
  height: 100%;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.1);
  }
  
  .trigram-symbol {
    font-size: 3rem;
    color: #722ed1;
    margin: 15px 0;
  }
`;

const ConceptCard = styled(Card)`
  margin-bottom: 20px;
  border-left: 4px solid #1890ff;
  
  .concept-title {
    color: #1890ff;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

const LearningCenter = () => {
  const [activeKey, setActiveKey] = useState(['1', '2', '3', '4', '5']);
  const [expandedApps, setExpandedApps] = useState({});
  


  const yijingHistory = [
    {
      period: '远古时期',
      event: '伏羲画八卦',
      description: '传说伏羲氏观察天地万物，创制了最初的八卦符号，奠定了易学基础。'
    },
    {
      period: '商周时期',
      event: '《周易》成书',
      description: '周文王被囚羑里时，在八卦基础上推演出六十四卦，并作卦辞。'
    },
    {
      period: '春秋时期',
      event: '孔子作《易传》',
      description: '孔子深研《周易》，作《十翼》（易传），为易学注入了深刻的哲学思想。'
    },
    {
      period: '汉代',
      event: '易学兴盛',
      description: '汉代学者对《周易》进行系统整理和注释，形成了完整的易学体系。'
    },
    {
      period: '宋明时期',
      event: '理学发展',
      description: '宋明理学家将易学与儒家思想结合，发展出新的哲学体系。'
    },
    {
      period: '现代',
      event: '易学复兴',
      description: '现代学者重新审视易学价值，将其应用于心理学、管理学等多个领域。'
    }
  ];

  const basicConcepts = [
    {
      title: '阴阳学说',
      content: '阴阳是中国古代哲学的基本概念，认为万事万物都存在着相互对立又相互依存的两个方面。阴代表柔、静、暗、冷等属性，阳代表刚、动、明、热等属性。阴阳相互转化，推动着事物的发展变化。'
    },
    {
      title: '五行学说',
      content: '五行指金、木、水、火、土五种基本元素，它们之间存在着相生相克的关系。相生：木生火、火生土、土生金、金生水、水生木。相克：木克土、土克水、水克火、火克金、金克木。'
    },
    {
      title: '天人合一',
      content: '天人合一是易学的核心思想，认为人与自然、人与宇宙是一个有机的整体。人应该顺应自然规律，与天地万物和谐共处，这样才能达到最佳的生存状态。'
    },
    {
      title: '变易思想',
      content: '《周易》强调"易"即变化，认为变化是宇宙的根本规律。万事万物都在不断变化中，没有永恒不变的事物。理解和掌握变化规律，是智慧生活的关键。'
    }
  ];

  const practicalApplications = [
    {
      area: '个人修养',
      description: '通过学习易经，培养辩证思维，提高处理复杂问题的能力，增强人生智慧。'
    },
    {
      area: '决策指导',
      description: '运用易经思维分析形势，把握时机，做出更明智的人生选择。'
    },
    {
      area: '人际关系',
      description: '理解阴阳互补原理，改善人际关系，建立和谐的社交网络。'
    },
    {
      area: '事业发展',
      description: '掌握进退之道，在事业发展中把握节奏，避免盲目冒进或过度保守。'
    },
    {
      area: '健康养生',
      description: '运用阴阳平衡理念，调节生活作息，保持身心健康。'
    }
  ];

  const tabItems = [
    {
      key: 'materials',
      label: (
        <span>
          <BookOutlined />
          学习资料
        </span>
      ),
      children: (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Collapse 
            activeKey={activeKey} 
            onChange={setActiveKey}
            size="large"
            items={[
              {
                key: '1',
                label: <><HistoryOutlined /> 周易发展历史</>,
                children: (
                  <Card>
                    <Timeline 
                       mode="left"
                       items={yijingHistory.map((item, index) => ({
                         key: index,
                         label: <Tag color="blue">{item.period}</Tag>,
                         children: (
                           <div>
                             <Title level={4} style={{ margin: '0 0 8px 0' }}>{item.event}</Title>
                             <Paragraph>{item.description}</Paragraph>
                           </div>
                         )
                       }))}
                     />
                  </Card>
                )
              },
              {
                key: '2',
                label: <><BulbOutlined /> 基础概念</>,
                children: (
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    {basicConcepts.map((concept, index) => (
                      <ConceptCard key={index} size="small">
                        <div className="concept-title">{concept.title}</div>
                        <Paragraph>{concept.content}</Paragraph>
                      </ConceptCard>
                    ))}
                  </Space>
                )
              },
              {
                   key: '3',
                   label: <><BookOutlined /> 八卦详解</>,
                   children: (
                     <>
                       <Row gutter={[16, 16]}>
                         {Object.entries(trigrams).map(([name, info]) => (
                           <Col xs={24} sm={12} md={8} lg={6} key={name}>
                             <TrigramCard size="small">
                               <div className="trigram-symbol">{info.symbol}</div>
                               <Title level={4} style={{ margin: '10px 0' }}>{name}</Title>
                               <Space direction="vertical" size="small">
                                 <Tag color="blue">{info.element}行</Tag>
                                 <Tag color="green">{info.direction}</Tag>
                                 <Text type="secondary">{info.meaning}</Text>
                               </Space>
                             </TrigramCard>
                           </Col>
                         ))}
                       </Row>
                       <Divider />
                       <Card size="small" style={{ background: '#f6ffed' }}>
                         <Title level={4} style={{ color: '#389e0d' }}>八卦组合规律</Title>
                         <Paragraph>
                           八卦两两相重，形成六十四卦。上卦称为"外卦"或"上体"，下卦称为"内卦"或"下体"。
                           每个卦象都有其独特的象征意义和指导价值，通过学习八卦的基本属性，
                           可以更好地理解六十四卦的深层含义。
                         </Paragraph>
                       </Card>
                     </>
                   )
                 },
                {
                   key: '4',
                   label: <><BulbOutlined /> 学习资料</>,
                   children: (
                     <Row gutter={[16, 16]}>
                       {learningMaterials.map((material, index) => (
                         <Col xs={24} md={12} lg={8} key={index}>
                           <Card 
                             title={material.title}
                             size="small"
                             style={{ height: '100%' }}
                             extra={<Tag color="blue">{material.difficulty}</Tag>}
                           >
                             <Paragraph style={{ marginBottom: '12px', color: '#666' }}>
                               {material.description}
                             </Paragraph>
                             <Title level={5}>学习内容：</Title>
                             <Collapse 
                               size="small" 
                               ghost
                               items={material.content.map((item, itemIndex) => ({
                                 key: itemIndex,
                                 label: <Text strong>{item}</Text>,
                                 children: (
                                   <div style={{ padding: '12px 0' }}>
                                     {material.title === '周易基础知识' && itemIndex === 0 && (
                                       <div>
                                         <Paragraph>周易起源于中国古代，是一部关于变化哲学的经典著作。</Paragraph>
                                         <ul>
                                           <li>传说由伏羲创制八卦</li>
                                           <li>周文王演为六十四卦</li>
                                           <li>孔子作《十翼》进行注解</li>
                                           <li>历代学者不断发展完善</li>
                                         </ul>
                                       </div>
                                     )}
                                     {material.title === '周易基础知识' && itemIndex === 1 && (
                                       <div>
                                         <Paragraph>阴阳学说是周易的核心理论，认为万物都由阴阳两种对立统一的力量构成。</Paragraph>
                                         <ul>
                                           <li>阴（⚋）：代表柔、静、暗、冷、女性等</li>
                                           <li>阳（⚊）：代表刚、动、明、热、男性等</li>
                                           <li>阴阳相互依存、相互转化</li>
                                           <li>阴阳平衡是和谐的基础</li>
                                         </ul>
                                       </div>
                                     )}
                                     {material.title === '周易基础知识' && itemIndex === 2 && (
                                       <div>
                                         <Paragraph>八卦是由三个爻（阴爻或阳爻）组成的符号系统，代表八种基本的自然现象。</Paragraph>
                                         <ul>
                                           <li>乾（☰）：天，代表刚健、创造</li>
                                           <li>坤（☷）：地，代表柔顺、承载</li>
                                           <li>震（☳）：雷，代表震动、奋起</li>
                                           <li>巽（☴）：风，代表渗透、顺从</li>
                                           <li>坎（☵）：水，代表险陷、流动</li>
                                           <li>离（☲）：火，代表光明、依附</li>
                                           <li>艮（☶）：山，代表静止、阻止</li>
                                           <li>兑（☱）：泽，代表喜悦、交流</li>
                                         </ul>
                                       </div>
                                     )}
                                     {material.title === '周易基础知识' && itemIndex === 3 && (
                                       <div>
                                         <Paragraph>六十四卦是由两个八卦（上卦和下卦）重叠而成，共有64种组合。</Paragraph>
                                         <ul>
                                           <li>每卦由六个爻组成（六爻卦）</li>
                                           <li>上三爻称为上卦（外卦）</li>
                                           <li>下三爻称为下卦（内卦）</li>
                                           <li>8×8=64种不同的卦象组合</li>
                                           <li>每卦都有特定的含义和象征</li>
                                         </ul>
                                       </div>
                                     )}
                                     {material.title === '卦象解读方法' && itemIndex === 0 && (
                                        <div>
                                          <Paragraph>卦象结构分析是理解卦象含义的基础，需要从多个层面进行解读。</Paragraph>
                                          <ul>
                                            <li>观察卦象的整体形态和构成</li>
                                            <li>分析上卦和下卦的组合关系</li>
                                            <li>识别主卦和变卦的差异</li>
                                            <li>理解卦象的时空背景</li>
                                          </ul>
                                        </div>
                                      )}
                                      {material.title === '卦象解读方法' && itemIndex === 1 && (
                                        <div>
                                          <Paragraph>上下卦的关系解读是卦象分析的核心，体现了事物的内外关系。</Paragraph>
                                          <ul>
                                            <li>上卦代表外在环境、结果、未来</li>
                                            <li>下卦代表内在状态、原因、现在</li>
                                            <li>上下卦的五行生克关系</li>
                                            <li>卦象间的相互作用和影响</li>
                                          </ul>
                                        </div>
                                      )}
                                      {material.title === '卦象解读方法' && itemIndex === 2 && (
                                        <div>
                                          <Paragraph>变爻是卦象变化的关键，代表事物发展的转折点和动力。</Paragraph>
                                          <ul>
                                            <li>变爻的位置决定变化的性质</li>
                                            <li>多个变爻的综合影响分析</li>
                                            <li>变爻与主卦的关系解读</li>
                                            <li>变化趋势的预测方法</li>
                                          </ul>
                                        </div>
                                      )}
                                      {material.title === '卦象解读方法' && itemIndex === 3 && (
                                        <div>
                                          <Paragraph>卦辞和爻辞是周易的核心文本，包含了深刻的哲学智慧。</Paragraph>
                                          <ul>
                                            <li>卦辞的整体含义和象征</li>
                                            <li>爻辞的具体指导和建议</li>
                                            <li>古文字的现代理解方法</li>
                                            <li>结合现实情况的灵活解读</li>
                                          </ul>
                                        </div>
                                      )}
                                      {material.title === '实用占卜技巧' && itemIndex === 0 && (
                                        <div>
                                          <Paragraph>占卜前的心理准备是获得准确卦象的重要前提。</Paragraph>
                                          <ul>
                                            <li>保持内心的平静和专注</li>
                                            <li>清除杂念，专心于问题</li>
                                            <li>选择合适的时间和环境</li>
                                            <li>建立与周易的精神连接</li>
                                          </ul>
                                        </div>
                                      )}
                                      {material.title === '实用占卜技巧' && itemIndex === 1 && (
                                        <div>
                                          <Paragraph>正确的问题提出方式直接影响占卜的准确性和实用性。</Paragraph>
                                          <ul>
                                            <li>问题要具体明确，避免模糊</li>
                                            <li>关注可控因素，而非绝对结果</li>
                                            <li>询问如何行动，而非是否可能</li>
                                            <li>一次占卜专注一个核心问题</li>
                                          </ul>
                                        </div>
                                      )}
                                      {material.title === '实用占卜技巧' && itemIndex === 2 && (
                                        <div>
                                          <Paragraph>卦象的综合分析需要整合多个层面的信息。</Paragraph>
                                          <ul>
                                            <li>结合卦象、爻象、变象的信息</li>
                                            <li>考虑时间因素和发展趋势</li>
                                            <li>分析有利和不利的因素</li>
                                            <li>提供具体可行的行动建议</li>
                                          </ul>
                                        </div>
                                      )}
                                      {material.title === '实用占卜技巧' && itemIndex === 3 && (
                                        <div>
                                          <Paragraph>将卦象智慧应用到实际生活是学习周易的最终目标。</Paragraph>
                                          <ul>
                                            <li>在决策时参考卦象的指导</li>
                                            <li>用周易思维分析人际关系</li>
                                            <li>在工作中运用阴阳平衡原理</li>
                                            <li>培养顺应自然规律的生活方式</li>
                                          </ul>
                                        </div>
                                      )}
                                      {!['周易基础知识', '卦象解读方法', '实用占卜技巧'].includes(material.title) && (
                                        <Paragraph style={{ color: '#666', fontStyle: 'italic' }}>
                                          点击展开查看详细内容...
                                        </Paragraph>
                                      )}
                                   </div>
                                 )
                               }))}
                             />
                           </Card>
                         </Col>
                       ))}
                     </Row>
                   )
                 },
                 {
                   key: '5',
                   label: <><BulbOutlined /> 实用应用</>,
                   children: (
                     <div>
                       <Row gutter={[16, 16]}>
                         {practicalApplications.map((app, index) => (
                           <Col xs={24} sm={12} md={8} key={index}>
                             <Card 
                               title={app.area}
                               size="small"
                               style={{ height: '100%', cursor: 'pointer' }}
                               headStyle={{ background: '#f0f2f5', color: '#1890ff' }}
                               onClick={() => setExpandedApps(prev => ({ ...prev, [index]: !prev[index] }))}
                             >
                               <Paragraph>{app.description}</Paragraph>
                               {expandedApps[index] && (
                                 <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #f0f0f0' }}>
                                   {index === 0 && (
                                     <div>
                                       <Title level={5} style={{ color: '#722ed1' }}>具体实践方法：</Title>
                                       <ul>
                                         <li>每日反思：运用易经思维审视自己的行为和决策</li>
                                         <li>阴阳平衡：在工作与休息、进取与退让之间寻找平衡</li>
                                         <li>变化适应：培养面对变化的从容心态和应对能力</li>
                                         <li>道德修养：以易经中的君子品格要求自己</li>
                                       </ul>
                                     </div>
                                   )}
                                   {index === 1 && (
                                     <div>
                                       <Title level={5} style={{ color: '#722ed1' }}>决策分析框架：</Title>
                                       <ul>
                                         <li>时机分析：判断当前是进取还是保守的时机</li>
                                         <li>形势评估：全面分析内外环境和有利不利因素</li>
                                         <li>风险预判：运用易经变化规律预测可能的结果</li>
                                         <li>行动策略：制定符合易经智慧的具体行动方案</li>
                                       </ul>
                                     </div>
                                   )}
                                   {index === 2 && (
                                     <div>
                                       <Title level={5} style={{ color: '#722ed1' }}>人际交往智慧：</Title>
                                       <ul>
                                         <li>阴阳互补：理解每个人的不同特质，求同存异</li>
                                         <li>刚柔并济：在坚持原则和灵活变通之间找到平衡</li>
                                         <li>和而不同：保持自己的独特性，同时与他人和谐相处</li>
                                         <li>因时制宜：根据不同情况调整沟通方式和策略</li>
                                       </ul>
                                     </div>
                                   )}
                                   {index === 3 && (
                                     <div>
                                       <Title level={5} style={{ color: '#722ed1' }}>事业发展策略：</Title>
                                       <ul>
                                         <li>审时度势：准确判断行业趋势和发展机遇</li>
                                         <li>进退有度：知道何时积极进取，何时韬光养晦</li>
                                         <li>团队协作：运用易经智慧处理团队关系和冲突</li>
                                         <li>长远规划：以易经的长远眼光制定职业发展计划</li>
                                       </ul>
                                     </div>
                                   )}
                                   {index === 4 && (
                                     <div>
                                       <Title level={5} style={{ color: '#722ed1' }}>养生保健方法：</Title>
                                       <ul>
                                         <li>作息规律：顺应自然节律，保持良好的生活作息</li>
                                         <li>情绪调节：运用阴阳平衡理念管理情绪和压力</li>
                                         <li>饮食调养：根据季节变化和个人体质调整饮食</li>
                                         <li>运动养生：选择适合的运动方式，保持身心活力</li>
                                       </ul>
                                     </div>
                                   )}
                                 </div>
                               )}
                             </Card>
                           </Col>
                         ))}
                       </Row>
                       <Divider />
                       <Card size="small" style={{ background: '#fff7e6' }}>
                         <Title level={4} style={{ color: '#d48806' }}>学习建议</Title>
                         <Paragraph>
                           学习周易需要循序渐进，建议先掌握基本概念，再学习八卦含义，
                           最后深入研究六十四卦。重要的是要将理论与实践相结合，
                           在日常生活中运用易经智慧，逐步提高自己的思维层次和人生境界。
                         </Paragraph>
                       </Card>
                     </div>
                   )
                 }
               ]}
           />
        </Space>
      )
    },
    {
      key: 'progress',
      label: (
        <span>
          <BarChartOutlined />
          学习进度
        </span>
      ),
      children: <LearningProgress />
    }
  ];

  return (
    <LearningContainer>
      <Card>
        <Title level={2} style={{ textAlign: 'center', color: '#722ed1' }}>
          <ReadOutlined /> 周易学习中心
        </Title>
        <Paragraph style={{ textAlign: 'center', fontSize: '16px' }}>
          深入了解周易文化，掌握古代智慧，指导现代生活
        </Paragraph>
      </Card>

      <div style={{ marginTop: '20px' }}>
        <Tabs
          defaultActiveKey="materials"
          items={tabItems}
          size="large"
        />
      </div>
    </LearningContainer>
  );
};

export default LearningCenter;