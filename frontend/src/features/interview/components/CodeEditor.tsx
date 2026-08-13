import React, { useState } from 'react';

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  onChange?: (code: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ initialCode = '', language = 'javascript', onChange }) => {
  const [code, setCode] = useState(initialCode);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    if (onChange) {
      onChange(newCode);
    }
  };

  return (
    <div className="w-full flex flex-col rounded-xl overflow-hidden border border-gray-800 bg-[#1e1e1e]">
      <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between border-b border-gray-800">
        <span className="text-gray-300 text-xs font-mono">{language}</span>
      </div>
      <textarea
        value={code}
        onChange={handleChange}
        className="w-full h-96 p-4 bg-[#1e1e1e] text-gray-100 font-mono text-sm resize-none focus:outline-none"
        spellCheck="false"
      />
    </div>
  );
};
