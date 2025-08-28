import { useState, useEffect, useRef } from 'react';

export default function Chatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const apiKey = process.env.GROQ_API_KEY || '';
  const apiUrl = process.env.GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions';
  const messagesEndRef = useRef(null);

  const initialMessages = [
    {
      id: 1,
      text: "Olá! Sou o assistente virtual do Guia Arco-Íris. Como posso ajudar você hoje?",
      sender: "bot",
      timestamp: new Date()
    },
    {
      id: 2,
      text: "Posso ajudar com informações sobre saúde mental, direitos LGBT+, recursos disponíveis e muito mais.",
      sender: "bot",
      timestamp: new Date()
    }
  ];

  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: `Você é um assistente especializado em saúde mental e apoio à comunidade LGBTQIA+. Seja empático, informativo e ofereça recursos úteis. Responda em português brasileiro.\nUsuário: ${inputMessage}` }
              ]
            }
          ],
          temperature: 0.7,
          max_output_tokens: 200
        })
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      const data = await response.json();
      const botResponse = data?.results?.[0]?.message?.content?.[0]?.text || 'Resposta não encontrada.';

      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: "bot",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Erro ao conectar com a API:', error);

      const errorMessage = {
        id: Date.now() + 1,
        text: "Desculpe, estou com dificuldades técnicas. Por favor, verifique sua API key e tente novamente. Se precisar de ajuda imediata, entre em contato com nossa equipe: contato@guiarcoiris.com",
        sender: "bot",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const quickReplies = [
    "Preciso de um psicólogo",
    "Direitos LGBT+ no trabalho",
    "Grupos de apoio perto de mim",
    "Como lidar com familiares",
    "Saúde mental trans"
  ];

  return (
    <>
      {!isChatOpen && (
        <div className="chatbot-floating-btn" onClick={() => setIsChatOpen(true)}>
          <i className="fas fa-comments"></i>
          <span className="chatbot-notification">1</span>
        </div>
      )}

      {isChatOpen && (
        <div className="chatbot-modal">
          <div className="chatbot-header">
            <div className="chatbot-title">
              <i className="fas fa-rainbow"></i>
              <h3>Assistente Virtual</h3>
            </div>
            <button className="chatbot-close" onClick={() => setIsChatOpen(false)}>
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                <div className="message-content">
                  <p>{message.text}</p>
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="message bot">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {messages.length > initialMessages.length && (
            <div className="quick-replies">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  className="quick-reply-btn"
                  onClick={() => setInputMessage(reply)}
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="send-btn"
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .chatbot-floating-btn { position: fixed;
           bottom: 30px;
            right: 30px;
             width: 60px;
              height: 60px;
               background: linear-gradient(135deg, var(--primary), var(--primary-light)); color: white; border-radius: 50%; 
               display: flex;
                align-items: center; 
                justify-content: center; 
                cursor: pointer;
                 box-shadow: 0 8px 25px rgba(109, 40, 217, 0.3);
                 z-index: 1000; transition: all 0.3s ease; 
                }
        .chatbot-floating-btn:hover { 
          transform: scale(1.1); 
          box-shadow: 0 12px 30px rgba(109, 40, 217, 0.4); 
        }
        .chatbot-floating-btn i { 
          font-size: 1.5rem;
         }

        .chatbot-notification {
           position: absolute; 
           top: -5px;
            right: -5px; 
            background: var(--secondary); color: white; 
            border-radius: 50%;
             width: 20px; 
             height: 20px;
              display: flex;
               align-items: center; 
               justify-content: center; 
               font-size: 0.7rem; 
               font-weight: bold; }
        .chatbot-modal { 
          position: fixed; 
          bottom: 100px; 
          right: 30px; 
          width: 380px; 
          height: 500px; 
          background: white; 
          border-radius: 20px; 
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15); 
          display: flex; 
          flex-direction: column; 
          z-index: 1001; 
          overflow: hidden; }
        .chatbot-header { 
          background: linear-gradient(135deg, var(--primary), var(--primary-light)); 
          color: white; 
          padding: 20px;
          display: flex;
          justify-content: space-between; 
          align-items: center; }
        .chatbot-title { 
          display: flex; 
          align-items: center; 
          gap: 10px; 
        }
        .chatbot-title i { 
          font-size: 1.5rem; 
        }
        .chatbot-title h3 { 
          margin: 0;
           font-size: 1.2rem; 
          }
        .chatbot-close { 
          background: none;
          border: none; 
          color: white; 
          cursor: pointer; 
          font-size: 1.2rem; 
        }

        .chatbot-messages { 
          flex: 1; 
          padding: 20px; 
          overflow-y: auto; 
          display: flex; 
          flex-direction: column; 
          gap: 15px; 
        }
        .message {
           display: flex; 
           max-width: 80%; 
          }

        .message.user { 
          align-self: flex-end; }
        .message.bot { align-self: flex-start; }
        .message-content { 
          padding: 12px 16px; 
          border-radius: 18px; 
          position: relative; }


        .message.user .message-content { 
          background: var(--primary); 
          color: white; 
          border-bottom-right-radius: 5px; }

        .message.bot .message-content { background: var(--gray); 
          color: var(--text); 
          border-bottom-left-radius: 5px; }

        .message-time { 
          font-size: 0.7rem; 
          opacity: 0.7; 
          display: block; 
          margin-top: 5px; }

        .typing-indicator { 
          display: flex; 
          gap: 4px; 
        }
        .typing-indicator span { 
          width: 8px;
          height: 8px; 
          border-radius: 50%; 
          background: var(--text); opacity: 0.6; animation: typing 1.4s infinite; 
        }


        .typing-indicator span:nth-child(2) { 
          animation-delay: 0.2s; }

        .typing-indicator span:nth-child(3) { 
          animation-delay: 0.4s; }
        
          @keyframes typing 
          { 0%, 60%, 100% 
            { transform: translateY(0); opacity: 0.6; } 30% 
            { transform: translateY(-5px); opacity: 1; } 
          }
        .quick-replies 
        { padding: 15px 20px;
           display: flex; 
           flex-wrap: wrap; 
           gap: 8px;
            background: var(--light); 
            border-top: 1px solid var(--gray); 
          }

        .quick-reply-btn { 
          padding: 8px 12px; 
          background: white; 
          border: 1px solid var(--primary-light); 
          border-radius: 20px; font-size: 0.8rem; color: var(--primary); 
          cursor: pointer; 
          transition: all 0.2s; 
        }

        .quick-reply-btn:hover { 
          background: var(--primary-light); 
          color: white; 
        }

        .chatbot-input { 
          padding: 15px 20px; 
          display: flex; 
          gap: 10px; 
          background: white; 
          border-top: 1px solid var(--gray); }

        .chatbot-input input { 
          flex: 1; 
          padding: 12px;
          border: 1px solid #ddd; 
          border-radius: 25px; 
          outline: none; 
        }

        .send-btn { 
          width: 45px; 
          height: 45px; 
          background: linear-gradient(135deg, var(--primary), var(--primary-light)); 
          color: white; 
          border: none; 
          border-radius: 50%; 
          cursor: pointer; 
          transition: all 0.2s; 
        }

        .send-btn:hover:not(:disabled) { 
        transform: scale(1.05); 
      }

        .send-btn:disabled {
          background: #ccc; 
          cursor: not-allowed; 
        }

        @media (max-width: 480px) { 
          .chatbot-modal { 
            width: 90vw; 
            right: 5vw; 
            bottom: 80px; 
            height: 70vh; } }
      `}</style>
    </>
  );
}
