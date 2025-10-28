
const ColorPicker = ({ selectedColor, onColorChange }) => {
  const colors = [
    { name: 'yellow', class: 'bg-yellow-200' },
    { name: 'pink', class: 'bg-pink-200' },
    { name: 'blue', class: 'bg-blue-200' },
    { name: 'green', class: 'bg-green-200' },
    { name: 'purple', class: 'bg-purple-200' }
  ];

  return (
    <div className="flex gap-2 mb-4">
      <span className="text-sm text-gray-600 font-medium mr-2">Color:</span>
      {colors.map(color => (
        <button
          key={color.name}
          onClick={() => onColorChange(color.name)}
          className={`w-8 h-8 rounded-full ${color.class} border-2 transition-all ${
            selectedColor === color.name ? 'border-gray-800 scale-110' : 'border-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

export default ColorPicker