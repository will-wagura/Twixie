import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/ReplyForm.css';

const ReplyForm: React.FC<{ tweetId: number, onReply?: (reply: { id: number, content: string }) => void }> = ({ tweetId, onReply }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in local storage');
      return;
    }

    try {
      const response = await axios.post(`http://127.0.0.1:5000/api/tweet/${tweetId}/reply`, { content }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (onReply) {
        onReply(response.data);
      }
      setContent('');
    } catch (error) {
      console.error('Error posting reply:', error);
      // Consider providing a more user-friendly error message
    }
  };

  return (
    <form className="reply-form" onSubmit={handleSubmit}>
      <div>
        <label>Reply</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
      </div>
      <button type="submit">Post Reply</button>
    </form>
  );
};

export default ReplyForm;