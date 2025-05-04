import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  type: 'user' | 'bot';
  content: string;
  timestamp: string;
  isTyping?: boolean;
}

const ChatBotLogo: React.FC<{ isTyping?: boolean }> = ({ isTyping = false }) => {
  return (
    <motion.div
      className="relative w-6 h-6 flex items-center justify-center"
      animate={isTyping ? { scale: [1, 1.1, 1] } : { scale: 1 }}
      transition={isTyping ? { duration: 1, repeat: Infinity } : { duration: 0.3 }}
    >
      <motion.svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
      >
        {/* Fond avec dégradé subtil */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Cercle de fond */}
        <circle
          cx="12"
          cy="12"
          r="11"
          fill="url(#gradient)"
          stroke="currentColor"
          strokeWidth="1"
        />

        {/* Tête du robot */}
        <motion.path
          d="M7 7 L17 7 L17 17 L7 17 Z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          animate={isTyping ? { 
            pathLength: [0, 1],
            opacity: [0.5, 1]
          } : {
            pathLength: 1,
            opacity: 1
          }}
          transition={isTyping ? { 
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse"
          } : { duration: 0.3 }}
        />

        {/* Antennes */}
        <motion.path
          d="M9 7 L7 3 M15 7 L17 3"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          animate={isTyping ? { 
            pathLength: [0, 1],
            opacity: [0.5, 1]
          } : {
            pathLength: 1,
            opacity: 1
          }}
          transition={isTyping ? { 
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse"
          } : { duration: 0.3 }}
        />

        {/* Yeux */}
        <motion.circle
          cx="9"
          cy="11"
          r="1"
          fill="currentColor"
          animate={isTyping ? { 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          } : {
            scale: 1,
            opacity: 1
          }}
          transition={isTyping ? { 
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse"
          } : { duration: 0.3 }}
        />
        <motion.circle
          cx="15"
          cy="11"
          r="1"
          fill="currentColor"
          animate={isTyping ? { 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          } : {
            scale: 1,
            opacity: 1
          }}
          transition={isTyping ? { 
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.2
          } : { duration: 0.3 }}
        />

        {/* Bouche */}
        <motion.path
          d="M9 15 L15 15"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          animate={isTyping ? { 
            pathLength: [0, 1],
            opacity: [0.5, 1]
          } : {
            pathLength: 1,
            opacity: 1
          }}
          transition={isTyping ? { 
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.4
          } : { duration: 0.3 }}
        />
      </motion.svg>
    </motion.div>
  );
};

