import  { useState } from 'react';
import { X, Image, Send } from 'lucide-react';
import GifPicker from './GifPicker';
import ColorPicker from './ColorPicker';

const CreateNoteModal = ({ isOpen, onClose, onSubmit }) => {
  const [text, setText] = useState('');
  const [selectedColor, setSelectedColor] = useState('yellow');
  const [selectedGif, setSelectedGif] = useState(null);
  const [showGifPicker, setShowGifPicker] = useState(false);

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit({ text, color: selectedColor, gif: selectedGif });
      setText('');
      setSelectedGif(null);
      setSelectedColor('yellow');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 animate-[fadeIn_0.3s_ease-in]">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Create Sticky Note</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {selectedGif && (
            <div className="mb-4 relative">
              <img src={selectedGif} alt="Selected GIF" className="w-full h-32 object-cover rounded-lg" />
              <button
                onClick={() => setSelectedGif(null)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X size={16} />
              </button>
            </div>
          )}

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your message here..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-handwriting text-lg"
            rows="5"
          />

          <ColorPicker selectedColor={selectedColor} onColorChange={setSelectedColor} />

          <div className="flex gap-3">
            <button
              onClick={() => setShowGifPicker(true)}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2 font-semibold"
            >
              <Image size={20} />
              Add GIF
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-3 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all flex items-center justify-center gap-2 font-semibold"
            >
              <Send size={20} />
              Post
            </button>
          </div>
        </div>
      </div>

      {showGifPicker && (
        <GifPicker
          onSelectGif={setSelectedGif}
          onClose={() => setShowGifPicker(false)}
        />
      )}
    </>
  );
};

export default CreateNoteModal