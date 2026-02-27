import React, { useState, useEffect, useRef } from 'react';
import { AlertTriangle, Loader2, Sparkles, Send, User, Bot, Activity, Code2, FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ExplanationPanel = ({ messages, loading, error, onSendMessage, theme }) => {
  const isDark = theme === 'dark';
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !loading) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className={`h-full flex flex-col ${isDark ? 'text-[#e6edf3]' : 'text-gray-900'}`}>

      {/* Messages Area */}
      <div className={`flex-1 overflow-y-auto p-4 font-sans leading-relaxed scrollbar-thin ${isDark ? 'scrollbar-thumb-white/10' : 'scrollbar-thumb-black/10'} scrollbar-track-transparent space-y-6`}>
        {error && (
          <div className="bg-red-500/10 text-red-500 p-4 rounded-xl border border-red-500/20 flex items-start space-x-3 mb-6 backdrop-blur-sm">
            <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold">Execution Error</h3>
              <p className="text-sm opacity-90 mt-1">{error}</p>
            </div>
          </div>
        )}

        {messages.length === 0 && !loading && !error && (
          <div className={`h-full flex flex-col items-center justify-center ${isDark ? 'text-gray-500' : 'text-gray-400'} space-y-5 px-8 text-center opacity-60`}>
            <div className={`w-16 h-16 rounded-2xl ${isDark ? 'bg-white/5 ring-white/10' : 'bg-black/5 ring-black/10'} flex items-center justify-center ring-1 shadow-lg`}>
              <Sparkles className="w-8 h-8 text-purple-400/50" />
            </div>
            <div>
              <p className="text-sm font-medium">AI Tutor Ready</p>
              <p className="text-xs mt-1">Select code to start a conversation.</p>
            </div>
          </div>
        )}

        {messages.map((msg, index) => (
          <div key={index} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`flex items-center space-x-2 mb-1 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-blue-600' : 'bg-purple-600'}`}>
                {msg.role === 'user' ? <User className="w-3.5 h-3.5 text-white" /> : <Bot className="w-3.5 h-3.5 text-white" />}
              </div>
              <span className={`text-[10px] font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {msg.role === 'user' ? 'You' : 'AI Tutor'}
              </span>
            </div>

            <div className={`
                    max-w-[95%] rounded-2xl px-5 py-3 shadow-sm border
                    ${msg.role === 'user'
                ? (isDark ? 'bg-blue-600/10 border-blue-600/20 text-blue-100' : 'bg-blue-50 border-blue-100 text-blue-900')
                : (isDark ? 'bg-[#1e1e1e] border-white/5' : 'bg-white border-gray-200')}
                `}>
              <div className={`prose prose-sm max-w-none ${isDark ? 'prose-invert' : ''}`}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ node, ...props }) => <h1 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`} {...props} />,
                    h2: ({ node, ...props }) => <h2 className={`text-base font-semibold mt-4 mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`} {...props} />,
                    code: ({ node, inline, className, children, ...props }) => {
                      const match = /language-(\w+)/.exec(className || '')
                      return !inline ? (
                        <div className={`relative group my-3 rounded-lg overflow-hidden border ${isDark ? 'border-white/10 bg-[#0d1117]' : 'border-gray-200 bg-gray-50'}`}>
                          <code className={`block p-3 overflow-x-auto font-mono text-xs leading-relaxed ${isDark ? 'text-blue-200' : 'text-blue-700'}`} {...props}>
                            {children}
                          </code>
                        </div>
                      ) : (
                        <code className={`font-mono text-xs px-1 py-0.5 rounded border ${isDark ? 'text-purple-300 bg-purple-500/10 border-purple-500/20' : 'text-purple-700 bg-purple-100 border-purple-200'}`} {...props}>
                          {children}
                        </code>
                      )
                    },
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex flex-col items-start space-y-2">
            <div className={`flex items-center space-x-2`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center bg-purple-600`}>
                <Bot className="w-3.5 h-3.5 text-white" />
              </div>
              <span className={`text-[10px] font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                AI Tutor
              </span>
            </div>
            <div className={`px-4 py-3 rounded-2xl rounded-tl-none border ${isDark ? 'bg-[#1e1e1e] border-white/5' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center space-x-2 text-purple-500">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-xs font-medium">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Action Buttons */}
      <div className={`px-4 py-3 grid grid-cols-2 gap-2 border-t ${isDark ? 'border-white/5 bg-[#161b22]' : 'border-gray-100 bg-gray-50'}`}>
        <button
          onClick={() => onSendMessage("Give me a 'Challenge' related to this code.")}
          disabled={loading || messages.length === 0}
          className={`flex items-center justify-center space-x-2 py-1.5 px-3 rounded-lg border text-[10px] font-medium transition-all
            ${isDark
              ? 'border-purple-500/30 text-purple-300 hover:bg-purple-500/10'
              : 'border-purple-200 text-purple-600 hover:bg-purple-50'}
            ${(loading || messages.length === 0) ? 'opacity-50 cursor-not-allowed grayscale' : ''}
          `}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Challenge</span>
        </button>
        <button
          onClick={() => onSendMessage("Provide a 'Trace' simulation for this code.")}
          disabled={loading || messages.length === 0}
          className={`flex items-center justify-center space-x-2 py-1.5 px-3 rounded-lg border text-[10px] font-medium transition-all
            ${isDark
              ? 'border-blue-500/30 text-blue-300 hover:bg-blue-500/10'
              : 'border-blue-200 text-blue-600 hover:bg-blue-50'}
            ${(loading || messages.length === 0) ? 'opacity-50 cursor-not-allowed grayscale' : ''}
          `}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Trace Logic</span>
        </button>
        <button
          onClick={() => onSendMessage("Please 'Refactor' the code for better performance and readability.")}
          disabled={loading || messages.length === 0}
          className={`flex items-center justify-center space-x-2 py-1.5 px-3 rounded-lg border text-[10px] font-medium transition-all
            ${isDark
              ? 'border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10'
              : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50'}
            ${(loading || messages.length === 0) ? 'opacity-50 cursor-not-allowed grayscale' : ''}
          `}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>Refactor</span>
        </button>
        <button
          onClick={() => onSendMessage("Generate professional 'Documentation' (README/Docstrings) for this code.")}
          disabled={loading || messages.length === 0}
          className={`flex items-center justify-center space-x-2 py-1.5 px-3 rounded-lg border text-[10px] font-medium transition-all
            ${isDark
              ? 'border-amber-500/30 text-amber-300 hover:bg-amber-500/10'
              : 'border-amber-200 text-amber-600 hover:bg-amber-50'}
            ${(loading || messages.length === 0) ? 'opacity-50 cursor-not-allowed grayscale' : ''}
          `}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Gen Docs</span>
        </button>
      </div>

      {/* Input Area */}
      <div className={`p-4 border-t ${isDark ? 'border-white/5 bg-[#161b22]' : 'border-gray-200 bg-gray-50'} shrink-0`}>
        <form
          onSubmit={handleSubmit}
          className={`flex items-center space-x-2 rounded-xl border px-3 py-2 focus-within:ring-2 focus-within:ring-purple-500/50 transition-all shadow-sm ${isDark ? 'bg-[#0d1117] border-[#30363d]' : 'bg-white border-gray-300'}`}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a follow-up question..."
            disabled={loading}
            className={`flex-1 bg-transparent outline-none text-sm ${isDark ? 'text-gray-200 placeholder-gray-600' : 'text-gray-800 placeholder-gray-400'}`}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className={`p-1.5 rounded-lg transition-all ${input.trim() && !loading ? 'bg-purple-600 text-white hover:bg-purple-500 shadow-lg shadow-purple-900/20' : 'text-gray-500 cursor-not-allowed'}`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExplanationPanel;