// Ajout du fond animé pour le chatbot
const ChatBotBackground: React.FC = () => (
  <div
    className="absolute inset-0 z-0 pointer-events-none"
    aria-hidden="true"
  >
    <svg width="100%" height="100%" viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.circle
        cx="80"
        cy="100"
        r="30"
        fill="#22d3ee"
        fillOpacity="0.10"
        animate={{ cy: [100, 120, 100] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      <motion.circle
        cx="320"
        cy="200"
        r="22"
        fill="#22c55e"
        fillOpacity="0.10"
        animate={{ cy: [200, 230, 200] }}
        transition={{ duration: 7, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      <motion.circle
        cx="200"
        cy="400"
        r="40"
        fill="#fbbf24"
        fillOpacity="0.08"
        animate={{ cx: [200, 220, 200] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      <motion.circle
        cx="350"
        cy="60"
        r="14"
        fill="#a78bfa"
        fillOpacity="0.13"
        animate={{ cy: [60, 80, 60] }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
    </svg>
  </div>
);

const ChatBot: React.FC = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      content: t('chatbot.welcome', 'Hello! I\'m your AI assistant. How can I help you explore this portfolio?'),
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateTyping = async (text: string) => {
    setIsTyping(true);
    const words = text.split(' ');
    let currentText = '';
    
    for (const word of words) {
      currentText += word + ' ';
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage.isTyping) {
          lastMessage.content = currentText;
        } else {
          newMessages.push({
            type: 'bot',
            content: currentText,
            timestamp: new Date().toLocaleTimeString(),
            isTyping: true
          });
        }
        return newMessages;
      });
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    setIsTyping(false);
    setMessages(prev => {
      const newMessages = [...prev];
      const lastMessage = newMessages[newMessages.length - 1];
      lastMessage.isTyping = false;
      return newMessages;
    });
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      type: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    const botResponse = generateBotResponse(input);
    await simulateTyping(botResponse);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Réponses contextuelles plus détaillées
    if (input.includes('about') || input.includes('à propos') || input.includes('qui es-tu')) {
      return t('chatbot.about', 'I\'m a passionate developer with expertise in web and mobile development. I specialize in creating modern and performant applications. You can learn more by using the \'about\' command.');
    } else if (input.includes('project') || input.includes('projet') || input.includes('travail')) {
      return t('chatbot.projects', 'I\'ve worked on several interesting projects, ranging from web applications to mobile solutions. Each project is an opportunity for learning and innovation. Use the \'projects\' command to discover them.');
    } else if (input.includes('skill') || input.includes('compétence') || input.includes('expertise')) {
      return t('chatbot.skills', 'My skills include front-end (React, Vue.js), back-end (Node.js, Python), and mobile (React Native) development. I\'m also familiar with databases and cloud architectures. Type \'skills\' for more details.');
    } else if (input.includes('contact') || input.includes('contacter') || input.includes('email')) {
      return t('chatbot.contact', 'I\'m always open to new opportunities and collaborations. You can contact me through the information available with the \'contact\' command. I typically respond within 24 hours.');
    } else if (input.includes('blog') || input.includes('article') || input.includes('écrit')) {
      return t('chatbot.blog', 'My blog is under development. I\'ll be sharing my tech discoveries, tutorials, and industry insights. Stay tuned for exciting articles!');
    } else if (input.includes('help') || input.includes('aide') || input.includes('commande')) {
      return t('chatbot.help', 'I can help you navigate the portfolio. Try asking me about projects, skills, or use the terminal commands. I\'m here to guide you!');
    } else if (input.includes('bonjour') || input.includes('hello') || input.includes('salut')) {
      return t('chatbot.greeting', 'Hello! How can I help you today? Feel free to ask me about my projects or skills.');
    } else if (input.includes('merci') || input.includes('thanks')) {
      return t('chatbot.thanks', 'You\'re welcome! Don\'t hesitate if you have more questions. I\'m here to help.');
    } else if (input.includes('comment ça va') || input.includes('how are you')) {
      return t('chatbot.howAreYou', 'I\'m doing great, thanks! Always ready to help and share knowledge. How can I assist you?');
    } else if (input.includes('bye') || input.includes('au revoir')) {
      return t('chatbot.goodbye', 'Goodbye! Feel free to come back if you have more questions. Have a great day!');
    } else if (input.includes('technologie') || input.includes('tech') || input.includes('stack')) {
      return t('chatbot.tech', 'My main tech stack includes React and TypeScript for front-end, Node.js and Python for back-end. I use Docker for containerization, AWS for cloud services, and Git for version control. I\'m also familiar with tools like Jest for testing, Webpack for bundling, and Jenkins for continuous integration. I\'m particularly interested in microservices architectures and serverless solutions.');
    } else if (input.includes('expérience') || input.includes('experience') || input.includes('année')) {
      return t('chatbot.experience', 'I have several years of experience in web and mobile development. I\'ve worked on various projects, from enterprise applications to consumer solutions.');
    } else if (input.includes('formation') || input.includes('education') || input.includes('diplôme')) {
      return t('chatbot.education', 'I hold a degree in Software Engineering with a specialization in web and mobile development. I\'ve complemented my education with several certifications in modern technologies like React, Node.js, and cloud architectures. I\'ve also taken advanced courses in artificial intelligence and cybersecurity to stay at the forefront of technological innovation.');
    } else if (input.includes('hobby') || input.includes('loisir') || input.includes('intérêt')) {
      return t('chatbot.hobbies', 'Beyond development, I\'m passionate about artificial intelligence and machine learning. I regularly participate in hackathons and tech conferences. I also enjoy contributing to open-source projects and sharing my knowledge through my blog and tutorials. In my free time, I explore emerging technologies and develop innovative personal projects.');
    } else if (input.includes('cv') || input.includes('resume') || input.includes('curriculum')) {
      return t('chatbot.cv', 'To download my CV, simply use the \'install cv\' command in the terminal. My CV provides a comprehensive overview of my professional journey, technical skills, certifications, and major achievements. It\'s available in PDF format and is regularly updated to reflect my latest experiences and skills.');
    } else {
      return t('chatbot.default', 'I\'m not sure I understand. Try rephrasing your question or use the \'help\' command to see available options. I can tell you about my projects, skills, or guide you through the portfolio.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isTyping) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    { key: 'about', text: t('chatbot.quickQuestions.about', 'Tell me about yourself') },
    { key: 'projects', text: t('chatbot.quickQuestions.projects', 'What are your projects?') },
    { key: 'skills', text: t('chatbot.quickQuestions.skills', 'What are your skills?') },
    { key: 'contact', text: t('chatbot.quickQuestions.contact', 'How can I contact you?') },
    { key: 'experience', text: t('chatbot.quickQuestions.experience', 'What is your experience?') },
    { key: 'education', text: t('chatbot.quickQuestions.education', 'What is your education?') },
    { key: 'tech', text: t('chatbot.quickQuestions.tech', 'What technologies do you use?') },
    { key: 'hobbies', text: t('chatbot.quickQuestions.hobbies', 'What are your hobbies?') },
    { key: 'blog', text: t('chatbot.quickQuestions.blog', 'Tell me about your blog') },
    { key: 'cv', text: t('chatbot.quickQuestions.cv', 'How can I download your CV?') }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuestionIndex((prev) => (prev + 1) % quickQuestions.length);
    }, 5000); // Change de question toutes les 5 secondes

    return () => clearInterval(timer);
  }, []);

  const handleQuickQuestion = async (questionKey: string) => {
    const question = quickQuestions.find(q => q.key === questionKey);
    if (!question) return;

    // Ajouter le message de l'utilisateur
    const userMessage: Message = {
      type: 'user',
      content: question.text,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);

    // Générer et simuler la réponse du bot
    const botResponse = generateBotResponse(questionKey);
    await simulateTyping(botResponse);
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex((prev) => (prev + 1) % quickQuestions.length);
  };

  const prevQuestion = () => {
    setCurrentQuestionIndex((prev) => (prev - 1 + quickQuestions.length) % quickQuestions.length);
  };

  if (isMinimized) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-4 right-4 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMinimized(false)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-600 transition-all duration-200 flex items-center space-x-2"
        >
          <div className="text-white">
            <ChatBotLogo isTyping={isTyping} />
          </div>
          <span>{t('chatbot.minimized', 'Assistant virtuel')}</span>
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{
        opacity: 0,
        scale: 0.5,
        x: 100,
        y: 100,
        transition: {
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1],
          opacity: { duration: 0.3 },
          scale: { duration: 0.4 },
          x: { duration: 0.5 },
          y: { duration: 0.5 }
        }
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed bottom-4 right-4 w-96 h-[500px] bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50 flex flex-col overflow-hidden"
    >
      {/* Fond animé */}
      <ChatBotBackground />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ delay: 0.2 }}
        className="flex justify-between items-center p-3 border-b border-gray-700 bg-gray-900 rounded-t-lg relative z-10"
      >
        <div className="flex items-center space-x-2">
          <div className="text-green-500">
            <ChatBotLogo isTyping={isTyping} />
          </div>
          <span className="text-white font-semibold">{t('chatbot.title', 'Assistant virtuel')}</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMinimized(true)}
          className="text-gray-400 hover:text-white transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex-1 overflow-y-auto space-y-4 p-4 relative z-10"
      >
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: message.type === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: message.type === 'user' ? 20 : -20 }}
              transition={{ duration: 0.2 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === 'user'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-700 text-gray-300'
                }`}
              >
                <div className="text-xs opacity-70 mb-1">
                  {message.timestamp}
                </div>
                <div className={message.isTyping ? 'typing-indicator' : ''}>
                  {message.content}
                  {message.isTyping && <span className="typing-dot">.</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-4 border-t border-gray-700 relative z-10"
      >
        <div className="relative mb-3">
          <div className="flex items-center justify-center space-x-2">
            <button
              onClick={prevQuestion}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1 text-center"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleQuickQuestion(quickQuestions[currentQuestionIndex].key)}
                  className="bg-gray-700 text-gray-300 px-4 py-2 rounded-full text-sm hover:bg-gray-600 transition-colors duration-200 w-full"
                  disabled={isTyping}
                >
                  {quickQuestions[currentQuestionIndex].text}
                </motion.button>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={nextQuestion}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="flex justify-center space-x-1 mt-2">
            {quickQuestions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentQuestionIndex ? 'bg-green-500' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('chatbot.placeholder', 'Ask your question...')}
            className="flex-1 bg-gray-700 text-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 transition-all duration-200"
            disabled={isTyping}
          >
            {t('chatbot.send', 'Send')}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChatBot; 