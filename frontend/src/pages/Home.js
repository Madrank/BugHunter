import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api';

function Home() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false
  });
  
  useEffect(() => {
    fetchBugs(1);
  }, []);
  
  const fetchBugs = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/bugs?page=${page}&limit=10`);
      setBugs(response.data.data);
      setPagination({
        currentPage: response.data.pagination.currentPage,
        totalPages: response.data.pagination.totalPages,
        hasNextPage: response.data.pagination.hasNextPage,
        hasPrevPage: response.data.pagination.hasPrevPage
      });
    } catch (error) {
      console.error('Error fetching bugs:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchBugs(newPage);
      window.scrollTo(0, 0);
    }
  };
  
  if (loading) return <div className="text-center py-8">Loading...</div>;
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🐛 Open Bugs</h2>
      
      {bugs.length === 0 ? (
        <div className="text-center text-gray-400 py-8">
          No bugs yet. Be the first to report one!
        </div>
      ) : (
        <>
          <div className="grid gap-4">
            {bugs.map(bug => (
              <Link key={bug.id} to={`/bug/${bug.id}`}>
                <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition">
                  <h3 className="text-xl font-semibold">{bug.title}</h3>
                  <p className="text-gray-400 mt-2">{bug.description.substring(0, 150)}...</p>
                  <div className="mt-2 flex gap-2">
                    <span className="bg-blue-600 px-2 py-1 rounded text-sm">{bug.language}</span>
                    <span className="text-gray-500 text-sm">By {bug.User?.username}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Pagination Controls */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={!pagination.hasPrevPage}
                className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition"
              >
                ← Previous
              </button>
              
              <span className="px-4 py-2 bg-gray-800 rounded">
                Page {pagination.currentPage} / {pagination.totalPages}
              </span>
              
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={!pagination.hasNextPage}
                className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;