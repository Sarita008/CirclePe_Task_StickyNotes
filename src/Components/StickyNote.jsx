import React, { useState, useEffect } from 'react';
import {X} from 'lucide-react';


const StickyNote = ({ note, onDelete, onUpdatePosition }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const noteRef = React.useRef(null);

  const colors = {
    yellow: 'bg-yellow-200 shadow-yellow-300',
    pink: 'bg-pink-200 shadow-pink-300',
    blue: 'bg-blue-200 shadow-blue-300',
    green: 'bg-green-200 shadow-green-300',
    purple: 'bg-purple-200 shadow-purple-300'
  };

  const handleMouseDown = (e) => {
    // Don't start drag if clicking on delete button
    if (e.target.closest('button')) return;
    
    setIsDragging(true);
    const rect = noteRef.current.getBoundingClientRect();
    const parentRect = noteRef.current.parentElement.getBoundingClientRect();
    
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const parentRect = noteRef.current.parentElement.getBoundingClientRect();
    const newX = ((e.clientX - dragOffset.x - parentRect.left) / parentRect.width) * 100;
    const newY = ((e.clientY - dragOffset.y - parentRect.top) / parentRect.height) * 100;
    
    // Keep note within bounds
    const boundedX = Math.max(0, Math.min(95, newX));
    const boundedY = Math.max(0, Math.min(90, newY));
    
    onUpdatePosition(note.id, { x: boundedX, y: boundedY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  return (
    <div
      ref={noteRef}
      onMouseDown={handleMouseDown}
      className={`${colors[note.color]} p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 relative group animate-[fadeIn_0.5s_ease-in] ${
        isDragging ? 'cursor-grabbing shadow-2xl scale-105 z-50' : 'cursor-grab'
      }`}
      style={{
        position: 'absolute',
        left: `${note.position.x}%`,
        top: `${note.position.y}%`,
        width: '250px',
        minHeight: '200px',
        transform: isDragging ? 'rotate(0deg)' : `rotate(${note.rotation}deg)`,
        transition: isDragging ? 'none' : 'transform 0.3s, box-shadow 0.3s',
        zIndex: isDragging ? 1000 : note.id,
        userSelect: 'none'
      }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(note.id);
        }}
        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600 z-10"
      >
        <X size={16} />
      </button>
      
      {note.gif && (
        <div className="mb-3 rounded overflow-hidden pointer-events-none">
          <img src={note.gif} alt="GIF" className="w-full h-32 object-cover" />
        </div>
      )}
      
      <p className="text-gray-800 font-handwriting text-lg break-words whitespace-pre-wrap pointer-events-none">
        {note.text}
      </p>
      
      <div className="absolute bottom-2 right-2 text-xs text-gray-600 font-sans pointer-events-none">
        {new Date(note.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

export default StickyNote