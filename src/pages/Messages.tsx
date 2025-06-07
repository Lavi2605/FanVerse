import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa'; // Import icon for new message

// Add props interface for Messages page
interface MessagesProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

// Placeholder data structures (These will be replaced with fetched data)
interface User {
  id: string;
  name: string; // Real user name
  avatarUrl?: string; // Optional avatar URL
}

interface Message {
  id: string;
  threadId: string;
  senderId: string;
  senderName: string; // Real user name
  content: string;
  timestamp: string; // ISO 8601 string
}

interface MessageThread {
  id: string;
  participants: string[]; // Array of user IDs
  subject?: string; // Optional subject for the thread
  lastMessage?: string; // Optional: Content of the last message
  lastMessageTimestamp?: string; // Optional: Timestamp of the last message
  messages: Message[]; // Array of Message objects within this thread
}

const Messages: React.FC<MessagesProps> = () => {
  // State for managing threads and selected thread
  const [threads, setThreads] = useState<MessageThread[]>([]);
  const [selectedThread, setSelectedThread] = useState<MessageThread | null>(null);
  const [newMessageContent, setNewMessageContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for new thread modal
  const [isNewThreadModalOpen, setIsNewThreadModalOpen] = useState(false);
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]); // Array of user IDs

  // Simulated authenticated user ID and Name (replace with real user context)
  const currentUserId = localStorage.getItem('userId') || 'currentUser';
  const currentUserName = localStorage.getItem('userEmail') || 'Current User'; // Using email as name for now

  // Effect to simulate fetching message threads and available users
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      // TODO: Replace with actual API call to GET /api/messages/threads
      // TODO: Replace with actual API call to GET /api/users
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Simulated fetched data (replace with real API responses)
        const dummyUsers: User[] = [
          { id: 'user2', name: 'Bob' },
          { id: 'user3', name: 'Charlie' },
          { id: 'user4', name: 'David' },
          // Add more dummy users as needed
        ];
        setAvailableUsers(dummyUsers);

        const dummyThreads: MessageThread[] = [
          {
            id: 'thread-1',
            participants: [currentUserId, 'user2'],
            subject: 'Discussion about NFT #123',
            lastMessage: 'Hey, what do you think about this piece? (Simulated)',
            lastMessageTimestamp: '2023-10-27T10:00:00Z',
            messages: [
              { id: 'msg-1', threadId: 'thread-1', senderId: 'user2', senderName: 'Bob', content: 'Hello! (Simulated)', timestamp: '2023-10-27T09:58:00Z' },
              { id: 'msg-2', threadId: 'thread-1', senderId: currentUserId, senderName: currentUserName, content: 'Hey, what do you think about this piece? (Simulated)', timestamp: '2023-10-27T10:00:00Z' },
            ],
          },
          {
            id: 'thread-2',
            participants: [currentUserId, 'user3'],
            subject: 'Question about Marketplace',
            lastMessage: 'How do I list an item? (Simulated)',
            lastMessageTimestamp: '2023-10-26T15:30:00Z',
            messages: [
              { id: 'msg-3', threadId: 'thread-2', senderId: 'user3', senderName: 'Charlie', content: 'Hi, I have a question. (Simulated)', timestamp: '2023-10-26T15:28:00Z' },
              { id: 'msg-4', threadId: 'thread-2', senderId: currentUserId, senderName: currentUserName, content: 'How do I list an item? (Simulated)', timestamp: '2023-10-26T15:30:00Z' },
            ],
          },
          {
            id: 'thread-3',
            participants: [currentUserId, 'user4'],
            subject: 'Project Collaboration',
            lastMessage: "Let's sync up next week. (Simulated)",
            lastMessageTimestamp: '2023-10-25T09:00:00Z',
            messages: [
              { id: 'msg-5', threadId: 'thread-3', senderId: 'user4', senderName: 'David', content: 'Okay, sounds good. (Simulated)', timestamp: '2023-10-25T08:55:00Z' },
              { id: 'msg-6', threadId: 'thread-3', senderId: currentUserId, senderName: currentUserName, content: "Let's sync up next week. (Simulated)", timestamp: '2023-10-25T09:00:00Z' },
            ],
          },
        ];
        setThreads(dummyThreads);
      } catch (err: any) {
        setError('Failed to fetch data: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUserId, currentUserName]); // Rerun if user changes (though typically won't in this app flow)

  const handleThreadSelect = (thread: MessageThread) => {
    setSelectedThread(thread);
    // TODO: Optionally fetch full message history for the selected thread if not already loaded (GET /api/messages/threads/:threadId)
  };

  const handleSendMessage = async () => {
    if (!newMessageContent.trim() || !selectedThread) return;

    const messageToSend = newMessageContent.trim();
    setNewMessageContent(''); // Clear input immediately

    const optimisticMessage: Message = {
      id: `temp-msg-${Date.now()}`, // Temporary ID for optimistic update
      threadId: selectedThread.id,
      senderId: currentUserId,
      senderName: currentUserName,
      content: messageToSend,
      timestamp: new Date().toISOString(),
    };

    // Optimistically add the new message to the selected thread
    setSelectedThread(prevThread => {
      if (!prevThread) return null;
      return {
        ...prevThread,
        messages: [...prevThread.messages, optimisticMessage],
        lastMessage: optimisticMessage.content,
        lastMessageTimestamp: optimisticMessage.timestamp,
      };
    });

     // Update the last message preview in the thread list
    setThreads(prevThreads =>
      prevThreads.map(thread =>
        thread.id === selectedThread.id ? { ...thread, lastMessage: optimisticMessage.content, lastMessageTimestamp: optimisticMessage.timestamp } : thread
      )
    );

    // TODO: Replace with actual API call to POST /api/messages/threads/:threadId/messages
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log(`Simulated sending message to thread ${selectedThread.id}: ${messageToSend}`);

      // TODO: Handle actual API response
      // If successful, replace the optimistic message with the real one from the backend response (which will have a real ID)
      // If failed, show an error and potentially revert the optimistic update.

    } catch (err: any) {
      console.error('Simulated send failed:', err);
      // TODO: Implement error handling, e.g., show a toast notification
      // TODO: Potentially revert the optimistic update if the send failed
    }
  };

  const handleCreateNewThread = async () => {
    if (selectedParticipants.length === 0) return; // Need participants
    // Add current user to participants if not already included
    const allParticipants = [...new Set([...selectedParticipants, currentUserId])];

    // TODO: Replace with actual API call to POST /api/messages/threads
    try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Simulated new thread response
        const newThreadId = `thread-${Date.now()}`;
        const newThread: MessageThread = {
            id: newThreadId,
            participants: allParticipants,
            // Subject is optional, or could be derived from participants
            lastMessage: '', // No messages initially
            lastMessageTimestamp: '',
            messages: [],
        };

        setThreads(prevThreads => [newThread, ...prevThreads]);
        setSelectedThread(newThread); // Select the new thread
        setIsNewThreadModalOpen(false); // Close modal
        setSelectedParticipants([]); // Clear selected participants

        console.log(`Simulated creating new thread with participants: ${allParticipants.join(', ')}`);

    } catch (err: any) {
      console.error('Simulated create thread failed:', err);
      // TODO: Implement error handling
    }
  };

  if (loading) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center bg-dark-darker text-white text-xl">
        Loading messages...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-8 bg-dark-darker text-red-500 text-xl">
        Error loading messages: {error}
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-dark-darker text-white">
      {/* Left Sidebar: Message Threads List */}
      <aside className="w-80 bg-[#1a1333] p-6 overflow-y-auto border-r border-gray-700 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Threads</h2>
          <button 
            onClick={() => setIsNewThreadModalOpen(true)}
            className="p-2 rounded-full bg-primary-light hover:bg-primary transition"
            title="Start new conversation"
          >
            <FaPlus className="text-white" />
          </button>
        </div>
        
        <ul className="space-y-4 flex-1">
          {threads.map(thread => (
            <li
              key={thread.id}
              className={`p-4 rounded-lg cursor-pointer transition ${selectedThread?.id === thread.id ? 'bg-purple-800' : 'hover:bg-[#231a3a]'}`}
              onClick={() => handleThreadSelect(thread)}
            >
              {/* Display participants' names or subject */}
              <div className="font-semibold text-white mb-1 truncate">
                {thread.subject || 
                  thread.participants
                    .filter(p => p !== currentUserId) // Exclude current user
                    .map(p => availableUsers.find(u => u.id === p)?.name || 'Unknown User')
                    .join(', ')}
              </div>
              {thread.lastMessage && (
                <div className="text-sm text-gray-400 truncate">
                  {thread.lastMessage}
                </div>
              )}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between bg-gradient-to-r from-[#2d185a] to-[#18122b] px-8 py-4 rounded-b-2xl shadow-lg">
          <div className="flex items-center gap-4 w-1/2">
            <input className="rounded-full px-6 py-2 w-full bg-[#231a3a] text-white placeholder-purple-300 focus:outline-none" placeholder="Search messages..." />
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 cursor-pointer">
              <img 
                src={`https://www.gravatar.com/avatar/${currentUserId}?d=identicon`} 
                alt="avatar" 
                className="rounded-full w-10 h-10 border-2 border-purple-400" 
              />
              <div className="text-white font-bold">{currentUserName}</div>
              <span className="text-purple-300 text-xs">@{currentUserName.split('@')[0]}</span>
            </div>
          </div>
        </header>

        {/* Message Content */}
        <div className="flex-1 flex flex-col">
          {selectedThread ? (
            <>
              {/* Message Thread Header */}
              <div className="p-4 border-b border-gray-700">
                <h3 className="text-lg font-semibold">
                  {selectedThread.subject || 
                    selectedThread.participants
                      .filter(p => p !== currentUserId)
                      .map(p => availableUsers.find(u => u.id === p)?.name || 'Unknown User')
                      .join(', ')}
                </h3>
              </div>

              {/* Messages List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedThread.messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.senderId === currentUserId
                          ? 'bg-primary-light text-white'
                          : 'bg-[#231a3a] text-white'
                      }`}
                    >
                      <div className="text-sm font-semibold mb-1">
                        {message.senderName}
                      </div>
                      <div>{message.content}</div>
                      <div className="text-xs mt-1 opacity-70">
                        {new Date(message.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-700">
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={newMessageContent}
                    onChange={(e) => setNewMessageContent(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
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
            <div className="flex-1 flex items-center justify-center text-gray-400">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>

      {/* New Thread Modal */}
      {isNewThreadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1a1333] p-6 rounded-xl w-96">
            <h3 className="text-xl font-bold mb-4">New Conversation</h3>
            <div className="space-y-4">
              {availableUsers.map(user => (
                <div
                  key={user.id}
                  className={`p-3 rounded-lg cursor-pointer transition ${
                    selectedParticipants.includes(user.id)
                      ? 'bg-primary-light text-white'
                      : 'bg-[#231a3a] text-white hover:bg-purple-700'
                  }`}
                  onClick={() => {
                    setSelectedParticipants(prev =>
                      prev.includes(user.id)
                        ? prev.filter(id => id !== user.id)
                        : [...prev, user.id]
                    );
                  }}
                >
                  {user.name}
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsNewThreadModalOpen(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNewThread}
                className="px-4 py-2 bg-primary-light text-white rounded-lg font-semibold hover:bg-primary transition"
              >
                Start Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages; 