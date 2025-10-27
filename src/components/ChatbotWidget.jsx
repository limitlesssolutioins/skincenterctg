import React, { useState, useEffect, useRef } from 'react';
import './chatbotwidget.css'; // Asegúrate de crear este archivo CSS
import { FaCommentDots } from 'react-icons/fa'; // Importar el icono de chat

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;

    const newMessage = { sender: 'user', text: inputMessage };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputMessage('');

    try {
      const response = await fetch('https://skincenterctg.pythonanywhere.com/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: data.response }]);
    } catch (error) {
      console.error('Error al comunicarse con el chatbot:', error);
      setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: 'Lo siento, hubo un error al conectar con el chatbot.' }]);
    }
  };

  return (
    <>
      <button className="chatbot-toggle-button" onClick={toggleChat}>
        {isOpen ? 'X' : <FaCommentDots />}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>Chatbot SkinCenter</h3>
            <button className="chatbot-close-button" onClick={toggleChat}>X</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form className="chatbot-input-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Escribe tu mensaje..."
            />
            <button type="submit">Enviar</button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
