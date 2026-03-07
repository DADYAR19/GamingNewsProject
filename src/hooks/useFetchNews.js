import { useState, useEffect } from 'react';
import axios from 'axios';
import { dummyNews } from '../services/dummyData';

// We fall back to dummyData if no API key is provided or if the API limit is reached.
// Use Vite's environment variable system (VITE_RAWG_API_KEY)
const API_KEY = import.meta.env.VITE_RAWG_API_KEY || 'demo_key'; 
const BASE_URL = 'https://api.rawg.io/api';

const useFetchNews = (params = {}) => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const paramsString = JSON.stringify(params);

  useEffect(() => {
    let isMounted = true;
    const fetchGames = async () => {
      setIsLoading(true);
      try {
        if (API_KEY === 'demo_key') {
          // Fallback logic remains for demo mode
          setData(dummyNews);
          setCount(dummyNews.length);
          setIsLoading(false);
          return;
        }

        const response = await axios.get(`${BASE_URL}/games`, {
          params: {
            key: API_KEY,
            ordering: '-added',
            page_size: 24,
            platforms: '187,18,186,1', // PS5, PS4, Xbox Series, Xbox One
            ...params
          },
          timeout: 12000
        });

        const formattedData = response.data.results.map((game) => ({
          id: game.id,
          title: game.name,
          excerpt: `A ${game.genres.map(g => g.name).join(', ')} adventure. Rated ${game.rating}/5. Released: ${game.released || 'TBA'}.`,
          imageUrl: game.background_image || 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=2638&auto=format&fit=crop',
          category: game.genres.length > 0 ? game.genres[0].name : 'Gaming',
          date: game.released || game.updated,
          author: 'GameDB',
          platforms: game.platforms?.map(p => p.platform.name) || [],
          rating: game.rating,
          metacritic: game.metacritic
        }));

        if (isMounted) {
          setData(formattedData);
          setCount(response.data.count);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          console.warn('API fetch issue:', err.message);
          setData(dummyNews);
          setCount(dummyNews.length);
          setError('Failed to fetch from live database. Showing demo data.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchGames();
    return () => { isMounted = false; };
  }, [paramsString]);

  return { data, count, isLoading, error };
};

export default useFetchNews;
