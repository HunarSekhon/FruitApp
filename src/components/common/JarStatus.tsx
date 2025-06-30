import React from 'react';

interface JarStatusProps {
    isEmpty: boolean;
  }
  
  const JarStatus: React.FC<JarStatusProps> = ({ isEmpty }) => {
    if (!isEmpty) return null;
  
    return (
        <div className="bg-green-100 p-6 rounded-2xl shadow-md text-center">
        <div className="text-6xl mb-4">🫙</div>
        <h3 className="text-lg font-semibold mb-2">Your jar is empty</h3>
        <p className="text-sm text-black">Add some fruits from the left panel!</p>
      </div>
    );
  };
  
  export default JarStatus;