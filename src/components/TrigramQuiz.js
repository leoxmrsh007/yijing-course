import React, { useState, useEffect } from 'react';
import { Card, Button, Radio, Progress, Typography, Space, Modal, Tag, Row, Col, Statistic } from 'antd';
import { TrophyOutlined, ReloadOutlined, QuestionCircleOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { trigrams } from '../data/yijingData';
import styled from 'styled-components';

const { Title, Text, Paragraph } = Typography;

const QuizContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const QuestionCard = styled(Card)`
  text-align: center;
  margin-bottom: 20px;
  
  .trigram-display {
    font-size: 4rem;
    color: #722ed1;
    margin: 20px 0;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  }
`;

const OptionButton = styled(Button)`
  width: 100%;
  height: 60px;
  margin-bottom: 10px;
  font-size: 16px;
  
  &.correct {
    background-color: #52c41a;
    border-color: #52c41a;
    color: white;
  }
  
  &.incorrect {
    background-color: #ff4d4f;
    border-color: #ff4d4f;
    color: white;
  }
`;

const ScoreCard = styled(Card)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  
  .ant-card-body {
    text-align: center;
  }
  
  .ant-statistic-title {
    color: white !important;
  }
  
  .ant-statistic-content {
    color: white !important;
  }
`;

const TrigramQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(false);

  // 生成测验题目
  const generateQuestions = () => {
    const trigramEntries = Object.entries(trigrams);
    console.log('八卦数据:', trigrams);
    console.log('坎卦数据:', trigrams['坎']);
    console.log('离卦数据:', trigrams['离']);
    const shuffled = [...trigramEntries].sort(() => Math.random() - 0.5);
    
    const newQuestions = shuffled.slice(0, 8).map(([correctName, correctTrigram]) => {
      // 生成错误选项
      const wrongOptions = trigramEntries
        .filter(([name]) => name !== correctName)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(([name]) => name);
      
      const options = [correctName, ...wrongOptions].sort(() => Math.random() - 0.5);
      
      const question = {
        symbol: correctTrigram.symbol,
        correctAnswer: correctName,
        options: options,
        element: correctTrigram.element,
        direction: correctTrigram.direction,
        meaning: correctTrigram.meaning
      };
      
      if (correctName === '坎' || correctName === '离') {
        console.log(`${correctName}卦题目:`, question);
      }
      
      return question;
    });
    
    setQuestions(newQuestions);
  };

  // 初始化测验
  useEffect(() => {
    generateQuestions();
  }, []);

  // 计时器
  useEffect(() => {
    let timer;
    if (timerActive && timeLeft > 0 && !showResult) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && !showResult) {
      handleTimeUp();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, timerActive, showResult]);

  // 开始测验
  const startQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizCompleted(false);
    setTimeLeft(30);
    setTimerActive(true);
    generateQuestions();
  };

  // 处理答案选择
  const handleAnswerSelect = (answer) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answer);
    setTimerActive(false);
    
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      setShowResult(true);
    }, 1000);
  };

  // 下一题
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(30);
      setTimerActive(true);
    } else {
      setQuizCompleted(true);
      setTimerActive(false);
    }
  };

  // 时间到
  const handleTimeUp = () => {
    setSelectedAnswer('timeout');
    setTimerActive(false);
    setTimeout(() => {
      setShowResult(true);
    }, 1000);
  };

  // 获取按钮样式
  const getButtonType = (option) => {
    if (selectedAnswer === null) return 'default';
    if (option === questions[currentQuestion].correctAnswer) return 'correct';
    if (option === selectedAnswer && selectedAnswer !== questions[currentQuestion].correctAnswer) return 'incorrect';
    return 'default';
  };

  // 获取成绩等级
  const getGradeInfo = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return { grade: 'A+', color: '#52c41a', title: '易学大师' };
    if (percentage >= 80) return { grade: 'A', color: '#1890ff', title: '八卦高手' };
    if (percentage >= 70) return { grade: 'B+', color: '#722ed1', title: '进步神速' };
    if (percentage >= 60) return { grade: 'B', color: '#fa8c16', title: '继续努力' };
    return { grade: 'C', color: '#ff4d4f', title: '需要加强' };
  };

  if (questions.length === 0) {
    return (
      <QuizContainer>
        <Card loading>
          <Title level={3}>正在准备测验...</Title>
        </Card>
      </QuizContainer>
    );
  }

  if (quizCompleted) {
    const gradeInfo = getGradeInfo(score, questions.length);
    return (
      <QuizContainer>
        <ScoreCard>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <TrophyOutlined style={{ fontSize: '4rem', color: '#ffd700' }} />
            <Title level={2} style={{ color: 'white', margin: 0 }}>测验完成！</Title>
            
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Statistic title="总分" value={`${score}/${questions.length}`} />
              </Col>
              <Col span={8}>
                <Statistic title="正确率" value={`${Math.round((score/questions.length)*100)}%`} />
              </Col>
              <Col span={8}>
                <Statistic title="等级" value={gradeInfo.grade} />
              </Col>
            </Row>
            
            <Tag color={gradeInfo.color} style={{ fontSize: '16px', padding: '8px 16px' }}>
              {gradeInfo.title}
            </Tag>
            
            <Button 
              type="primary" 
              size="large" 
              icon={<ReloadOutlined />}
              onClick={startQuiz}
              style={{ marginTop: '20px' }}
            >
              重新测验
            </Button>
          </Space>
        </ScoreCard>
      </QuizContainer>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <QuizContainer>
      <Card>
        <Title level={2} style={{ textAlign: 'center', color: '#722ed1' }}>
          <QuestionCircleOutlined /> 八卦识别测验
        </Title>
        <Paragraph style={{ textAlign: 'center', fontSize: '16px' }}>
          测试你对八卦符号的掌握程度
        </Paragraph>
      </Card>

      <Card style={{ marginBottom: '20px' }}>
        <Row gutter={[16, 16]} align="middle">
          <Col span={8}>
            <Progress 
              percent={Math.round(((currentQuestion + 1) / questions.length) * 100)} 
              format={() => `${currentQuestion + 1}/${questions.length}`}
            />
          </Col>
          <Col span={8} style={{ textAlign: 'center' }}>
            <Statistic title="当前得分" value={score} />
          </Col>
          <Col span={8} style={{ textAlign: 'right' }}>
            <Statistic 
              title="剩余时间" 
              value={timeLeft} 
              suffix="秒"
              valueStyle={{ color: timeLeft <= 10 ? '#ff4d4f' : '#1890ff' }}
            />
          </Col>
        </Row>
      </Card>

      <QuestionCard>
        <Title level={3}>这是哪个八卦？</Title>
        <div className="trigram-display">
          {currentQ.symbol}
        </div>
        
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          {currentQ.options.map((option, index) => (
            <OptionButton
              key={index}
              className={getButtonType(option)}
              onClick={() => handleAnswerSelect(option)}
              disabled={selectedAnswer !== null}
              icon={
                selectedAnswer !== null && option === currentQ.correctAnswer ? 
                <CheckCircleOutlined /> : 
                selectedAnswer === option && option !== currentQ.correctAnswer ? 
                <CloseCircleOutlined /> : null
              }
            >
              {option}
            </OptionButton>
          ))}
        </Space>
      </QuestionCard>

      <Modal
        title={selectedAnswer === currentQ.correctAnswer ? "回答正确！" : "回答错误"}
        open={showResult}
        onOk={nextQuestion}
        onCancel={nextQuestion}
        okText={currentQuestion < questions.length - 1 ? "下一题" : "查看结果"}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', margin: '10px 0' }}>{currentQ.symbol}</div>
            <div style={{ fontSize: '1rem', color: '#666', marginBottom: '10px' }}>
              {currentQ.symbol === '☵' && '坎卦 (水)'}
              {currentQ.symbol === '☲' && '离卦 (火)'}
              {currentQ.symbol === '☰' && '乾卦 (天)'}
              {currentQ.symbol === '☷' && '坤卦 (地)'}
              {currentQ.symbol === '☳' && '震卦 (雷)'}
              {currentQ.symbol === '☴' && '巽卦 (风)'}
              {currentQ.symbol === '☶' && '艮卦 (山)'}
              {currentQ.symbol === '☱' && '兑卦 (泽)'}
            </div>
            <Title level={4}>{currentQ.correctAnswer}</Title>
          </div>
          
          <Card size="small" style={{ background: '#f6ffed' }}>
            <Space direction="vertical" size="small">
              <Text><strong>五行属性：</strong>{currentQ.element}行</Text>
              <Text><strong>方位：</strong>{currentQ.direction}</Text>
              <Text><strong>含义：</strong>{currentQ.meaning}</Text>
            </Space>
          </Card>
          
          {selectedAnswer === 'timeout' && (
            <Text type="danger">时间到！正确答案是：{currentQ.correctAnswer}</Text>
          )}
        </Space>
      </Modal>

      {!timerActive && !showResult && (
        <Card style={{ textAlign: 'center' }}>
          <Button type="primary" size="large" onClick={startQuiz}>
            开始测验
          </Button>
        </Card>
      )}
    </QuizContainer>
  );
};

export default TrigramQuiz;