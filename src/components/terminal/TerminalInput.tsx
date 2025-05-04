import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface TerminalInputProps {
  onCommand: (cmd: string) => void;
  placeholder: string;
}

const AVAILABLE_COMMANDS = [
  'about',
  'projects',
  'skills',
  'contact',
  'blog',
  'install cv',
  'theme',
  'language',
  'help',
  'clear',
  'easter-egg'
];

const TerminalInput: React.FC<TerminalInputProps> = ({ onCommand, placeholder }) => {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Focus sur l'input au chargement
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    
    // Mise à jour des suggestions
    if (value) {
      const matches = AVAILABLE_COMMANDS.filter(cmd => 
        cmd.startsWith(value.toLowerCase())
      );
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setInput(suggestions[0]);
        setSuggestions([]);
      } else if (input.trim()) {
        onCommand(input.trim());
        setInput('');
        setSuggestions([]);
      }
    } else if (e.key === 'Tab' && suggestions.length > 0) {
      e.preventDefault();
      setInput(suggestions[0]);
      setSuggestions([]);
    }
  };
  
  return (
    <div className="relative">
      <div className="flex items-center">
        <span className="text-green-500 mr-2">{t('terminal.prompt')}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="bg-transparent outline-none text-gray-300 flex-1"
          placeholder={placeholder}
        />
      </div>
      
      {suggestions.length > 0 && (
        <div className="absolute left-0 mt-1 bg-gray-800 border border-gray-700 rounded shadow-lg">
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion}
              className="px-2 py-1 hover:bg-gray-700 cursor-pointer text-gray-300"
              onClick={() => {
                setInput(suggestion);
                setSuggestions([]);
              }}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TerminalInput;
