import React from 'react';

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
  colors?: string[]; // Preset colors
}

const PRESET_COLORS = [
  '#2c3e50', // Navy
  '#2563eb', // Blue
  '#dc2626', // Red
  '#059669', // Green
  '#7c3aed', // Purple
  '#d97706', // Orange
  '#000000', // Black
];

const ColorPicker: React.FC<ColorPickerProps> = ({ label, color, onChange, colors = PRESET_COLORS }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <div className="flex flex-wrap gap-2">
        {colors.map((c) => (
          <button
            key={c}
            onClick={() => onChange(c)}
            className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
              color === c ? 'border-gray-900 scale-110 shadow-sm' : 'border-transparent'
            }`}
            style={{ backgroundColor: c }}
            aria-label={`Select color ${c}`}
            type="button"
          />
        ))}
        {/* Custom Input */}
        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-300">
           <input 
              type="color" 
              value={color} 
              onChange={(e) => onChange(e.target.value)}
              className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] cursor-pointer p-0 border-0"
           />
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
