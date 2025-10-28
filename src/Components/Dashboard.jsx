import React, { useState, useEffect } from 'react';
import { Plus, X, Image, Send } from 'lucide-react';
import StickyNote from './StickyNote';
import CreateNoteModal from './CreateNoteModal';


export function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load notes from storage
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const result = await window.storage.get('sticky-notes');
        if (result) {
          setNotes(JSON.parse(result.value));
        }
      } catch (error) {
        console.log('No existing notes found');
      }
    };
    loadNotes();
  }, []);

  // Save notes to storage
  const saveNotes = async (updatedNotes) => {
    try {
      await window.storage.set('sticky-notes', JSON.stringify(updatedNotes));
    } catch (error) {
      console.error('Failed to save notes:', error);
    }
  };

  const addNote = (noteData) => {
    const newNote = {
      id: Date.now(),
      text: noteData.text,
      color: noteData.color,
      gif: noteData.gif,
      position: {
        x: Math.random() * 70 + 5,
        y: Math.random() * 60 + 5
      },
      rotation: Math.random() * 6 - 3,
      timestamp: Date.now()
    };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  const updateNotePosition = (id, newPosition) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, position: newPosition } : note
    );
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  const clearAll = () => {
    if (window.confirm('Are you sure you want to clear all sticky notes?')) {
      setNotes([]);
      saveNotes([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap');
        .font-handwriting { font-family: 'Caveat', cursive; }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Sticky Notes Wall
            </h1>
            <p className="text-gray-600 text-sm mt-1">Share your thoughts, congratulations & creativity!</p>
          </div>
          <div className="flex gap-3">
            {notes.length > 0 && (
              <button
                onClick={clearAll}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
              >
                Clear All
              </button>
            )}
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl font-semibold"
            >
              <Plus size={20} />
              New Note
            </button>
          </div>
        </div>
      </header>

      {/* Wall */}
      <main className="relative min-h-[calc(100vh-80px)] p-8">
        {notes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-2xl font-bold text-gray-600 mb-2">No sticky notes yet!</h2>
              <p className="text-gray-500">Click "New Note" to add your first sticky note</p>
            </div>
          </div>
        )}

        {notes.map(note => (
          <StickyNote 
            key={note.id} 
            note={note} 
            onDelete={deleteNote}
            onUpdatePosition={updateNotePosition}
          />
        ))}
      </main>

      {/* Modal */}
      <CreateNoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addNote}
      />

      {/* Floating Action Button (Mobile) */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="md:hidden fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center z-30"
      >
        <Plus size={28} />
      </button>
    </div>
  );
}