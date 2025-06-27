import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaEllipsisV, FaSmile, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import api from '../services/api';


interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatarUrl?: string;
}

interface Message {
  id: number;
  conversationId: number;
  senderId: number;
  senderName: string;
  content: string;
  timestamp: string;
}

interface MessageThread {
  id: number;
  participants?: number[];
  subject?: string;
  lastMessage?: string;
  lastMessageTimestamp?: string;
  messages: Message[];
  other_user_id?: number;
  other_user_name?: string;
  other_user_avatar?: string;
}

interface Reaction {
  id: number;
  message_id: number;
  user_id: number;
  emoji: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
}

const Messages: React.FC = () => {
  const [threads, setThreads] = useState<MessageThread[]>([]);
  const [selectedThread, setSelectedThread] = useState<MessageThread | null>(null);
  const [newMessageContent, setNewMessageContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(prev => !prev);
  const [reactions, setReactions] = useState<{ [msgId: number]: Reaction[] }>({});
  const emojiOptions = ['👍', '😂', '❤️', '😮', '😢', '🙏', '🎉', '🔥', '👏'];
  const [emojiPickerMsgId, setEmojiPickerMsgId] = useState<number | null>(null);


  const userIdRaw = localStorage.getItem('userId');
  const currentUserId = userIdRaw ? parseInt(userIdRaw, 10) : null;
  const currentUserName = localStorage.getItem('userEmail') || 'Current User';

  useEffect(() => {
    if (!currentUserId) {
      setError('User not found. Please log in again.');
      setLoading(false);
      return;
    }
  
    const fetchData = async () => {
      setLoading(true);
      try {
        const [usersRes, threadsRes] = await Promise.all([
          api.get('/users'),
          api.get(`/conversations/${currentUserId}`)
        ]);
  
        const usersData = usersRes.data?.data || usersRes.data;
        let threadsData = threadsRes.data?.data || threadsRes.data;

        // Filter out conversations deleted for the current user
        threadsData = Array.isArray(threadsData)
          ? threadsData.filter(thread => {
              if (thread.user1_id === currentUserId && thread.user1_deleted) return false;
              if (thread.user2_id === currentUserId && thread.user2_deleted) return false;
              return true;
            })
          : [];

        setAvailableUsers(Array.isArray(usersData) ? usersData : []);
        setThreads(Array.isArray(threadsData) ? threadsData : []);
      } catch (err: unknown) {
        if (err instanceof Error) setError('Failed to fetch data: ' + err.message);
        else setError('An unknown error occurred.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [currentUserId]);

    // Auto-scroll on new messages
    useEffect(() => {
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [selectedThread?.messages]);
  

  const handleThreadSelect = async (thread: MessageThread) => {
    console.log('🧠 Selecting thread:', thread);
  
    try {
      const [conversationRes, messagesRes] = await Promise.all([
        api.get(`/conversations/detail/${thread.id}`),
        api.get(`/messages/${thread.id}`),
      ]);
  
      const updatedThread: MessageThread = {
        ...(conversationRes.data?.data || conversationRes.data),
        messages: messagesRes.data?.data?.messages || [],
      };
  
      // Fallback participants setup
      if (!updatedThread.participants || updatedThread.participants.length === 0) {
        updatedThread.participants = thread.participants || [currentUserId!];
      }
  
      const otherUserId =
        updatedThread.participants.find((id) => id !== currentUserId) ||
        thread.other_user_id;
  
      const otherUser = availableUsers.find((u) => u.id === otherUserId);
  
      // Fallback for undefined name
      let otherUserName = 'Unnamed User';
      if (otherUser) {
        otherUserName = `${otherUser.first_name} ${otherUser.last_name}`;
      } else if (thread.other_user_name) {
        otherUserName = thread.other_user_name;
      }
  
      updatedThread.other_user_id = otherUser?.id || thread.other_user_id;
      updatedThread.other_user_name = otherUserName;
      updatedThread.other_user_avatar = otherUser?.avatarUrl || thread.other_user_avatar || '';
  
      console.log('✅ Final other_user_name:', updatedThread.other_user_name);
  
      setSelectedThread(updatedThread);
    } catch (err: unknown) {
      console.error('❌ Failed to fetch thread:', err);
    }
  };
    

  const handleSendMessage = async () => {
    if (!newMessageContent.trim() || !selectedThread || !currentUserId) return;
  
    const content = newMessageContent.trim();
    setNewMessageContent('');
  
    const optimisticMessage: Message = {
      id: Date.now(), // temporary ID
      conversationId: selectedThread.id,
      senderId: currentUserId,
      senderName: currentUserName,
      content,
      timestamp: new Date().toISOString(),
    };
  
    // Optimistically update selectedThread
    setSelectedThread(prev => prev ? {
      ...prev,
      messages: [...(prev.messages || []), optimisticMessage],
      lastMessage: optimisticMessage.content,
      lastMessageTimestamp: optimisticMessage.timestamp,
    } : null);
  
    try {
      const res = await api.post('/messages', {
        conversation_id: selectedThread.id,
        sender_id: currentUserId,
        content,
      });
  
      const message = res.data?.data || res.data;
  
      // Replace optimistic message with real one
      setSelectedThread(prev => prev ? {
        ...prev,
        messages: [...(prev.messages || []).slice(0, -1), message],
        lastMessage: message.content,
        lastMessageTimestamp: message.timestamp,
      } : null);
  
      // Update sidebar threads: move this thread to top or update if already exists
      setThreads(prev => {
        const exists = prev.find(t => t.id === selectedThread.id);
        const updatedThread: MessageThread = {
          ...(exists || selectedThread),
          lastMessage: message.content,
          lastMessageTimestamp: message.timestamp,
        };

        const others = prev.filter(t => t.id !== selectedThread.id);
        return [updatedThread, ...others];
      });
  
    } catch (err: unknown) {
      console.error('❌ Failed to send message:', err);
      // (Optional) You could show a toast or revert the optimistic update here
    }
  };
  

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setIsSearching(true);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    searchTimeout.current = setTimeout(() => {
      if (!term.trim()) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      const lowerTerm = term.toLowerCase();
      const results = availableUsers.filter(user => {
        const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
        const email = user.email?.toLowerCase() || '';
        return (
          user.first_name.toLowerCase().includes(lowerTerm) ||
          user.last_name.toLowerCase().includes(lowerTerm) ||
          fullName.includes(lowerTerm) ||
          email.includes(lowerTerm)
        ) && user.id !== currentUserId;
      });

      setSearchResults(results);
      setIsSearching(false);
    }, 300);
  };

  const handleStartChatWithUser = async (user: User) => {
    try {
      const res = await api.post('/conversations', {
        user1_id: currentUserId,
        user2_id: user.id,
      });
  
      const conversationData = res.data?.data?.conversation || res.data?.conversation || res.data;
  
      // Add participants array if not already present
      if (!conversationData.participants) {
        conversationData.participants = [currentUserId, user.id];
      }
  
      // Fetch messages for the conversation
      const messagesRes = await api.get(`/messages/${conversationData.id}`);
      const fetchedMessages = messagesRes.data?.data?.messages || [];
  
      // Update conversation with messages and last message details
      const lastMsg = fetchedMessages[fetchedMessages.length - 1];
      const updatedThread: MessageThread = {
        ...conversationData,
        messages: fetchedMessages,
        lastMessage: lastMsg?.content || '',
        lastMessageTimestamp: lastMsg?.timestamp || '',
        other_user_id: user.id,
        other_user_name: `${user.first_name} ${user.last_name}`,
        other_user_avatar: user.avatarUrl,
      };
  
      setThreads(prev => {
        const exists = prev.find(t => t.id === updatedThread.id);
        if (exists) return [updatedThread, ...prev.filter(t => t.id !== updatedThread.id)];
        return [updatedThread, ...prev];
      });

      setSelectedThread(updatedThread);
      setSearchResults([]);
      setSearchTerm('');
    } catch (err: unknown) {
      console.error('❌ Failed to start chat:', err);
    }
  };

  const handleDeleteChat = async () => {
    if (!selectedThread || !currentUserId) return;
    if (!window.confirm('Delete this conversation?')) return;
    await api.delete(`/conversations/${selectedThread.id}/user/${currentUserId}`);
    setThreads(prev => prev.filter(t => t.id !== selectedThread.id));
    setSelectedThread(null);
  };
  

  // Fetch reactions for all messages in selected thread
  useEffect(() => {
    const fetchReactions = async () => {
      if (!selectedThread) return;
      const newReactions: { [msgId: number]: Reaction[] } = {};
      await Promise.all(
        selectedThread.messages
          .filter(msg => typeof msg.id === 'number' && msg.id < 2147483647)
          .map(async (msg) => {
            try {
              const res = await api.get(`/reactions/messages/${msg.id}/reactions`);
              newReactions[msg.id] = res.data?.data || [];
            } catch {
              // ignore error
            }
          })
      );
      setReactions(newReactions);
    };
    fetchReactions();
  }, [selectedThread]);

  const handleReactToMessage = async (messageId: number, emoji: string) => {
    if (!currentUserId) return;
    const userReactions = reactions[messageId] || [];
    const alreadyReacted = userReactions.some(r => r.user_id === currentUserId && r.emoji === emoji);
    try {
      if (alreadyReacted) {
        // Remove reaction
        await api.delete(`/reactions/messages/${messageId}/reactions/${currentUserId}`);
      } else {
        // Add or update reaction
        await api.post(`/reactions/messages/${messageId}/reactions`, {
          userId: currentUserId,
          emoji,
        });
      }
      // Refresh reactions for this message only
      const res = await api.get(`/reactions/messages/${messageId}/reactions`);
      setReactions((prev) => ({ ...prev, [messageId]: res.data?.data || [] }));
    } catch {
      // Optionally show error
    }
  };

  const handleDeleteMessage = async (messageId: number) => {
    if (!currentUserId) return;
    if (!window.confirm('Delete this message for everyone?')) return;
    try {
      await api.delete(`/messages/${messageId}`, { data: { sender_id: currentUserId } });
      // Remove from UI
      setSelectedThread((prev) =>
        prev
          ? {
              ...prev,
              messages: prev.messages.filter((msg) => msg.id !== messageId),
            }
          : null
      );
      setReactions((prev) => {
        const newReactions = { ...prev };
        delete newReactions[messageId];
        return newReactions;
      });
    } catch {
      // Optionally show error
    }
  };

  if (!currentUserId) {
    return <div className="p-8 text-red-500">❌ User not logged in. Please login first.</div>;
  }

  if (loading) {
    return <div className="flex-1 p-8 flex items-center justify-center bg-dark-darker text-white text-xl">Loading messages...</div>;
  }

  if (error) {
    return <div className="flex-1 p-8 bg-dark-darker text-red-500 text-xl">Error loading messages: {error}</div>;
  }

  return (
    <div className="flex h-screen">
      <aside className="w-80 p-6 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        {/* Sidebar Search */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Threads</h2>
        </div>
        <div className="relative mb-3">
          <input
            className="w-full p-2 pl-10 rounded bg-[#231a3a]"
            placeholder="Search users..."
            value={searchTerm}
            onChange={e => handleSearch(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3 text-purple-300" />
        </div>
  
        {isSearching ? (
          <div className="text-purple-300 text-sm">Searching...</div>
        ) : searchResults.length > 0 && (
          <ul className="mb-4 bg-[#2e204d] rounded p-2">
            {searchResults.map(user => (
              <li
                key={user.id}
                className="cursor-pointer p-2 hover:bg-purple-800 rounded flex items-center gap-2"
                onClick={() => handleStartChatWithUser(user)}
              >
                <img src={user.avatarUrl || `https://www.gravatar.com/avatar/${user.id}?d=identicon`} alt="avatar" className="w-6 h-6 rounded-full" />
                {user.first_name} {user.last_name}
              </li>
            ))}
          </ul>
        )}
  
        {/* Thread List */}
        <ul className="space-y-4 flex-1">
          {threads.length === 0 ? (
            <div className="text-purple-300 mt-12 text-center text-sm">No conversations yet. Start chatting!</div>
          ) : (
            threads.map(thread => (
              <li
                key={thread.id}
                className={`p-4 rounded-lg cursor-pointer transition ${selectedThread?.id === thread.id ? 'bg-purple-800' : 'hover:bg-[#231a3a]'}`}
                onClick={() => handleThreadSelect(thread)}
              >
                <div className="font-semibold truncate">{thread.other_user_name || 'Unnamed User'}</div>
                {thread.lastMessage && (
                  <div className="text-sm text-gray-400 truncate">{thread.lastMessage}</div>
                )}
              </li>
            ))
          )}
        </ul>
      </aside>
  
      <div className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {selectedThread ? (
          <>
            {/* Chat Header with Dropdown */}
            <header className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
              <h3 className="text-lg font-semibold">{selectedThread.other_user_name}</h3>
              <div className="relative">
                <button onClick={toggleMenu} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
                  <FaEllipsisV />
                </button>
                {showMenu && (
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow z-10">
                    <button onClick={handleDeleteChat} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                      🗑️ Delete Chat
                    </button>
                  </div>
                )}
              </div>
            </header>
  
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedThread.messages.map((message) => {
                const isCurrentUser = message.senderId === currentUserId;
                return (
                  <div
                    key={message.id}
                    className={`flex items-center group ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                    style={{ position: 'relative' }}
                  >
                    {/* Action icons beside message, only on hover */}
                    <div className="flex flex-col items-center mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        className="text-xl p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full mb-1"
                        onClick={() => setEmojiPickerMsgId(message.id)}
                        title="React"
                      >
                        <FaSmile />
                      </button>
                      {isCurrentUser && (
                        <button
                          className="text-xl p-1 hover:bg-red-200 dark:hover:bg-red-700 rounded-full"
                          onClick={() => handleDeleteMessage(message.id)}
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                    <div className={`max-w-[70%] rounded-lg p-3 relative ${isCurrentUser ? 'bg-primary-light text-white' : 'bg-[#231a3a] text-white'}`}> 
                      <div className="text-sm font-semibold mb-1">{message.senderName}</div>
                      <div>{message.content}</div>
                      <div className="text-xs mt-1 opacity-70">{formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}</div>
                      {/* Emoji Picker Popover - horizontal and on opposite side */}
                      {emojiPickerMsgId === message.id && (
                        <div
                          className={`absolute z-20 top-1/2 -translate-y-1/2 ${isCurrentUser ? 'right-full mr-2' : 'left-full ml-2'} bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow p-2 flex flex-row gap-1`}
                          onMouseLeave={() => setEmojiPickerMsgId(null)}
                        >
                          {emojiOptions.map((emoji) => (
                            <button
                              key={emoji}
                              className="text-3xl p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                              onClick={() => { handleReactToMessage(message.id, emoji); setEmojiPickerMsgId(null); }}
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      )}
                      {/* Reactions display - for sender (right msg), show further left; for receiver (left msg), show further right */}
                      {reactions[message.id] && reactions[message.id].length > 0 && (
                        <div
                          className={`absolute flex gap-1 bottom-1 ${isCurrentUser ? '' : 'right-2'} mb-1`}
                          style={
                            isCurrentUser
                              ? { left: 'auto', right: '100%', marginRight: '32px' } // move further left, outside bubble
                              : { left: '100%', marginLeft: '32px' } // move further right, outside bubble
                          }
                        >
                          {emojiOptions.map((emoji) => {
                            // Only show each emoji once per message, highlight if current user reacted
                            const hasReaction = reactions[message.id].some((r) => r.emoji === emoji);
                            const userReacted = reactions[message.id].some((r) => r.emoji === emoji && r.user_id === currentUserId);
                            return hasReaction ? (
                              <span
                                key={emoji}
                                className={`text-2xl bg-gray-700 rounded-full flex items-center justify-center shadow p-1 cursor-pointer border-2 ${userReacted ? 'border-yellow-400' : 'border-transparent'} transition-all`}
                                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                                onClick={() => handleReactToMessage(message.id, emoji)}
                                title={userReacted ? 'Remove your reaction' : 'React'}
                              >
                                {emoji}
                              </span>
                            ) : null;
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              <div ref={messageEndRef} />
            </div>
  
            {/* Message Input */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={newMessageContent}
                  onChange={(e) => setNewMessageContent(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 rounded-full px-6 py-2 bg-[#231a3a] text-white placeholder-purple-300 focus:outline-none"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-6 py-2 bg-primary-light text-white rounded-full font-semibold hover:bg-primary transition"
                >
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          // Placeholder View
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 text-center">
            <div className="flex space-x-2 mb-6">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-3 h-3 rounded-full bg-gray-400 opacity-50"
                  animate={{ y: [0, -6, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.9,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
            <h3 className="text-xl font-semibold">Select a conversation to start messaging</h3>
            <p className="text-sm mt-2">or search for a user to start a new one.</p>
          </div>
        )}
      </div>
    </div>
  );  
};

export default Messages;
