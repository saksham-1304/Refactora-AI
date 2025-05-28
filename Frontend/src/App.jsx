import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"

import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'


function App() {
  const [content, setContent] = useState(`function sum() {\n  return 1 + 1\n}`);
  const [review, setReview] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Add useEffect to ensure Prism is properly initialized with the active language
  useEffect(() => {
    prism.highlightAll();
  }, [content]);

  const updateContent = (newContent) => {
    setContent(newContent);
  };

  async function reviewCode() {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/ai/get-review', {
        code: content
      });
      setReview(response.data);
    } catch (error) {
      console.error('Error getting review:', error);
      setReview('Error fetching review. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <main className="h-dvh w-full p-6 flex gap-4">
        <div className="h-full flex-1 rounded-lg bg-black relative flex flex-col">
          <div className='overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700'>
            <div className="flex-1 relative">
              <Editor
                value={content}
                onValueChange={updateContent}
                highlight={code => {
                  const grammar = prism.languages.javascript;
                  return prism.highlight(code, grammar, 'javascript');
                }}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 16,
                  borderRadius: "0 0 0.7rem 0.7rem",
                  height: "100%",
                  width: "100%",
                  backgroundColor: "#0c0c0c",
                  caretColor: "white",
                  color: "white",
                  overflow: "auto",
                  overflowWrap: "break-word",
                  whiteSpace: "pre-wrap"
                }}
              />
            </div>
          </div>

          <div
            onClick={!isLoading ? reviewCode : undefined}
            className={`absolute bottom-4 right-4 py-2 px-8 font-medium rounded-lg flex items-center justify-center ${isLoading
              ? 'bg-violet-100/50 text-black/60 cursor-not-allowed'
              : 'bg-violet-100 text-black cursor-pointer hover:bg-violet-200'
              }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Reviewing...
              </>
            ) : "Review"}
          </div>
        </div>

        <div className="h-full flex-1 rounded-lg bg-[#343434] p-4 px-8 text-1xl overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700 text-gray-100">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-4">
                <svg className="animate-spin h-8 w-8 text-violet-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-violet-100">Getting AI review...</span>
              </div>
            </div>
          ) : (
            <div className="prose prose-invert prose-sm max-w-none">
              <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default App
