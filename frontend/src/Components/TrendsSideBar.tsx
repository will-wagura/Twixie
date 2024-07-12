import React from 'react';

const TRENDS = [
  { topic: '#RutoMustBeStopped', tweets: '5,876 posts' },
  { topic: 'Moses Kuria', tweets: '82.2K posts' },
  { topic: 'Isaac Mwaura', tweets: '144K posts' },
  { topic: 'Murkomen', tweets: '144K posts' },
  { topic: '#OccupyKampala', tweets: '3,032 posts' },
  { topic: '#RutoMustGo', tweets: '978K posts' },
  { topic: 'Gladys Wanga', tweets: '18.7K posts' },
  { topic: 'BREAKING NEWS', tweets: '151K posts' },
  { topic: '#Azziad', tweets: '2,933 posts' },
];

const TrendsSidebar: React.FC = () => {
  return (
    <div className="w-[23%] sticky top-0 xl:flex flex-col items-stretch h-screen hidden">
      <div className="flex flex-col items-stretch h-full space-y-4 mt-4">
        <div className="bg-white p-4 rounded-3xl shadow-md">
          <h2 className="text-xl font-bold">Trends for you</h2>
          {TRENDS.map((trend) => (
            <div key={trend.topic} className="mt-4">
              <div className="font-semibold">{trend.topic}</div>
              <div className="text-gray-500 text-sm">{trend.tweets}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendsSidebar;
