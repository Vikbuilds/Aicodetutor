import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ code, onChange, onAnalyze, analyzing, theme, onStatsChange }) => {
    const editorRef = useRef(null);
    const [buttonPosition, setButtonPosition] = useState(null);
    const [showButton, setShowButton] = useState(false);

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;

        // Initial stats
        updateStats(editor);

        editor.onDidChangeCursorSelection((e) => {
            const selection = e.selection;

            // Update stats on cursor move
            updateStats(editor);

            if (!selection.isEmpty()) {
                const endPosition = selection.getEndPosition();
                const scrolledVisiblePosition = editor.getScrolledVisiblePosition(endPosition);

                if (scrolledVisiblePosition) {
                    setButtonPosition({
                        top: scrolledVisiblePosition.top + 10,
                        left: scrolledVisiblePosition.left
                    });
                    setShowButton(true);
                }
            } else {
                setShowButton(false);
            }
        });

        editor.onDidScrollChange(() => setShowButton(false));

        editor.onDidChangeModelContent(() => {
            setShowButton(false);
            updateStats(editor);
        });
    };

    const updateStats = (editor) => {
        if (onStatsChange) {
            const position = editor.getPosition();
            const model = editor.getModel();
            if (position && model) {
                onStatsChange({
                    line: position.lineNumber,
                    col: position.column,
                    totalLines: model.getLineCount()
                });
            }
        }
    };

    const handleButtonClick = () => {
        if (editorRef.current) {
            const selection = editorRef.current.getSelection();
            const selectedText = editorRef.current.getModel().getValueInRange(selection);

            if (selectedText && selectedText.trim().length > 0) {
                onAnalyze(selectedText);
            } else {
                onAnalyze(code);
            }
        }
    };

    return (
        <div className="h-full relative group bg-transparent">
            <Editor
                height="100%"
                defaultLanguage="python"
                value={code}
                onChange={onChange}
                // Conditionally set theme based on prop
                theme={theme === 'dark' ? 'vs-dark' : 'light'}
                onMount={handleEditorDidMount}
                options={{
                    minimap: { enabled: false },
                    fontSize: 15,
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    lineHeight: 28,
                    padding: { top: 24, bottom: 24 },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    renderLineHighlight: "lineBorder",
                    cursorBlinking: "expand",
                    smoothScrolling: true,
                    cursorSmoothCaretAnimation: "on",
                    roundedSelection: true,
                }}
            />

            {/* Floating Action Button - Tech Style */}
            {showButton && buttonPosition && (
                <button
                    style={{
                        top: buttonPosition.top,
                        left: buttonPosition.left
                    }}
                    onClick={handleButtonClick}
                    className="absolute z-50 flex items-center space-x-2 bg-[#0d1117] text-blue-400 px-3 py-1.5 rounded border border-blue-500/30 shadow-xl transform transition-all hover:scale-105 hover:bg-[#161b22] hover:border-blue-400 animate-in fade-in zoom-in duration-200 backdrop-blur-sm"
                >
                    <span className="text-xs font-mono font-medium tracking-tight">AI Explain</span>
                </button>
            )}
        </div>
    );
};

export default CodeEditor;
