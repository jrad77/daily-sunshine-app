import React, { useState, useEffect } from 'react';

const LifeChecklist = () => {
  const defaultItems = [
    { id: 1, text: 'Eaten healthy meals', emoji: '🥗', completed: false },
    { id: 2, text: 'Drank enough water', emoji: '💧', completed: false },
    { id: 3, text: 'Gone for a walk', emoji: '🚶‍♀️', completed: false },
    { id: 4, text: 'Got sunshine', emoji: '☀️', completed: false },
    { id: 5, text: 'Exercised', emoji: '🧘‍♀️', completed: false },
    { id: 6, text: 'Meditated', emoji: '🧘', completed: false },
    { id: 7, text: 'Stayed sober', emoji: '🌟', completed: false },
  ];

  const [items, setItems] = useState(defaultItems);
  const [storageType, setStorageType] = useState('Checking...');
  const [lastSaved, setLastSaved] = useState(null);

  useEffect(() => {
    checkAndSetStorage();
  }, []);

  useEffect(() => {
    if (storageType === 'localStorage') {
      try {
        localStorage.setItem('checklistItems', JSON.stringify(items));
        setLastSaved(new Date().toLocaleTimeString());
      } catch (error) {
        console.error('Failed to save to localStorage:', error);
        setStorageType('memory');
      }
    }
  }, [items, storageType]);

  const checkAndSetStorage = () => {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      setStorageType('localStorage');
      const savedItems = localStorage.getItem('checklistItems');
      if (savedItems) setItems(JSON.parse(savedItems));
    } catch (error) {
      console.error('localStorage not available:', error);
      setStorageType('memory');
    }
  };

  const toggleItem = (id) => {
    const newItems = items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setItems(newItems);
  };

  const addItem = (text) => {
    const newItem = { id: Date.now(), text, emoji: '✨', completed: false };
    setItems([...items, newItem]);
  };

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div style={{
      fontFamily: '"Nunito", sans-serif',
      maxWidth: '450px',
      margin: '20px auto',
      padding: '30px',
      backgroundColor: '#f0f4f8',
      borderRadius: '15px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      color: '#4a5568'
    }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Nunito:wght@400;700&display=swap');
        `}
      </style>
      <h1 style={{ 
        textAlign: 'center', 
        color: '#2d3748', 
        marginBottom: '10px',
        fontFamily: '"Dancing Script", cursive',
        fontSize: '3rem',
        textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
      }}>My Daily Sunshine</h1>
      <p style={{ textAlign: 'center', color: '#4a5568', marginBottom: '20px' }}>{today}</p>
      <p style={{ textAlign: 'center', color: '#718096', marginBottom: '20px' }}>
        Storage: {storageType}
        {storageType === 'localStorage' && lastSaved && ` (Last saved: ${lastSaved})`}
      </p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map(item => (
          <li key={item.id} style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
            backgroundColor: 'white',
            padding: '12px 15px',
            borderRadius: '10px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
            transition: 'all 0.3s ease'
          }}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleItem(item.id)}
              style={{ 
                marginRight: '15px', 
                transform: 'scale(1.2)',
                cursor: 'pointer'
              }}
            />
            <span style={{ 
              textDecoration: item.completed ? 'line-through' : 'none',
              flexGrow: 1,
              fontSize: '18px',
              fontWeight: item.completed ? '400' : '700',
              transition: 'all 0.3s ease'
            }}>
              {item.emoji} {item.text}
            </span>
          </li>
        ))}
      </ul>
      <NewItemForm onAdd={addItem} />
    </div>
  );
};

const NewItemForm = ({ onAdd }) => {
  const [newItemText, setNewItemText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItemText.trim()) {
      onAdd(newItemText.trim());
      setNewItemText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', marginTop: '25px' }}>
      <input
        type="text"
        value={newItemText}
        onChange={(e) => setNewItemText(e.target.value)}
        placeholder="Add a new sunshine moment..."
        style={{
          flexGrow: 1,
          marginRight: '10px',
          padding: '10px 15px',
          borderRadius: '25px',
          border: '1px solid #cbd5e0',
          fontSize: '16px',
          fontFamily: 'inherit'
        }}
      />
      <button 
        type="submit"
        style={{
          padding: '10px 20px',
          cursor: 'pointer',
          backgroundColor: '#4299e1',
          color: 'white',
          border: 'none',
          borderRadius: '25px',
          fontSize: '16px',
          fontWeight: 'bold',
          transition: 'background-color 0.3s ease'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#3182ce'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#4299e1'}
      >
        Add
      </button>
    </form>
  );
};

export default LifeChecklist;