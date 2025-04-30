
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface TerminalInputProps {
  onCommand: (command: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const TerminalInput: React.FC<TerminalInputProps> = ({ 
  onCommand, 
  placeholder = "", 
  disabled = false 
}) => {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.trim()) {
      onCommand(input.trim().toLowerCase());
      setInput("");
    }
  };
  
  // Focus the input when clicked anywhere in the terminal
  const handleContainerClick = () => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  return (
    <div 
      className="mt-4 flex items-center" 
      onClick={handleContainerClick}
    >
      <span className="mr-2">{t('terminal.prompt')}</span>
      <form onSubmit={handleSubmit} className="flex-1">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="bg-transparent border-none outline-none w-full caret-current animate-cursor-blink"
          autoComplete="off"
          spellCheck="false"
        />
      </form>
      <span className="cursor animate-text-blink ml-1">█</span>
    </div>
  );
};

export default TerminalInput;
