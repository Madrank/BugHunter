import React from 'react';

function DiffViewer({ diffText }) {
  const lines = diffText.split('\n');
  
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden font-mono text-sm">
      {lines.map((line, idx) => {
        let bgColor = 'bg-gray-900';
        let textColor = 'text-gray-300';
        let prefix = ' ';
        
        if (line.startsWith('+')) {
          bgColor = 'bg-green-900/30';
          textColor = 'text-green-400';
          prefix = '+';
        } else if (line.startsWith('-')) {
          bgColor = 'bg-red-900/30';
          textColor = 'text-red-400';
          prefix = '-';
        } else if (line.startsWith(' ')) {
          bgColor = 'bg-gray-800/50';
          textColor = 'text-gray-500';
          prefix = ' ';
        }
        
        if (!line.trim() && prefix === ' ') return null;
        
        return (
          <div key={idx} className={`${bgColor} px-2 py-0.5`}>
            <span className="text-gray-600 select-none w-8 inline-block">{prefix}</span>
            <span className={textColor}>{line.substring(1) || ' '}</span>
          </div>
        );
      })}
    </div>
  );
}

export default DiffViewer;