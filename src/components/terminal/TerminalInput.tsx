import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface TerminalInputProps {
  onCommand: (cmd: string) => void;
  placeholder: string;
}

const AVAILABLE_COMMANDS = [
  'about',
  'achievements',
  'projects',
  'skills',
  'contact',
  'blog',
  'chat',
  'behind-the-code',
  'recruiter-mode',

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
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
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
        cmd.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(matches);
      setSelectedSuggestionIndex(0);
    } else {
      setSuggestions([]);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      onCommand(input.trim());
      setCommandHistory(prev => [...prev, input.trim()]);
      setInput('');
      setHistoryIndex(-1);
      setSuggestions([]);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (suggestions.length > 0) {
        // Navigation dans les suggestions
        const newIndex = selectedSuggestionIndex > 0 ? selectedSuggestionIndex - 1 : suggestions.length - 1;
        setSelectedSuggestionIndex(newIndex);
        setInput(suggestions[newIndex]);
      } else if (commandHistory.length > 0) {
        // Navigation dans l'historique
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (suggestions.length > 0) {
        // Navigation dans les suggestions
        const newIndex = selectedSuggestionIndex < suggestions.length - 1 ? selectedSuggestionIndex + 1 : 0;
        setSelectedSuggestionIndex(newIndex);
        setInput(suggestions[newIndex]);
      } else if (historyIndex > 0) {
        // Navigation dans l'historique
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab' && suggestions.length > 0) {
      e.preventDefault();
      setInput(suggestions[selectedSuggestionIndex]);
      setSuggestions([]);
    } else if (e.key === 'Escape') {
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
        <div className="absolute left-0 mt-1 bg-gray-800 border border-gray-700 rounded shadow-lg z-50">
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion}
              className={`px-2 py-1 cursor-pointer text-gray-300 ${
                index === selectedSuggestionIndex ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
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
