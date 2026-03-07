import React from 'react';
import useFetchNews from '../hooks/useFetchNews';
import HomeSection from '../components/HomeSection';
import FeaturedHero from '../components/FeaturedHero';

const Home = () => {
  // 1. Trending (Featured Hero + Row)
  const { data: trendingData, isLoading: trendingLoading } = useFetchNews({
    ordering: '-relevance',
    discover: true,
  });

  // 2. PlayStation Highlights (PS5=187, PS4=18)
  const { data: psData, isLoading: psLoading } = useFetchNews({
    platforms: '187,18',
    ordering: '-rating',
  });

  // 3. Xbox Collection (Series X=186, One=1)
  const { data: xboxData, isLoading: xboxLoading } = useFetchNews({
    platforms: '186,1',
    ordering: '-rating',
  });

  // 4. Coming Soon
  const today = new Date().toISOString().split('T')[0];
  const { data: soonData, isLoading: soonLoading } = useFetchNews({
    dates: `${today},2027-12-31`,
    ordering: 'released',
  });

  const featuredGame = trendingData?.[0];

  return (
    <div className="pb-16">
      {/* High impact featured hero */}
      <FeaturedHero game={featuredGame} isLoading={trendingLoading} />

      {/* Themed sections */}
      <HomeSection
        title="Trending Now"
        data={trendingData}
        isLoading={trendingLoading}
        seeAllPath="/discover/top"
      />

      <HomeSection
        title="PlayStation Hits"
        data={psData}
        isLoading={psLoading}
        seeAllPath="/discover/top"
      />

      <HomeSection
        title="Xbox Essentials"
        data={xboxData}
        isLoading={xboxLoading}
        seeAllPath="/discover/top"
      />

      <HomeSection
        title="Coming Soon"
        data={soonData}
        isLoading={soonLoading}
        seeAllPath="/discover/coming-soon"
      />
    </div>
  );
};

export default Home;
