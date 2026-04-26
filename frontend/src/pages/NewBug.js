import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api';

function NewBug() {
  const [formData, setFormData] = useState({
    title: '',
    code_snippet: '',
    description: '',
    language: 'javascript'
  });
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(`${API_URL}/bugs`, formData, {
        headers: { 'x-auth-token': token }
      });
      navigate('/');
    } catch (error) {
      console.error('Error creating bug:', error);
      alert('Error creating bug');
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Report a Bug</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Bug Title"
          className="w-full p-2 bg-gray-800 rounded"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />
        
        <select
          className="w-full p-2 bg-gray-800 rounded"
          value={formData.language}
          onChange={(e) => setFormData({...formData, language: e.target.value})}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="html">HTML/CSS</option>
        </select>
        
        <textarea
          placeholder="Describe the bug in detail..."
          className="w-full p-2 bg-gray-800 rounded h-32"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          required
        />
        
        <textarea
          placeholder="Paste your code here..."
          className="w-full p-2 bg-gray-800 rounded font-mono h-64"
          value={formData.code_snippet}
          onChange={(e) => setFormData({...formData, code_snippet: e.target.value})}
          required
        />
        
        <button type="submit" className="bg-blue-600 px-6 py-2 rounded hover:bg-blue-700">
          Submit Bug
        </button>
      </form>
    </div>
  );
}

export default NewBug;