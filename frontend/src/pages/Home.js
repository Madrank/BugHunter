import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api';

function Home() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/bugs?page=${page}&limit=10`);
      console.log('API Response:', response.data); // Pour déboguer
      
      // Vérifie si la réponse a la structure attendue
      if (response.data && response.data.data) {
        setBugs(response.data.data);
        setPagination({
          currentPage: response.data.pagination.currentPage,
          totalPages: response.data.pagination.totalPages,
          hasNextPage: response.data.pagination.hasNextPage,
          hasPrevPage: response.data.pagination.hasPrevPage
        });
      } else {
        // Fallback pour l'ancienne structure (au cas où)
        setBugs(Array.isArray(response.data) ? response.data : []);
        setPagination({
          currentPage: 1,
          totalPages: 1,
          hasNextPage: false,
          hasPrevPage: false
        });
      }
    } catch (error) {
      console.error('Error fetching bugs:', error);
      setError('Impossible de charger les bugs. Vérifiez que le backend est démarré.');
      setBugs([]);
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
  
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400">Chargement des bugs...</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-400 mb-4">⚠️ {error}</div>
        <button 
          onClick={() => fetchBugs(1)} 
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Réessayer
        </button>
      </div>
    );
  }
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🐛 Bugs ouverts</h2>
      
      {bugs.length === 0 ? (
        <div className="text-center text-gray-400 py-8">
          Aucun bug pour le moment. Soyez le premier à en signaler un !
        </div>
      ) : (
        <>
          <div className="grid gap-4">
            {bugs.map(bug => (
              <Link key={bug.id} to={`/bug/${bug.id}`}>
                <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition">
                  <h3 className="text-xl font-semibold">{bug.title}</h3>
                  <p className="text-gray-400 mt-2">
                    {bug.description && bug.description.substring(0, 150)}
                    {bug.description && bug.description.length > 150 ? '...' : ''}
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="bg-blue-600 px-2 py-1 rounded text-sm">{bug.language}</span>
                    <span className="text-gray-500 text-sm">Par {bug.User?.username || 'Anonyme'}</span>
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
                ← Précédent
              </button>
              
              <span className="px-4 py-2 bg-gray-800 rounded">
                Page {pagination.currentPage} / {pagination.totalPages}
              </span>
              
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={!pagination.hasNextPage}
                className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition"
              >
                Suivant →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;