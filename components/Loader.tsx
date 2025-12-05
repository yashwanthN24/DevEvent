import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay with subtle blur */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      
      {/* Spinner container */}
      <div className="relative">
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full blur-xl bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-cyan-500/30 animate-pulse" />
        
        {/* Glass spinner */}
        <div className="relative w-16 h-16 rounded-full border-4 border-transparent bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 backdrop-blur-md animate-spin">
          <div className="absolute inset-0 rounded-full border-4 border-t-purple-500/60 border-r-blue-500/60 border-b-cyan-500/60 border-l-transparent" />
        </div>
        
        {/* Inner radiant glow */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-purple-400/10 via-blue-400/10 to-cyan-400/10 blur-md" />
      </div>
      
      {/* Loading text (optional) */}
      <p className="absolute mt-24 text-sm font-medium bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default Loader;
