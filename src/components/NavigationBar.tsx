import React from 'react';

interface NavigationBarProps {
  onCommand: (cmd: string) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ onCommand }) => {
  const commands = [
    { name: 'about', label: 'À propos' },
    { name: 'projects', label: 'Projets' },
    { name: 'skills', label: 'Compétences' },
    { name: 'contact', label: 'Contact' }
  ];

  return (
    <div className="flex items-center justify-between p-2 bg-gray-900 border-b border-gray-700">
      <div className="flex space-x-4">
        {commands.map((cmd) => (
          <button
            key={cmd.name}
            onClick={() => onCommand(cmd.name)}
            className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-300"
          >
            {cmd.label}
          </button>
        ))}
      </div>
      <button
        onClick={() => onCommand('help')}
        className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-300"
      >
        ❔ Aide
      </button>
    </div>
  );
};

export default NavigationBar; 