import React, { useState, useEffect } from 'react';
import { Card, Progress, Typography, Space, List, Button, Tag, Modal, Statistic, Row, Col } from 'antd';
import { 
  BookOutlined, 
  TrophyOutlined, 
  ClockCircleOutlined, 
  CheckCircleOutlined,
  StarOutlined,
  FireOutlined,
  CalendarOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import { hexagrams, learningMaterials } from '../data/yijingData';
import styled from 'styled-components';

const { Title, Text, Paragraph } = Typography;

const ProgressContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const AchievementCard = styled(Card)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  
  .ant-card-body {
    text-align: center;
  }
  
  .ant-statistic-title {
    color: rgba(255, 255, 255, 0.8) !important;
  }
  
  .ant-statistic-content {
    color: white !important;
  }
`;

const LessonItem = styled.div`
  padding: 16px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  margin-bottom: 12px;
  background: white;
  transition: all 0.3s;
  
  &:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    border-color: #1890ff;
  }
  
  &.completed {
    background: #f6ffed;
    border-color: #52c41a;
  }
`;

function LearningProgress() {
  const [progress, setProgress] = useState({
    completedLessons: [],
    studyTime: 0,
    streak: 0,
    lastStudyDate: null,
    achievements: [],
    hexagramsLearned: []
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);

  // 从localStorage加载学习进度
  useEffect(() => {
    const savedProgress = localStorage.getItem('learning_progress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        setProgress(parsed);
      } catch (error) {
        console.error('Failed to parse progress:', error);
      }
    }
  }, []);

  // 保存学习进度
  const saveProgress = (newProgress) => {
    localStorage.setItem('learning_progress', JSON.stringify(newProgress));
    setProgress(newProgress);
  };

  // 完成课程
  const completeLesson = (lessonId) => {
    const newProgress = { ...progress };
    
    if (!newProgress.completedLessons.includes(lessonId)) {
      newProgress.completedLessons.push(lessonId);
      newProgress.studyTime += 30; // 假设每课程30分钟
      
      // 更新连续学习天数
      const today = new Date().toDateString();
      const lastStudy = newProgress.lastStudyDate;
      
      if (lastStudy) {
        const lastDate = new Date(lastStudy);
        const todayDate = new Date(today);
        const diffTime = todayDate - lastDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          newProgress.streak += 1;
        } else if (diffDays > 1) {
          newProgress.streak = 1;
        }
      } else {
        newProgress.streak = 1;
      }
      
      newProgress.lastStudyDate = today;
      
      // 检查成就
      checkAchievements(newProgress);
      
      saveProgress(newProgress);
    }
  };

  // 检查成就
  const checkAchievements = (currentProgress) => {
    const achievements = [];
    
    // 学习时长成就
    if (currentProgress.studyTime >= 60 && !currentProgress.achievements.includes('study_1h')) {
      achievements.push('study_1h');
    }
    if (currentProgress.studyTime >= 300 && !currentProgress.achievements.includes('study_5h')) {
      achievements.push('study_5h');
    }
    if (currentProgress.studyTime >= 600 && !currentProgress.achievements.includes('study_10h')) {
      achievements.push('study_10h');
    }
    
    // 连续学习成就
    if (currentProgress.streak >= 3 && !currentProgress.achievements.includes('streak_3')) {
      achievements.push('streak_3');
    }
    if (currentProgress.streak >= 7 && !currentProgress.achievements.includes('streak_7')) {
      achievements.push('streak_7');
    }
    if (currentProgress.streak >= 30 && !currentProgress.achievements.includes('streak_30')) {
      achievements.push('streak_30');
    }
    
    // 课程完成成就
    if (currentProgress.completedLessons.length >= 5 && !currentProgress.achievements.includes('lessons_5')) {
      achievements.push('lessons_5');
    }
    if (currentProgress.completedLessons.length >= 10 && !currentProgress.achievements.includes('lessons_10')) {
      achievements.push('lessons_10');
    }
    
    currentProgress.achievements = [...currentProgress.achievements, ...achievements];
  };

  // 获取成就信息
  const getAchievementInfo = (achievementId) => {
    const achievements = {
      'study_1h': { title: '初学者', description: '累计学习1小时', icon: '📚' },
      'study_5h': { title: '勤奋学者', description: '累计学习5小时', icon: '📖' },
      'study_10h': { title: '易学达人', description: '累计学习10小时', icon: '🎓' },
      'streak_3': { title: '三日不辍', description: '连续学习3天', icon: '🔥' },
      'streak_7': { title: '七日精进', description: '连续学习7天', icon: '⭐' },
      'streak_30': { title: '月圆功成', description: '连续学习30天', icon: '🏆' },
      'lessons_5': { title: '入门有成', description: '完成5个课程', icon: '✅' },
      'lessons_10': { title: '小有所成', description: '完成10个课程', icon: '🎯' }
    };
    return achievements[achievementId] || { title: '未知成就', description: '', icon: '🏅' };
  };

  // 计算总体进度
  const totalLessons = learningMaterials.length;
  const completedCount = progress.completedLessons.length;
  const overallProgress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // 查看课程详情
  const viewLesson = (lesson) => {
    setSelectedLesson(lesson);
    setModalVisible(true);
  };

  return (
    <ProgressContainer>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 标题 */}
        <div style={{ textAlign: 'center' }}>
          <BarChartOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
          <Title level={2}>学习进度</Title>
          <Paragraph>
            跟踪您的学习历程，见证易学修行的每一步成长。
          </Paragraph>
        </div>

        {/* 统计卡片 */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <AchievementCard>
              <Statistic
                title="总体进度"
                value={overallProgress}
                suffix="%"
                prefix={<BookOutlined />}
              />
            </AchievementCard>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <AchievementCard>
              <Statistic
                title="学习时长"
                value={progress.studyTime}
                suffix="分钟"
                prefix={<ClockCircleOutlined />}
              />
            </AchievementCard>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <AchievementCard>
              <Statistic
                title="连续天数"
                value={progress.streak}
                suffix="天"
                prefix={<FireOutlined />}
              />
            </AchievementCard>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <AchievementCard>
              <Statistic
                title="获得成就"
                value={progress.achievements.length}
                suffix="个"
                prefix={<TrophyOutlined />}
              />
            </AchievementCard>
          </Col>
        </Row>

        {/* 整体进度条 */}
        <Card title="学习进度概览">
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div>
              <Text strong>课程完成度</Text>
              <Progress 
                percent={overallProgress} 
                status={overallProgress === 100 ? 'success' : 'active'}
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
              />
              <Text type="secondary">
                已完成 {completedCount} / {totalLessons} 个课程
              </Text>
            </div>
          </Space>
        </Card>

        {/* 成就展示 */}
        {progress.achievements.length > 0 && (
          <Card title="已获得成就">
            <Row gutter={[16, 16]}>
              {progress.achievements.map(achievementId => {
                const achievement = getAchievementInfo(achievementId);
                return (
                  <Col xs={24} sm={12} md={8} lg={6} key={achievementId}>
                    <Card size="small" style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '32px', marginBottom: '8px' }}>
                        {achievement.icon}
                      </div>
                      <Text strong>{achievement.title}</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        {achievement.description}
                      </Text>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Card>
        )}

        {/* 课程列表 */}
        <Card title="课程进度">
          <List
            dataSource={learningMaterials}
            renderItem={(lesson) => {
              const isCompleted = progress.completedLessons.includes(lesson.id);
              return (
                <LessonItem className={isCompleted ? 'completed' : ''}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                      <Space direction="vertical" size="small">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <Text strong>{lesson.title}</Text>
                          {isCompleted && (
                            <Tag color="green" icon={<CheckCircleOutlined />}>
                              已完成
                            </Tag>
                          )}
                          <Tag color={lesson.difficulty === '入门' ? 'blue' : 
                                     lesson.difficulty === '进阶' ? 'orange' : 'red'}>
                            {lesson.difficulty}
                          </Tag>
                        </div>
                        <Text type="secondary">{lesson.description}</Text>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <Space size="small">
                            <ClockCircleOutlined style={{ color: '#666' }} />
                            <Text type="secondary">约30分钟</Text>
                          </Space>
                        </div>
                      </Space>
                    </div>
                    
                    <Space>
                      <Button 
                        size="small" 
                        onClick={() => viewLesson(lesson)}
                      >
                        查看
                      </Button>
                      {!isCompleted && (
                        <Button 
                          type="primary" 
                          size="small"
                          onClick={() => completeLesson(lesson.id)}
                        >
                          标记完成
                        </Button>
                      )}
                    </Space>
                  </div>
                </LessonItem>
              );
            }}
          />
        </Card>
      </Space>

      {/* 课程详情模态框 */}
      <Modal
        title={selectedLesson?.title}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            关闭
          </Button>,
          selectedLesson && !progress.completedLessons.includes(selectedLesson.id) && (
            <Button 
              key="complete" 
              type="primary"
              onClick={() => {
                completeLesson(selectedLesson.id);
                setModalVisible(false);
              }}
            >
              标记完成
            </Button>
          )
        ]}
        width={700}
      >
        {selectedLesson && (
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div>
              <Text strong>难度：</Text>
              <Tag color={selectedLesson.difficulty === '入门' ? 'blue' : 
                         selectedLesson.difficulty === '进阶' ? 'orange' : 'red'}>
                {selectedLesson.difficulty}
              </Tag>
            </div>
            
            <div>
              <Text strong>描述：</Text>
              <Paragraph>{selectedLesson.description}</Paragraph>
            </div>
            
            <div>
              <Text strong>内容：</Text>
              <Paragraph style={{ whiteSpace: 'pre-line' }}>
                {selectedLesson.content}
              </Paragraph>
            </div>
            
            {selectedLesson.keyPoints && (
              <div>
                <Text strong>要点：</Text>
                <ul>
                  {selectedLesson.keyPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            )}
          </Space>
        )}
      </Modal>
    </ProgressContainer>
  );
}

export default LearningProgress;