import React, { useState, useRef, useEffect } from 'react';
import { Button, Space, Slider, Typography, message } from 'antd';
import { 
  PlayCircleOutlined, 
  PauseCircleOutlined, 
  SoundOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import styled from 'styled-components';

const { Text } = Typography;

const AudioContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  margin: 8px 0;
`;

const ControlButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  
  &:hover {
    transform: scale(1.05);
    transition: transform 0.2s;
  }
`;

const VolumeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 120px;
`;

const TextContainer = styled.div`
  flex: 1;
  min-width: 0;
`;

function AudioPlayer({ text, title = "朗读内容", autoPlay = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isSupported, setIsSupported] = useState(true);
  const speechRef = useRef(null);
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    // 检查浏览器是否支持语音合成
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
      message.warning('您的浏览器不支持语音朗读功能');
      return;
    }

    // 清理之前的语音
    return () => {
      if (speechRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (autoPlay && text && isSupported) {
      handlePlay();
    }
  }, [text, autoPlay, isSupported]);

  const handlePlay = () => {
    if (!isSupported) {
      message.error('您的浏览器不支持语音朗读功能');
      return;
    }

    if (!text || !text.trim()) {
      message.warning('没有可朗读的内容');
      return;
    }

    setIsLoading(true);
    
    // 停止当前播放
    window.speechSynthesis.cancel();
    
    // 创建新的语音实例
    const utterance = new SpeechSynthesisUtterance(text);
    speechRef.current = utterance;
    
    // 设置语音参数
    utterance.rate = 0.8; // 语速
    utterance.pitch = 1; // 音调
    utterance.volume = volume; // 音量
    
    // 尝试使用中文语音
    const voices = window.speechSynthesis.getVoices();
    const chineseVoice = voices.find(voice => 
      voice.lang.includes('zh') || voice.lang.includes('cmn')
    );
    if (chineseVoice) {
      utterance.voice = chineseVoice;
    }
    
    // 事件监听
    utterance.onstart = () => {
      setIsLoading(false);
      setIsPlaying(true);
      setCurrentText(text);
    };
    
    utterance.onend = () => {
      setIsPlaying(false);
      setCurrentText('');
    };
    
    utterance.onerror = (event) => {
      setIsLoading(false);
      setIsPlaying(false);
      setCurrentText('');
      message.error('语音朗读出现错误：' + event.error);
    };
    
    utterance.onpause = () => {
      setIsPlaying(false);
    };
    
    utterance.onresume = () => {
      setIsPlaying(true);
    };
    
    // 开始朗读
    try {
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      setIsLoading(false);
      message.error('启动语音朗读失败');
    }
  };

  const handlePause = () => {
    if (window.speechSynthesis.speaking) {
      if (isPlaying) {
        window.speechSynthesis.pause();
        setIsPlaying(false);
      } else {
        window.speechSynthesis.resume();
        setIsPlaying(true);
      }
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setCurrentText('');
  };

  const handleVolumeChange = (value) => {
    setVolume(value / 100);
    if (speechRef.current) {
      speechRef.current.volume = value / 100;
    }
  };

  if (!isSupported) {
    return (
      <AudioContainer>
        <Text type="secondary">您的浏览器不支持语音朗读功能</Text>
      </AudioContainer>
    );
  }

  return (
    <AudioContainer>
      <Space>
        {isLoading ? (
          <ControlButton disabled>
            <LoadingOutlined style={{ fontSize: '20px' }} />
          </ControlButton>
        ) : (
          <ControlButton
            type={isPlaying ? "default" : "primary"}
            onClick={isPlaying ? handlePause : handlePlay}
            title={isPlaying ? "暂停" : "播放"}
          >
            {isPlaying ? (
              <PauseCircleOutlined style={{ fontSize: '20px' }} />
            ) : (
              <PlayCircleOutlined style={{ fontSize: '20px' }} />
            )}
          </ControlButton>
        )}
        
        {isPlaying && (
          <Button size="small" onClick={handleStop}>
            停止
          </Button>
        )}
      </Space>

      <TextContainer>
        <Text strong style={{ fontSize: '14px' }}>
          {title}
        </Text>
        {currentText && (
          <div>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              正在朗读: {currentText.substring(0, 30)}{currentText.length > 30 ? '...' : ''}
            </Text>
          </div>
        )}
      </TextContainer>

      <VolumeContainer>
        <SoundOutlined style={{ color: '#666' }} />
        <Slider
          min={0}
          max={100}
          value={volume * 100}
          onChange={handleVolumeChange}
          style={{ width: '80px' }}
          tooltip={{ formatter: (value) => `${value}%` }}
        />
      </VolumeContainer>
    </AudioContainer>
  );
}

// 语音朗读Hook
export const useSpeech = () => {
  const [isSupported] = useState('speechSynthesis' in window);
  
  const speak = (text, options = {}) => {
    if (!isSupported) {
      message.warning('您的浏览器不支持语音朗读功能');
      return;
    }
    
    if (!text) return;
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = options.rate || 0.8;
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 0.8;
    
    // 尝试使用中文语音
    const voices = window.speechSynthesis.getVoices();
    const chineseVoice = voices.find(voice => 
      voice.lang.includes('zh') || voice.lang.includes('cmn')
    );
    if (chineseVoice) {
      utterance.voice = chineseVoice;
    }
    
    if (options.onStart) utterance.onstart = options.onStart;
    if (options.onEnd) utterance.onend = options.onEnd;
    if (options.onError) utterance.onerror = options.onError;
    
    window.speechSynthesis.speak(utterance);
  };
  
  const stop = () => {
    window.speechSynthesis.cancel();
  };
  
  const pause = () => {
    window.speechSynthesis.pause();
  };
  
  const resume = () => {
    window.speechSynthesis.resume();
  };
  
  return {
    isSupported,
    speak,
    stop,
    pause,
    resume
  };
};

export default AudioPlayer;