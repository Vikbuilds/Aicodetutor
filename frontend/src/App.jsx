import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Code2, X, Play, Loader2, Plus, FileCode, Moon, Sun, History, Clock, Trash2, ChevronRight, FolderOpen, Share2, Sparkles } from 'lucide-react';
import axios from 'axios';
import { Menu } from 'lucide-react';

// Lazy load heavy components
const CodeEditor = lazy(() => import('./components/CodeEditor'));
const ExplanationPanel = lazy(() => import('./components/ExplanationPanel'));

// Premium Loading Fallback
const LoadingFallback = ({ message = "Loading component..." }) => (
  <div className="h-full w-full flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-500">
    <div className="relative">
      <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
      <Sparkles className="w-4 h-4 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
    </div>
    <span className="text-sm font-medium text-gray-400 tracking-wide animate-pulse">{message}</span>
  </div>
);

function App() {
  const [files, setFiles] = useState([]);
  const [activeFileId, setActiveFileId] = useState(null);

  // Theme State
  const [theme, setTheme] = useState('dark');

  // Chat State
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // History State
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Renaming State
  const [editingFileId, setEditingFileId] = useState(null);
  const [tempName, setTempName] = useState("");

  // Editor Stats
  const [editorStats, setEditorStats] = useState({ line: 1, col: 1, totalLines: 0 });

  // File Input Ref
  const fileInputRef = useRef(null);

  const activeFile = files.find(f => f.id === activeFileId);

  const getLanguageFromFileName = (fileName) => {
    if (!fileName) return 'python';
    const ext = fileName.split('.').pop().toLowerCase();
    const map = {
      'py': 'python',
      'js': 'javascript',
      'jsx': 'javascript',
      'ts': 'typescript',
      'tsx': 'typescript',
      'html': 'html',
      'css': 'css',
      'cpp': 'cpp',
      'c': 'cpp',
      'java': 'java',
      'json': 'json',
      'md': 'markdown'
    };
    return map[ext] || 'python';
  };

  const detectedLanguage = activeFile ? getLanguageFromFileName(activeFile.name) : 'python';

  // Load history from local storage on mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('ai_tutor_history');
      if (savedHistory) {
        const parsed = JSON.parse(savedHistory);
        if (Array.isArray(parsed)) {
          setHistory(parsed);
        }
      }
    } catch (err) {
      console.error("Failed to load history:", err);
      localStorage.removeItem('ai_tutor_history'); // Clear corrupted data
    }
  }, []);

  // Save history to local storage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('ai_tutor_history', JSON.stringify(history));
    } catch (err) {
      console.error("Failed to save history:", err);
    }
  }, [history]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl + Enter: Analyze Code
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleAnalyze();
      }
      // Ctrl + S: Save (Mock)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        console.log("File saved locally.");
        // We could implement real local storage save or file download here
      }
      // Ctrl + B: Toggle Sidebar (History)
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        setShowHistory(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeFile, files, history]); // Re-bind if context changes


  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const createNewFile = () => {
    const newId = Date.now();
    const newFile = {
      id: newId,
      name: `Untitled-${files.length + 1}.py`,
      content: '# Write or paste your code here...\n# Then select the lines you want to learn about and click "AI Explain"'
    };
    setFiles([...files, newFile]);
    setActiveFileId(newId);
    setChatMessages([]);
    setShowExplanation(false);
  };

  const handleOpenFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      const newId = Date.now();
      const newFile = {
        id: newId,
        name: file.name,
        content: content
      };
      setFiles(prev => [...prev, newFile]);
      setActiveFileId(newId);
      setChatMessages([]);
      setShowExplanation(false);
    };
    reader.readAsText(file);
    e.target.value = null; // Reset input
  };

  const closeFile = (e, id) => {
    e.stopPropagation();
    const newFiles = files.filter(f => f.id !== id);
    setFiles(newFiles);
    if (activeFileId === id) {
      setActiveFileId(newFiles.length > 0 ? newFiles[newFiles.length - 1].id : null);
    }
  };

  const updateFileContent = (newContent) => {
    setFiles(files.map(f => f.id === activeFileId ? { ...f, content: newContent } : f));
  };

  const startRenaming = (e, file) => {
    e.stopPropagation();
    setEditingFileId(file.id);
    setTempName(file.name);
  };

  const saveFileName = () => {
    if (editingFileId) {
      setFiles(files.map(f => f.id === editingFileId ? { ...f, name: tempName } : f));
      setEditingFileId(null);
    }
  };

  const handleRenameKeyDown = (e) => {
    if (e.key === 'Enter') {
      saveFileName();
    } else if (e.key === 'Escape') {
      setEditingFileId(null);
    }
  };

  const addToHistory = (code, result) => {
    const newItem = {
      id: Date.now(),
      code: code,
      analysis: result,
      timestamp: new Date().toLocaleString(),
      preview: code.substring(0, 50).replace(/\n/g, ' ') + (code.length > 50 ? '...' : '')
    };
    setHistory(prev => [newItem, ...prev]);
  };

  const restoreHistoryItem = (item) => {
    const newId = Date.now();
    const newFile = {
      id: newId,
      name: `Restored-${new Date(item.id).toLocaleTimeString().replace(/:/g, '')}.py`,
      content: item.code
    };
    setFiles(prev => [...prev, newFile]);
    setActiveFileId(newId);

    setChatMessages([{ role: 'assistant', content: item.analysis }]);
    setShowExplanation(true);
    setShowHistory(false);
  };

  const clearHistory = () => {
    if (confirm('Are you sure you want to clear all history?')) {
      setHistory([]);
    }
  };

  const deleteHistoryItem = (e, itemId) => {
    e.stopPropagation();
    setHistory(history.filter(item => item.id !== itemId));
  };

  const handleStatsChange = (stats) => {
    setEditorStats(stats);
  };

  // INITIAL ANALYSIS (Triggered by button/selection)
  const handleAnalyze = async (codeToAnalyze) => {
    if (!activeFile && !codeToAnalyze) return;

    setLoading(true);
    setError(null);
    setShowExplanation(true);
    setChatMessages([]); // Reset chat for new analysis

    const payloadCode = codeToAnalyze || activeFile?.content || "";

    if (!payloadCode.trim()) {
      setError("Please enter some code to analyze.");
      setLoading(false);
      return;
    }

    const initialMessage = { role: "user", content: `Analyze this code:\n${payloadCode}` };
    const messagesPayload = [initialMessage];

    try {
      const response = await axios.post('/api/analyze', {
        code: payloadCode,
        messages: messagesPayload
      });
      const result = response.data.analysis;

      setChatMessages([
        { role: 'assistant', content: result }
      ]);

      addToHistory(payloadCode, result);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to analyze code. Ensure backend is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // FOLLOW-UP CHAT (Triggered by input in panel)
  const handleSendMessage = async (userText) => {
    if (!userText.trim()) return;

    const newMessages = [
      ...chatMessages,
      { role: 'user', content: userText }
    ];
    setChatMessages(newMessages);
    setLoading(true);

    try {
      const payloadMessages = newMessages.map(m => ({ role: m.role, content: m.content }));

      const codeContext = activeFile?.content || "";
      const apiMessages = [
        { role: 'user', content: `Context Code:\n${codeContext}\n\n(The user is asking questions about this code)` },
        ...payloadMessages
      ];

      const response = await axios.post('/api/analyze', {
        messages: apiMessages
      });

      const aiReply = response.data.analysis;

      setChatMessages(prev => [
        ...prev,
        { role: 'assistant', content: aiReply }
      ]);

    } catch (err) {
      setError("Failed to get response.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (!activeFile) return;
    const shareContent = `### AI Code Tutor Insights\n\n**File:** ${activeFile.name}\n**Language:** ${detectedLanguage}\n\n#### Code:\n\`\`\`${detectedLanguage}\n${activeFile.content}\n\`\`\`\n\n#### AI Analysis:\n${chatMessages.length > 0 ? chatMessages[chatMessages.length - 1].content : 'No analysis yet.'}`;

    navigator.clipboard.writeText(shareContent).then(() => {
      alert("AI Insights copied to clipboard! Share it anywhere.");
    });
  };

  // Dynamic Styles
  const isDark = theme === 'dark';
  const bgMain = isDark ? 'bg-[#0d1117]' : 'bg-[#e3e5e8]';
  const bgWindow = isDark ? 'bg-[#161b22]' : 'bg-[#ffffff]';
  const borderColor = isDark ? 'border-[#30363d]' : 'border-[#d0d7de]';
  const textColor = isDark ? 'text-gray-200' : 'text-gray-900';
  const textMuted = isDark ? 'text-gray-500' : 'text-gray-500';
  const headerBg = isDark ? 'bg-[#161b22]' : 'bg-[#f6f8fa]';
  const tabActiveBg = isDark ? 'bg-[#1e1e1e]' : 'bg-[#ffffff]';
  const tabHoverBg = isDark ? 'hover:bg-[#161b22]' : 'hover:bg-[#f3f4f6]';

  return (
    <div className={`h-screen w-screen ${bgMain} flex items-center justify-center md:p-4 font-sans ${textColor} overflow-hidden transition-colors duration-300 relative`}>

      <div className={`w-full h-full md:max-w-[1600px] ${bgWindow} md:rounded-xl shadow-2xl border ${borderColor} flex flex-col overflow-hidden relative ring-1 ring-black/5 transition-colors duration-300`}>

        {/* Title Bar */}
        <header className={`h-10 ${headerBg} flex items-center justify-between px-4 border-b ${borderColor} shrink-0 select-none transition-colors duration-300`}>
          <div className="flex items-center space-x-2 w-20">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setShowHistory(true)}
              className="md:hidden p-1.5 hover:bg-black/5 rounded-md transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden md:flex items-center space-x-2">
              <div onClick={() => setActiveFileId(null)} className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 transition-colors shadow-sm cursor-pointer" title="Close Editor"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 transition-colors shadow-sm cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 transition-colors shadow-sm cursor-pointer"></div>
            </div>
          </div>
          <div className="flex items-center space-x-2 opacity-80">
            <Code2 className="w-4 h-4 text-blue-500" />
            <span className={`text-xs font-medium tracking-wide ${textColor}`}>AI Code Tutor</span>
          </div>

          <div className="flex items-center space-x-3 w-40 justify-end">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-1.5 rounded-md transition-colors ${isDark ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-black/5 text-gray-500 hover:text-black'}`}
              title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* History Toggle */}
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`p-1.5 rounded-md transition-colors ${showHistory ? 'text-blue-500 bg-blue-500/10' : (isDark ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-black/5 text-gray-500 hover:text-black')}`}
              title="View History"
            >
              <History className="w-4 h-4" />
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              disabled={!activeFile}
              className={`p-1.5 rounded-md transition-colors ${!activeFile ? 'opacity-30 cursor-not-allowed' : (isDark ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-black/5 text-gray-500 hover:text-black')}`}
              title="Share Insights"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {activeFile && (
              <button
                onClick={() => handleAnalyze()}
                disabled={loading}
                className={`
                            flex items-center space-x-1.5 px-3 py-1 rounded-md text-[10px] font-semibold transition-all shadow-md
                            ${loading ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500 text-white'}
                        `}
              >
                {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3 fill-current" />}
                <span>{loading ? '...' : 'RUN'}</span>
              </button>
            )}
          </div>
        </header>

        {/* Tab Bar */}
        <div className={`h-9 ${bgMain} border-b ${borderColor} flex items-center px-1 text-xs select-none overflow-x-auto scrollbar-hide`}>
          {files.map(file => (
            <div
              key={file.id}
              onClick={() => setActiveFileId(file.id)}
              className={`
                        h-full flex items-center space-x-2 px-3 border-r ${borderColor} cursor-pointer transition-colors min-w-[120px] justify-between group shrink-0
                        ${activeFileId === file.id
                  ? `${tabActiveBg} text-blue-500 font-medium border-t-2 border-t-blue-500`
                  : `${textMuted} ${tabHoverBg} border-t-2 border-t-transparent`}
                    `}
              onDoubleClick={(e) => startRenaming(e, file)}
              title="Double-click to rename"
            >
              <div className="flex items-center space-x-2 truncate">
                <FileCode className="w-3.5 h-3.5" />

                {/* Rename Input */}
                {editingFileId === file.id ? (
                  <input
                    autoFocus
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    onBlur={saveFileName}
                    onKeyDown={handleRenameKeyDown}
                    onClick={(e) => e.stopPropagation()}
                    className={`bg-transparent outline-none border-b border-blue-500 w-24 ${textColor}`}
                  />
                ) : (
                  <span>{file.name}</span>
                )}
              </div>
              <button
                onClick={(e) => closeFile(e, file.id)}
                className={`opacity-0 group-hover:opacity-100 rounded p-0.5 transition-opacity ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}

          {/* Open File Button */}
          <button
            onClick={handleOpenFile}
            className={`h-full px-3 flex items-center ${textMuted} ${tabHoverBg} transition-colors border-r ${borderColor} shrink-0`}
            title="Open Local File"
          >
            <FolderOpen className="w-4 h-4" />
          </button>
          <button
            onClick={createNewFile}
            className={`h-full px-3 flex items-center ${textMuted} ${tabHoverBg} transition-colors border-r ${borderColor} shrink-0`}
            title="Create New File"
          >
            <Plus className="w-4 h-4" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>

        {/* Main Content + Sidebar Container */}
        <div className="flex-1 flex overflow-hidden relative">

          {/* Mobile Overlay Backdrop */}
          {(showHistory || (showExplanation && activeFile)) && (
            <div
              className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30 transition-opacity duration-300"
              onClick={() => { setShowHistory(false); setShowExplanation(false); }}
            />
          )}

          {/* Main Content Area */}
          <main className={`flex-1 flex overflow-hidden relative ${bgMain}`}>

            {/* Editor Container */}
            <div className="flex-1 relative min-w-0">
              {activeFile ? (
                <Suspense fallback={<LoadingFallback message="Initializing Editor..." />}>
                  <CodeEditor
                    code={activeFile.content}
                    onChange={updateFileContent}
                    onAnalyze={handleAnalyze}
                    analyzing={loading}
                    theme={theme}
                    onStatsChange={handleStatsChange}
                    language={detectedLanguage}
                  />
                </Suspense>
              ) : (
                <div className={`h-full flex flex-col items-center justify-center overflow-y-auto`}>
                  <div className="w-full max-w-2xl px-6 py-8">
                    {/* Header */}
                    <div className="flex items-center space-x-4 mb-8">
                      <Code2 className="w-12 h-12 text-blue-600" />
                      <div>
                        <h1 className={`text-2xl font-medium ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                          AI Code Tutor
                        </h1>
                        <p className={textMuted}>Learning evolved.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      {/* Start Section */}
                      <div className="space-y-4">
                        <h2 className={`text-xs font-semibold uppercase tracking-wider ${textMuted}`}>Start</h2>
                        <button
                          onClick={createNewFile}
                          className={`group flex items-center space-x-3 w-full text-left p-2 -ml-2 rounded-md transition-colors ${isDark ? 'hover:bg-blue-500/10' : 'hover:bg-blue-50'}`}
                        >
                          <FileCode className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                          <div className="flex flex-col">
                            <span className={`${isDark ? 'text-blue-400' : 'text-blue-600'} group-hover:underline`}>New File</span>
                          </div>
                        </button>
                        <button
                          onClick={handleOpenFile}
                          className={`group flex items-center space-x-3 w-full text-left p-2 -ml-2 rounded-md transition-colors ${isDark ? 'hover:bg-blue-500/10' : 'hover:bg-blue-50'}`}
                        >
                          <FolderOpen className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                          <div className="flex flex-col">
                            <span className={`${isDark ? 'text-blue-400' : 'text-blue-600'} group-hover:underline`}>Open File...</span>
                          </div>
                        </button>
                      </div>

                      {/* Recent Section */}
                      <div className="space-y-4">
                        <h2 className={`text-xs font-semibold uppercase tracking-wider ${textMuted}`}>Recent</h2>
                        {history.slice(0, 5).map(item => (
                          <button
                            key={item.id}
                            onClick={() => restoreHistoryItem(item)}
                            className={`group flex items-center justify-between w-full text-left p-2 -ml-2 rounded-md transition-colors ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                          >
                            <div className="flex flex-col overflow-hidden">
                              <span className={`truncate text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'} group-hover:underline`}>
                                {item.preview || 'Untitled Snippet'}
                              </span>
                              <span className={`text-[10px] ${textMuted}`}>{item.timestamp}</span>
                            </div>
                            <div
                              onClick={(e) => deleteHistoryItem(e, item.id)}
                              className={`p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-all ${isDark ? 'hover:bg-red-900/30 text-gray-500 hover:text-red-400' : 'hover:bg-red-50 text-gray-400 hover:text-red-500'}`}
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </div>
                          </button>
                        ))}
                        {history.length === 0 && (
                          <p className={`text-sm ${textMuted} italic`}>No recent history.</p>
                        )}
                      </div>
                    </div>

                    {/* Footer Tips/Links */}
                    <div className={`mt-12 border-t ${borderColor} pt-6 opacity-60`}>
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div className="space-y-2">
                          <h3 className="font-semibold">Help</h3>
                          <p className="flex items-center space-x-2">
                            <span className={`px-1.5 rounded text-[10px] ${isDark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`}>Ctrl</span>
                            <span>+</span>
                            <span className={`px-1.5 rounded text-[10px] ${isDark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`}>Space</span>
                            <span>to trigger suggestions</span>
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-semibold">Customize</h3>
                          <div className="flex gap-4">
                            <button onClick={toggleTheme} className="hover:text-blue-500 text-left transition-colors">Change Color Theme</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* AI Assistant Panel (Collapsible Sidebar) */}
            <div className={`
              ${showExplanation && activeFile ? 'w-[450px] border-l max-md:w-[90%] max-md:translate-x-0' : 'w-0 max-md:-translate-x-full'} 
              ${borderColor} transition-all duration-300 ease-in-out flex flex-col overflow-hidden bg-opacity-95 backdrop-blur-sm
              max-md:fixed max-md:right-0 max-md:top-0 max-md:h-screen max-md:z-50 ${isDark ? 'max-md:bg-[#0d1117]' : 'max-md:bg-white'}
            `}>
              <div className={`h-12 flex items-center justify-between px-5 border-b shrink-0 ${isDark ? 'border-white/5 bg-white/5' : 'border-black/5 bg-black/5'}`}>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-semibold ${textColor}`}>AI Assistant</span>
                </div>
                <button
                  onClick={() => setShowExplanation(false)}
                  className={`p-1.5 rounded-lg transition-colors group ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
                >
                  <X className={`w-4 h-4 ${isDark ? 'text-gray-400 group-hover:text-white' : 'text-gray-500 group-hover:text-black'}`} />
                </button>
              </div>
              <div className="flex-1 overflow-hidden relative min-w-[450px]">
                <Suspense fallback={<LoadingFallback message="Loading AI Assistant..." />}>
                  <ExplanationPanel
                    messages={chatMessages}
                    onSendMessage={handleSendMessage}
                    loading={loading}
                    error={error}
                    theme={theme}
                  />
                </Suspense>
              </div>
            </div>

            {/* History Sidebar (Collapsible) */}
            <div className={`
                ${showHistory ? 'w-80 border-l max-md:w-[80%] max-md:translate-x-0' : 'w-0 max-md:-translate-x-full'} 
                ${isDark ? 'bg-[#161b22]' : 'bg-white'} 
                ${borderColor} transition-all duration-300 ease-in-out flex flex-col overflow-hidden z-40
                max-md:fixed max-md:left-0 max-md:top-0 max-md:h-screen max-md:z-50
            `}>
              <div className={`h-10 flex items-center justify-between px-4 border-b shrink-0 ${borderColor}`}>
                <span className={`text-sm font-semibold ${textColor}`}>Running History</span>
                <div className="flex items-center space-x-1">
                  {history.length > 0 && (
                    <button onClick={clearHistory} className="p-1.5 hover:text-red-500 transition-colors text-gray-500" title="Clear History">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button onClick={() => setShowHistory(false)} className={`p-1.5 hover:bg-gray-700/20 rounded ${textMuted}`}>
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-2 space-y-2 min-w-[320px]">
                {history.length === 0 ? (
                  <div className={`flex flex-col items-center justify-center h-full ${textMuted} space-y-2 opacity-50`}>
                    <History className="w-8 h-8" />
                    <span className="text-xs">No history yet</span>
                  </div>
                ) : (
                  history.map(item => (
                    <div
                      key={item.id}
                      onClick={() => restoreHistoryItem(item)}
                      className={`
                                      group p-3 rounded-lg cursor-pointer border transition-all
                                      ${isDark
                          ? 'bg-[#0d1117] border-[#30363d] hover:border-blue-500/50 hover:bg-[#1f242c]'
                          : 'bg-gray-50 border-gray-200 hover:border-blue-400 hover:bg-blue-50'}
                                  `}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.timestamp}
                        </span>
                        <button
                          onClick={(e) => deleteHistoryItem(e, item.id)}
                          className={`p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? 'hover:bg-white/10 text-gray-400 hover:text-red-400' : 'hover:bg-black/5 text-gray-400 hover:text-red-500'}`}
                          title="Delete Item"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                      <code className={`block text-xs font-mono truncate mb-2 ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>
                        {item.preview}
                      </code>
                      <div className="flex items-center text-[10px] text-gray-500 group-hover:text-blue-500 transition-colors">
                        <span>Restore & View</span>
                        <ChevronRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </main>

        </div>

        <footer className={`h-7 ${headerBg} border-t ${borderColor} flex items-center justify-between px-4 text-[10px] ${textMuted} select-none transition-colors duration-300`}>
          <div className="flex items-center space-x-3">
            {activeFile ? (
              <span className="flex items-center space-x-1.5 text-blue-500">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span>Editing</span>
              </span>
            ) : (
              <span>No active file</span>
            )}

            {activeFile && (
              <span className="flex items-center space-x-2">
                <span>Ln {editorStats.line}, Col {editorStats.col}</span>
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <span className="hover:opacity-80 transition-opacity cursor-pointer">UTF-8</span>
            <span className="hover:opacity-80 transition-opacity cursor-pointer">Python 3.12</span>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default App;
