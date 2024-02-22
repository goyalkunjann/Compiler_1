import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import axios from 'axios';
import './App.css';

function App() {
  const [code, setCode] = useState(`
  // Include the input/output stream library
  #include <iostream> 

  // Define the main function
  int main() { 
      // Output "Hello World!" to the console
      std::cout << "Hello World!"; 
      
      // Return 0 to indicate successful execution
      return 0; 
  }`);
  const [output, setOutput] = useState('');

  const handleSubmit = async () => {
    const payload = {
      language: 'cpp',
      code
    };

    try {
      const { data } = await axios.post('http://localhost:8672/run', payload);
      console.log(data);
      setOutput(data.output);
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <div className="container mx-auto py-8 flex flex-col items-center text-gray-300">
      <h1 className="text-3xl font-bold mb-4 text-white">Code Dragon Compiler_1</h1>
      <select className="select-box bg-gray-700 border border-gray-500 text-white rounded-lg py-1.5 px-4 mb-4 focus:outline-none focus:border-blue-500">
        <option value='cpp'>C++</option>
        <option value='c'>C</option>
        <option value='py'>Python</option>
        <option value='java'>Java</option>
      </select>
      <div className="bg-gray-800 shadow-inner w-full max-w-lg mb-4 p-2" style={{ height: '300px', overflowY: 'auto' }}>
        <Editor
          value={code}
          onValueChange={code => setCode(code)}
          highlight={code => highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            backgroundColor: '#1E293B', // Dark blue background
            color: '#ffffff', // White text color for contrast
            height: '100%',
            overflowY: 'auto'
          }}
        />
      </div>

      <button onClick={handleSubmit} className="inline-flex items-center bg-gradient-to-r from-blue-600 to-cyan-500 hover:bg-gradient-to-bl focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
        </svg>
        Run
      </button>

      {output && (
        <div className="outputbox mt-4 bg-gray-800 rounded-md shadow-md p-4 text-white">
          <p>{output}</p>
        </div>
      )}
    </div>
  );
}


export default App;