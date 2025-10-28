import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const GifPicker = ({ onSelectGif, onClose }) => {
  const [search, setSearch] = useState('');
  const [gifs, setGifs] = useState([]);

  // Sample GIFs - In production, integrate with GIPHY API
  const sampleGifs = [
    'https://media.giphy.com/media/3oz8xAFtqoOUUrsh7W/giphy.gif',
    'https://media.giphy.com/media/g9582DNuQppxC/giphy.gif',
    'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif',
    'https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif',
    'https://media.giphy.com/media/3oz8xIsloV7zOmt81G/giphy.gif',
    'https://media.giphy.com/media/26BRBKqUiq586bRVm/giphy.gif'
  ];

  useEffect(() => {
    setGifs(sampleGifs);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-[fadeIn_0.3s_ease-in]">
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Pick a GIF</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <input
          type="text"
          placeholder="Search GIFs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <div className="grid grid-cols-3 gap-3">
          {gifs.map((gif, index) => (
            <img
              key={index}
              src={gif}
              alt="GIF option"
              className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => {
                onSelectGif(gif);
                onClose();
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};


export default GifPicker