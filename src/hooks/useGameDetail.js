import { useState, useEffect } from 'react';
import axios from 'axios';
import { dummyNews } from '../services/dummyData';

const API_KEY = import.meta.env.VITE_RAWG_API_KEY || 'demo_key';
const BASE_URL = 'https://api.rawg.io/api';

const useGameDetail = (id) => {
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    
    let isMounted = true;
    const fetchGameDetails = async () => {
      setIsLoading(true);
      try {
        // Fallback to dummy data if API key is missing
        if (API_KEY === 'demo_key') {
          const dummyItem = dummyNews.find(item => item.id === parseInt(id)) || dummyNews[0];
          
          if (isMounted) {
            setGame({
              ...dummyItem,
              name: dummyItem.title,
              description: dummyItem.excerpt + "\n\nNote: You are currently seeing mock data because no RAWG API key was found in your .env file. Add a VITE_RAWG_API_KEY to see real game descriptions and live data!",
              released: dummyItem.date,
              background_image: dummyItem.imageUrl,
              rating: dummyItem.rating || 4.5,
              playtime: 40,
              genres: [{ name: dummyItem.category }],
              platforms: dummyItem.platforms?.map(p => ({ platform: { name: p } })) || [{ platform: { name: 'PC' } }],
              publishers: [{ name: dummyItem.author }],
              website: 'https://rawg.io'
            });
            setScreenshots([
              { id: 101, image: dummyItem.imageUrl },
              { id: 102, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop' }
            ]);
            setTrailers([]);
            setError(null);
          }
          return;
        }

        const [detailRes, screenshotRes, movieRes] = await Promise.all([
          axios.get(`${BASE_URL}/games/${id}?key=${API_KEY}`),
          axios.get(`${BASE_URL}/games/${id}/screenshots?key=${API_KEY}`),
          axios.get(`${BASE_URL}/games/${id}/movies?key=${API_KEY}`)
        ]);

        if (isMounted) {
          setGame(detailRes.data);
          setScreenshots(screenshotRes.data.results);
          setTrailers(movieRes.data.results || []);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          // Final fallback on network errors
          const dummyItem = dummyNews.find(item => item.id === parseInt(id)) || dummyNews[0];
          setGame({
            ...dummyItem,
            name: dummyItem.title,
            description: dummyItem.excerpt + "\n\n(Network Error Fallback: Could not fetch live data)",
            background_image: dummyItem.imageUrl,
            genres: [{ name: dummyItem.category }],
            platforms: [{ platform: { name: 'Multiplatform' } }]
          });
          setScreenshots([{ id: 1, image: dummyItem.imageUrl }]);
          setTrailers([]);
          setError(null); 
          console.warn('Game detail fetch error, using fallback:', err.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchGameDetails();
    return () => { isMounted = false; };
  }, [id]);

  return { game, screenshots, trailers, isLoading, error };
};

export default useGameDetail;
