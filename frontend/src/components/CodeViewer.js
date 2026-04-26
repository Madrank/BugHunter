import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function CodeViewer({ code, language }) {
  return (
    <div className="rounded-lg overflow-hidden">
      <SyntaxHighlighter
        language={language.toLowerCase()}
        style={vs2015}
        showLineNumbers
        customStyle={{ margin: 0, padding: '1rem' }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

export default CodeViewer;