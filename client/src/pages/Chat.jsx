import React, { useState, useEffect, useContext, useRef } from 'react';
import { SocketContext } from '../context/SocketContext';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { Send, User as UserIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const Chat = () => {
  const socket = useContext(SocketContext);
  const { user } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const scrollRef = useRef();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await api.get('/chats');
        setChats(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchChats();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (currentChat) {
        try {
          const { data } = await api.get(`/chats/${currentChat._id}/messages`);
          setMessages(data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchMessages();
  }, [currentChat]);

  useEffect(() => {
    if (socket) {
      socket.on('receive_message', (message) => {
        if (currentChat && currentChat._id === message.chatId) {
          setMessages((prev) => [...prev, message]);
        }
      });
    }
    return () => socket?.off('receive_message');
  }, [socket, currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentChat) return;

    const messageData = {
      chatId: currentChat._id,
      text: newMessage,
    };

    try {
      const { data } = await api.post('/chats/messages', messageData);
      setMessages([...messages, data]);
      setNewMessage('');
      
      socket?.emit('send_message', {
        ...data,
        receiverId: currentChat.members.find(m => m._id !== user._id)._id
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 pb-20 sm:pb-4 flex justify-center">
      <div className="glass w-full max-w-6xl rounded-2xl flex h-[80vh] overflow-hidden">
        {/* Chat List */}
        <div className="w-1/3 border-r border-white border-opacity-20 flex flex-col">
          <div className="p-4 border-b border-white border-opacity-20 font-bold text-xl">Chats</div>
          <div className="overflow-y-auto flex-1 p-2 space-y-2">
            {chats.map(chat => {
              const otherUser = chat.members.find(m => m._id !== user._id);
              return (
                <div 
                  key={chat._id} 
                  onClick={() => setCurrentChat(chat)}
                  className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-colors ${currentChat?._id === chat._id ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'}`}
                >
                  {otherUser?.profilePic ? (
                    <img src={otherUser.profilePic} className="w-10 h-10 rounded-full" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center"><UserIcon /></div>
                  )}
                  <span className="font-semibold">{otherUser?.username}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat Box */}
        <div className="flex-1 flex flex-col">
          {currentChat ? (
            <>
              <div className="p-4 border-b border-white border-opacity-20 flex items-center gap-4 font-bold text-lg">
                <span>{currentChat.members.find(m => m._id !== user._id)?.username}</span>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(msg => (
                  <div key={msg._id} ref={scrollRef} className={`flex ${msg.senderId === user._id ? 'justify-end' : 'justify-start'}`}>
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`max-w-[70%] p-3 rounded-2xl ${msg.senderId === user._id ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white bg-opacity-20 rounded-bl-none'}`}
                    >
                      {msg.text}
                    </motion.div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSend} className="p-4 border-t border-white border-opacity-20 flex gap-2">
                <input 
                  type="text" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-white bg-opacity-10 rounded-full px-6 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors">
                  <Send size={20} />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center opacity-50 text-xl">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
