# AI CODE TUTOR — Project Report

---

## CHAPTER 01: INTRODUCTION

### 1.1 Overview

The rapid evolution of Artificial Intelligence (AI) and modern web technologies has fundamentally changed how people learn and interact with programming languages. With the increasing complexity of software development, beginners and intermediate programmers alike struggle to understand code logic, debug errors, and adopt best practices without expert guidance. This project, titled **"AI Code Tutor — An Intelligent Code Analysis and Learning Platform"**, addresses this gap by providing an AI-powered coding assistant that analyzes, explains, and interacts with users about their code in real time.

The project is centered around the development of a full-stack web application featuring two major capabilities: **real-time code analysis** powered by AI, and an **interactive follow-up chat** system where users can ask questions about their code and receive educational, context-aware responses. The AI backbone is powered by **Groq's LLaMA 3.3 70B Versatile** model, accessed through the Groq Cloud API, delivering ultra-fast inference speeds for a seamless user experience.

The frontend is built using **React 19** with **Vite** as the build tool, featuring a professional **VS Code-inspired interface** complete with a Monaco code editor, tabbed file management, dark/light theme support, and a floating AI assistant panel. The backend is developed using **Python Flask**, serving as a lightweight API gateway that communicates with the Groq AI service.

A key design principle of the project is **simplicity and accessibility**. Unlike traditional AI tutoring platforms that require complex setups, GPU infrastructure, or paid subscriptions, this application runs locally with minimal configuration — requiring only a free Groq API key. The application emphasizes a clean, distraction-free coding environment where AI assistance is always one click away.

Through this project, students gain hands-on experience in full-stack web development, REST API design, AI service integration, prompt engineering, state management, and modern UI/UX design — all crucial skills for careers in software engineering and AI development.

---

### 1.2 Objectives

The objectives of the project are focused on building a practical, industry-relevant AI application while enhancing technical and analytical skills. The primary goals include:

- To design and implement an AI-powered code analysis platform that explains code in simple, educational terms.
- To develop an interactive conversational AI system where users can ask follow-up questions about their code.
- To build a professional-grade code editor interface using Monaco Editor with features like syntax highlighting, line numbers, and cursor statistics.
- To implement a clean, VS Code-inspired UI with dark/light theme support, tabbed file management, and floating panels.
- To integrate cloud-based AI services (Groq API with LLaMA 3.3 model) for high-speed, high-quality code analysis.
- To develop a robust history system with local storage persistence, allowing users to review, restore, and manage past analysis sessions.
- To support local file import, enabling users to open and analyze files directly from their computer.
- To gain practical experience with modern web development technologies including React 19, Vite, Tailwind CSS, and Flask.
- To strengthen understanding of REST API design, cross-origin resource sharing (CORS), and client-server architecture.
- To promote self-directed learning by providing an always-available AI coding mentor.

By achieving these objectives, the project delivers a functional, deployable product while building comprehensive skills in AI integration, frontend engineering, and backend development.

---

### 1.3 Scope

The scope of this project is clearly defined to maintain focus on core deliverables while providing a polished user experience:

- **Code Analysis Engine**: Building an AI system that analyzes user-submitted code, identifies errors, explains logic, and suggests improvements using the LLaMA 3.3 70B model via Groq API.
- **Interactive Chat System**: Creating a conversational interface where users can ask context-aware follow-up questions about their analyzed code.
- **Professional Code Editor**: Integrating Monaco Editor (the engine behind VS Code) with syntax highlighting, auto-indentation, cursor tracking, and smooth animations.
- **File Management**: Implementing multi-tab file management with create, open (local files), rename, and close functionality.
- **History & Persistence**: Building a complete history system with local storage persistence, individual item deletion, session restoration, and bulk clear functionality.
- **Theme Support**: Implementing full dark/light theme toggle affecting all UI components.
- **Web Interface**: Designing a macOS-inspired window with traffic light controls, status bar with real-time editor statistics, and responsive layout.
- **Backend API**: Developing a Flask-based REST API that securely communicates with the Groq AI service.

The scope excludes tasks such as building custom AI models from scratch, implementing real-time code execution, or multi-user collaboration. The application is deployable both locally and to cloud platforms (Vercel) using serverless functions, ensuring accessibility as a hosted web application.

---

### 1.4 Feasibility Study

A feasibility study was conducted to ensure that the project is viable from technical, operational, and economic perspectives.

**Technical Feasibility**

The technical feasibility of the project is highly favorable. All required technologies — React 19, Vite, Monaco Editor, Flask, and the Groq API — are mature, well-documented, and freely available. The Groq Cloud API abstracts the complexity of running large language models, providing inference speeds of up to 750 tokens per second on the LLaMA 3.3 70B model. Monaco Editor, the same engine powering VS Code, provides a battle-tested code editing experience. Flask simplifies backend development with minimal boilerplate. Therefore, from a technical standpoint, all necessary tools and services are readily accessible.

**Operational Feasibility**

Operationally, the project is manageable within a standard academic timeframe. The application architecture is straightforward — a React frontend communicating with a Flask backend via REST APIs. The development workflow is streamlined using Vite for hot module replacement during development. The project can be set up and running within minutes using standard `npm install` and `pip install` commands, making it easy to develop, test, and iterate.

**Economic Feasibility**

The project is economically feasible as it leverages entirely free and open-source technologies. React, Vite, Flask, Monaco Editor, Tailwind CSS, and Lucide Icons are all open-source. The Groq API offers a generous free tier suitable for development and educational use. No GPU hardware, cloud hosting fees, or software licenses are required. The entire project runs on a standard laptop with a broadband internet connection.

---

---

## CHAPTER 02: LITERATURE SURVEY

The field of AI-assisted programming education has seen tremendous growth in recent years. With the emergence of large language models (LLMs) and cloud-based AI platforms, developers now have access to powerful tools that can understand, generate, and explain code with remarkable accuracy. This literature survey explores the background technologies that support the AI Code Tutor project.

---

### 2.1 AI-Powered Code Analysis

Code analysis has evolved from simple static analysis tools (like linters and formatters) to sophisticated AI-driven systems capable of understanding code semantics, identifying logical errors, and suggesting improvements.

Early tools like **ESLint**, **Pylint**, and **SonarQube** focused on rule-based pattern matching — identifying syntax errors, style violations, and common anti-patterns. While effective for surface-level issues, these tools lacked the ability to understand code intent or provide educational explanations.

The breakthrough came with transformer-based language models:

- **GPT-3/GPT-4** (OpenAI) demonstrated that LLMs could understand and generate code across multiple programming languages.
- **Codex** (OpenAI) was specifically fine-tuned for code tasks, powering GitHub Copilot.
- **LLaMA** (Meta) introduced open-weight models that could be deployed and fine-tuned by anyone.
- **LLaMA 3.3 70B Versatile** represents the latest generation, offering superior code understanding, multi-language support, and educational explanation capabilities.

In this project, LLaMA 3.3 70B is used through the Groq API to provide:
- Line-by-line code explanations in simple terms.
- Error identification and debugging suggestions.
- Best practice recommendations and optimization tips.
- Context-aware follow-up conversations about the analyzed code.

---

### 2.2 Cloud-Based AI Inference with Groq

Traditional AI model deployment requires significant infrastructure — GPU servers, model hosting, scaling mechanisms, and monitoring systems. This makes running 70B parameter models impractical for individual developers or small projects.

**Groq** has revolutionized AI inference by developing custom **Language Processing Units (LPUs)** — specialized hardware designed specifically for transformer model inference. Key advantages include:

- **Ultra-fast inference**: Up to 750 tokens/second on LLaMA 3.3 70B, significantly faster than GPU-based alternatives.
- **Simple API access**: RESTful API compatible with the OpenAI SDK format.
- **Free tier availability**: Generous rate limits for development and educational use.
- **No infrastructure management**: Fully managed service with automatic scaling.

In this project, Groq serves as the AI inference backbone. The Flask backend sends formatted prompts to the Groq API, which returns analyzed responses in real-time. This approach enables the application to leverage a 70-billion parameter model without any local GPU requirements.

---

### 2.3 Monaco Editor — The Engine Behind VS Code

**Monaco Editor** is the code editor that powers Visual Studio Code, one of the world's most popular IDEs. It is an open-source browser-based editor maintained by Microsoft.

Key features used in this project:
- **Syntax highlighting**: Supports 60+ programming languages out of the box.
- **IntelliSense**: Auto-completion and suggestion capabilities.
- **Cursor tracking**: Real-time line/column position reporting.
- **Selection detection**: Ability to detect and extract selected text for targeted analysis.
- **Theming**: Built-in support for dark (`vs-dark`) and light themes.
- **Smooth animations**: Cursor blinking, smooth scrolling, and caret animation.

The `@monaco-editor/react` package provides seamless React integration, enabling declarative usage of Monaco Editor as a React component with props for value, language, theme, and event handlers.

---

### 2.4 Development Stack: React, Vite, Flask & Tailwind CSS

**React 19**: The latest version of Facebook's component-based UI library. React's declarative paradigm, virtual DOM diffing, and hooks-based state management make it ideal for building complex, interactive web applications. This project uses React hooks extensively (`useState`, `useEffect`, `useRef`) for state management.

**Vite 7**: A next-generation frontend build tool offering:
- Near-instant server startup via native ES modules.
- Lightning-fast Hot Module Replacement (HMR).
- Optimized production builds using Rollup.

**Flask**: A lightweight Python web framework ideal for building REST APIs. Flask's minimalism allows the backend to remain focused on its single responsibility — proxying requests to the Groq API.

**Tailwind CSS 4**: A utility-first CSS framework enabling rapid UI development. Combined with custom color tokens, it powers the application's dark/light theme system.

**Lucide React**: A modern icon library providing clean, consistent SVG icons used throughout the interface.

This technology stack enables rapid development, hot reloading, and a premium user experience — all critical for a modern AI-powered web application.

---

---

## CHAPTER 03: SYSTEM ANALYSIS

System analysis involves a detailed understanding of the needs, challenges, and possibilities surrounding a project. It lays the groundwork for developing a solution that is functional, scalable, and efficient.

---

### 3.1 Problem Definition

Learning to code presents significant challenges for beginners:

- **Lack of immediate feedback**: Students often write code without understanding what it does or why it works.
- **Limited access to mentors**: Not every student has access to experienced programmers who can explain concepts in simple terms.
- **Static learning resources**: Textbooks and video tutorials cannot adapt to a student's specific code or questions.
- **Complex IDE setups**: Many AI coding tools require extensive configuration, paid subscriptions, or cloud accounts.

There is a clear need for a system that provides:
- Instant, AI-powered code analysis and explanation.
- An interactive chat interface for asking follow-up questions.
- A professional yet simple code editing environment.
- Zero-configuration setup that works locally.

This project addresses these needs by combining a browser-based Monaco code editor with an AI-powered analysis panel, delivered through a clean, VS Code-inspired interface.

---

### 3.2 Existing System Challenges

Before AI-powered tutoring platforms, students relied on:

- **Manual code review**: Time-consuming and dependent on mentor availability.
- **Stack Overflow**: Requires framing the right question; answers may not match the student's exact context.
- **Static analysis tools**: Only catch syntax errors and style issues, not logical understanding.
- **Generic AI chatbots**: Lack code-specific context and require copy-pasting code into external interfaces.

Problems with these approaches:
- No contextual understanding of the student's specific code.
- No persistent conversation history for reviewing past learning.
- Fragmented workflow — switching between editor and AI tool.
- Limited educational value — tools fix code but don't explain why.

---

### 3.3 Proposed System

The proposed system integrates the code editor and AI tutor into a single, unified interface:

- **Monaco Code Editor** for writing and editing code with professional-grade features.
- **Groq-powered LLaMA 3.3 70B** model for intelligent code analysis and conversation.
- **Floating AI Assistant Panel** for viewing explanations and asking follow-up questions.
- **History System** with local storage persistence for reviewing past sessions.
- **Dark/Light Theme** support for comfortable coding in any environment.

Features of the proposed system:
- **Unified experience**: Editor and AI assistant in one window.
- **Context-aware**: AI understands the full code context for follow-up questions.
- **Persistent history**: Past analyses are saved and restorable.
- **Selection-based analysis**: Users can select specific code portions for targeted explanation.
- **Zero cost**: Runs locally with free API access.

---

### 3.4 Hardware and Software Requirements

**Hardware Requirements**
- Processor: Intel Core i3 or equivalent (minimum).
- RAM: 4 GB minimum (8 GB recommended).
- Storage: 500 MB free disk space.
- Internet Connection: Broadband connection for API calls.

**Software Requirements**
- OS: Windows 10/11, Linux, or macOS.
- Node.js: v18 or newer (for React/Vite frontend).
- Python: 3.8 or newer (for Flask backend).
- Browser: Chrome, Firefox, or Edge (latest version).
- Groq API Key: Free tier account at console.groq.com.

---

### 3.5 System Architecture

The architecture follows a clean client-server model:

1. **Presentation Layer (Frontend)**:
   - Built with React 19 + Vite.
   - Monaco Editor for code editing.
   - Tailwind CSS for styling.
   - Axios for HTTP communication.

2. **Application Layer (Backend)**:
   - **Local Development**: Flask REST API server (Port 5000) with CORS.
   - **Production (Vercel)**: Python Serverless Function (`api/analyze.py`) — no Flask required.
   - Handles request formatting and response parsing.

3. **AI Service Layer**:
   - Groq Cloud API.
   - LLaMA 3.3 70B Versatile model.
   - System prompt engineering for educational responses.

4. **Persistence Layer**:
   - Browser localStorage for history data.
   - No server-side database required.

**Local Development Architecture:**
```
┌─────────────────────────────────────────────────┐
│              React Frontend (Vite)               │
│  ┌──────────────┐  ┌─────────────────────────┐  │
│  │ Monaco Editor │  │  AI Assistant Panel     │  │
│  │              │  │  (Chat + Markdown)       │  │
│  └──────────────┘  └─────────────────────────┘  │
│              │  Axios HTTP (POST)  │             │
└──────────────┼────────────────────┼─────────────┘
               ▼ Vite Proxy (/api)  ▼
┌─────────────────────────────────────────────────┐
│           Flask Backend (Port 5000)              │
│         /analyze endpoint (POST)                 │
└──────────────────────┬──────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────┐
│              Groq Cloud API                      │
│         LLaMA 3.3 70B Versatile                  │
└─────────────────────────────────────────────────┘
```

**Production Architecture (Vercel):**
```
┌─────────────────────────────────────────────────┐
│          Vercel Edge Network (CDN)               │
│  ┌──────────────────────────────────────────┐   │
│  │  Static Assets (React SPA - Vite Build)  │   │
│  └──────────────────────────────────────────┘   │
│              │  /api/analyze (POST)  │           │
│  ┌──────────────────────────────────────────┐   │
│  │  Python Serverless Function              │   │
│  │  (api/analyze.py - auto-scaled)          │   │
│  └──────────────────────┬───────────────────┘   │
└─────────────────────────┼───────────────────────┘
                          ▼
┌─────────────────────────────────────────────────┐
│              Groq Cloud API                      │
│         LLaMA 3.3 70B Versatile                  │
└─────────────────────────────────────────────────┘
```

---

### 3.6 Functional Requirements

- **Code Editing**: Full-featured code editor with syntax highlighting, auto-indentation, and line numbering.
- **Code Analysis**: AI-powered analysis triggered by the "RUN" button or text selection.
- **Selection-Based Analysis**: Ability to select specific code portions and click "AI Explain" for targeted analysis.
- **Follow-Up Chat**: Interactive conversation with AI about the analyzed code.
- **File Management**: Create, open (local files), rename (double-click), and close file tabs.
- **History Management**: View, restore, delete individual items, and clear all history.
- **Theme Toggle**: Switch between dark and light modes.
- **Editor Statistics**: Real-time line number, column, and total lines display in the status bar.

---

### 3.7 Non-Functional Requirements

- **Performance**: AI response time should be under 5 seconds for typical code snippets.
- **Usability**: Clean, intuitive interface requiring no prior training.
- **Reliability**: Graceful error handling for API failures and network issues.
- **Persistence**: History data should survive browser refreshes and restarts.
- **Security**: API keys stored in environment variables, never exposed to the client.
- **Responsiveness**: UI should adapt to different screen sizes.

---

---

## CHAPTER 04: SYSTEM DESIGN

System design defines the architecture, components, and data flow of the project. It acts as a bridge between initial requirements and final implementation.

---

### 4.1 System Architecture

#### 4.1.1 Layered Architecture

- **Presentation Layer**: Built with React 19 and Tailwind CSS, managing all user interactions — code editing, file management, theme switching, and AI panel interactions.
- **Application Layer**: Flask backend handling API routing, request validation, prompt engineering, and response formatting.
- **Service Layer**: Groq Cloud API providing LLaMA 3.3 inference capabilities.
- **Storage Layer**: Browser localStorage for client-side history persistence.

Each layer is modular and independently maintainable. The frontend communicates with the backend solely through REST APIs, enabling either layer to be replaced without affecting the other.

#### 4.1.2 Architecture Diagram

```
┌────────────────────────────────────────────────────────┐
│                    USER (Browser)                       │
└────────────────────────┬───────────────────────────────┘
                         │
┌────────────────────────▼───────────────────────────────┐
│              PRESENTATION LAYER                         │
│  ┌────────────┐ ┌──────────┐ ┌───────────────────────┐ │
│  │   Monaco   │ │   File   │ │   AI Assistant Panel  │ │
│  │   Editor   │ │   Tabs   │ │  (Chat + Markdown)    │ │
│  └────────────┘ └──────────┘ └───────────────────────┘ │
│  ┌────────────┐ ┌──────────┐ ┌───────────────────────┐ │
│  │   Theme    │ │  History  │ │   Status Bar          │ │
│  │   Toggle   │ │  Sidebar  │ │  (Ln, Col, State)     │ │
│  └────────────┘ └──────────┘ └───────────────────────┘ │
└────────────────────────┬───────────────────────────────┘
                         │ HTTP POST /analyze
┌────────────────────────▼───────────────────────────────┐
│               APPLICATION LAYER                         │
│              Flask REST API (Python)                     │
│         Request Validation + Prompt Engineering         │
└────────────────────────┬───────────────────────────────┘
                         │ Groq SDK
┌────────────────────────▼───────────────────────────────┐
│                SERVICE LAYER                            │
│           Groq Cloud API (LLaMA 3.3 70B)               │
└────────────────────────────────────────────────────────┘
```

---

### 4.2 Functional Design

#### 4.2.1 Code Analysis Flow

The code analysis interface allows users to write or paste code in the Monaco editor. Users can either:
- Click the **"RUN"** button to analyze the entire file.
- **Select specific lines** and click the floating **"AI Explain"** button for targeted analysis.

The AI responds with structured explanations including:
- Line-by-line breakdown of code logic.
- Error identification and debugging suggestions.
- Best practice recommendations.
- Performance optimization tips.

#### 4.2.2 Interactive Chat System

After initial analysis, users can ask follow-up questions through the chat input. The system maintains full conversation context, including:
- The original code being analyzed.
- All previous messages in the conversation.
- The AI tutor's system prompt for educational responses.

#### 4.2.3 User Interface Layout

The application features a macOS-inspired window with:
- **Title Bar**: Traffic light controls (red/yellow/green), app name, theme toggle, history toggle, and RUN button.
- **Tab Bar**: File tabs with create, open, rename, and close functionality.
- **Main Content**: Monaco editor (when file active) or Welcome Screen (when no file active).
- **AI Assistant Panel**: Floating overlay with chat messages, markdown rendering, and input field.
- **History Sidebar**: Slide-in panel showing past analysis sessions.
- **Status Bar**: Real-time editor statistics (line, column, encoding, language).

---

### 4.3 Data Flow Design

#### 4.3.1 Data Flow Steps

1. **User Input**: User writes code in Monaco Editor or selects specific lines.
2. **Analysis Trigger**: User clicks "RUN" or "AI Explain" button.
3. **Request Preparation**: Frontend formats the code and conversation history into a POST request.
4. **API Gateway**: Flask backend receives the request, validates it, and prepends the system prompt.
5. **AI Inference**: Groq API processes the prompt using LLaMA 3.3 70B and returns the analysis.
6. **Response Handling**: Backend returns the AI response as JSON.
7. **Display**: Frontend renders the response as formatted Markdown in the AI Assistant panel.
8. **History Save**: The analysis is automatically saved to localStorage.

#### 4.3.2 Data Flow Diagram

```
User writes code → Clicks RUN/AI Explain
        │
        ▼
Frontend formats request (code + messages)
        │
        ▼ POST /analyze
Flask Backend validates + adds system prompt
        │
        ▼ Groq SDK
LLaMA 3.3 70B generates analysis
        │
        ▼ JSON response
Frontend renders Markdown + saves to history
        │
        ▼
User sees explanation in AI panel
        │
        ▼ (Optional)
User asks follow-up → cycle repeats with context
```

---

### 4.4 Security and Performance Design

#### 4.4.1 Security Measures

- **API Key Management**: The Groq API key is stored in a `.env` file on the backend and loaded via `python-dotenv`. It is never exposed to the frontend client.
- **CORS Configuration**: Flask-CORS is configured to handle cross-origin requests between the frontend (port 5173) and backend (port 5000).
- **Input Validation**: The backend validates that requests contain either code or messages before processing.
- **No Server-Side Storage**: No user data is stored on the server — all history is managed client-side in localStorage.

#### 4.4.2 Performance Optimization

- **Groq LPU Inference**: Groq's custom hardware delivers 750+ tokens/second, ensuring sub-3-second response times for most code snippets.
- **Vite HMR**: Hot Module Replacement provides instant development feedback.
- **Monaco Editor**: Efficient rendering with webworker-based syntax processing.
- **Minimal Backend**: Flask serves only as a thin API proxy, adding negligible latency.
- **Client-Side History**: localStorage operations are synchronous and instant.

---

---

## CHAPTER 05: SYSTEM IMPLEMENTATION

### 5.1 Environment Setup

The development environment was configured with the following tools:

**Backend Setup:**
- Python (latest version) installed.
- Virtual environment created using `python -m venv venv`.
- Dependencies installed: `flask`, `flask-cors`, `python-dotenv`, `groq`.
- Groq API key configured in `.env` file.

**Frontend Setup:**
- Node.js (v18+) installed.
- Vite project initialized: `npx create-vite@latest frontend --template react`.
- Dependencies installed: `@monaco-editor/react`, `axios`, `lucide-react`, `react-markdown`, `remark-gfm`, `tailwindcss`.

**Development Tools:**
- Visual Studio Code as the IDE.
- Chrome DevTools for frontend debugging.
- Vite Dev Server for hot reloading.

---

### 5.2 Backend Development

The backend is a lightweight Flask REST API with a single primary endpoint:

**`POST /analyze`** — Accepts code and/or conversation messages, prepends a system prompt, and forwards them to the Groq API for analysis.

Key implementation details:
- The system prompt instructs the AI to act as a helpful coding tutor.
- Both legacy single-code-submission and modern multi-message conversation formats are supported.
- Error handling returns appropriate HTTP status codes (400 for bad requests, 500 for server errors).
- A fallback mock response is provided when the Groq API key is missing.

---

### 5.3 Frontend Development

The frontend is a single-page React application with the following component structure:

- **`App.jsx`** (614 lines): The main application component managing all state, UI layout, and business logic.
- **`CodeEditor.jsx`** (115 lines): Monaco Editor integration with selection detection, floating "AI Explain" button, and cursor stats.
- **`ExplanationPanel.jsx`** (157 lines): AI chat panel with Markdown rendering, message history, loading states, and input handling.
- **`index.css`** + **`main.jsx`**: Application entry points and global styles.

Key frontend features:
- **State Management**: 10+ state variables managed via React hooks (`useState`, `useEffect`, `useRef`).
- **Theme System**: Dynamic class names toggling between dark and light color palettes.
- **File System**: In-memory file management with create, import, rename, and close.
- **History System**: localStorage-persisted analysis history with full CRUD operations.
- **Responsive Panels**: Floating AI panel and slide-in history sidebar with smooth animations.

---

### 5.5 Cloud Deployment (Vercel)

The application is deployed to **Vercel** for production access. Vercel hosts the React frontend as static assets via its global CDN and runs the backend as a **Python Serverless Function**.

#### 5.5.1 Deployment Architecture

The deployment required restructuring the backend from a Flask server to a standalone serverless function:

- **`api/analyze.py`**: A Python serverless function using Vercel's native HTTP handler (`BaseHTTPRequestHandler`). This replaces Flask entirely in production, handling `POST` and `OPTIONS` (CORS preflight) requests.
- **`vercel.json`**: Configuration file specifying the build command, output directory, and API route rewrites.
- **Root `requirements.txt`**: Declares the `groq` SDK as the only serverless dependency.

#### 5.5.2 Key Configuration — `vercel.json`

```json
{
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" }
  ]
}
```

#### 5.5.3 API URL Strategy

The frontend uses **relative API URLs** (`/api/analyze`) instead of hardcoded `localhost` URLs. This ensures the same codebase works in both environments:

- **Local Development**: Vite's dev server proxies `/api/*` requests to `http://localhost:5000` (Flask).
- **Production**: Vercel routes `/api/*` to the Python serverless function.

#### 5.5.4 Environment Variables

The `GROQ_API_KEY` is configured through Vercel's dashboard under **Project Settings → Environment Variables**, keeping it secure and out of version control.

#### 5.5.5 Serverless Function — `api/analyze.py`

```python
from http.server import BaseHTTPRequestHandler
import json, os

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length)
        data = json.loads(body)

        code = data.get('code', '')
        messages = data.get('messages', [])

        if not messages:
            messages = [{"role": "user", "content": f"Analyze this code:\n{code}"}]

        from groq import Groq
        client = Groq(api_key=os.environ.get("GROQ_API_KEY"))
        system_prompt = "You are a helpful coding tutor..."
        full_messages = [{"role": "system", "content": system_prompt}] + messages

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=full_messages
        )
        analysis = response.choices[0].message.content

        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({"analysis": analysis}).encode())

    def do_OPTIONS(self):
        # CORS preflight handling
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
```

---

### 5.4 Source Code

#### 5.4.1 Backend — `app.py`

```python
from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Groq Client
from groq import Groq
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

@app.route('/')
def home():
    return jsonify({"message": "AI Coding Tutor Backend Running"})

@app.route('/analyze', methods=['POST'])
def analyze_code():
    data = request.json
    
    code = data.get('code', '')
    messages = data.get('messages', [])
    
    if not code and not messages:
        return jsonify({"error": "No code or messages provided"}), 400
    
    if not messages:
        messages = [
            {"role": "user", "content": f"Analyze this code:\n{code}"}
        ]
    
    try:
        if os.getenv("GROQ_API_KEY"):
             system_prompt = "You are a helpful coding tutor. Explain the code 
             in simple terms, point out any errors, and suggest improvements. 
             If the user asks follow-up questions, answer them in the context 
             of the provided code. Keep responses concise and educational."
             
             full_messages = [{"role": "system", "content": system_prompt}] + messages

             response = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=full_messages
            )
             analysis = response.choices[0].message.content
        else:
            analysis = "## Explanation\n(Mock) Groq API Key missing."

        return jsonify({"analysis": analysis})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

#### 5.4.2 Frontend — Key Components

**CodeEditor.jsx** — Monaco editor with floating AI button:
```jsx
import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ code, onChange, onAnalyze, theme, onStatsChange }) => {
    const editorRef = useRef(null);
    const [buttonPosition, setButtonPosition] = useState(null);
    const [showButton, setShowButton] = useState(false);

    const handleEditorDidMount = (editor) => {
        editorRef.current = editor;
        editor.onDidChangeCursorSelection((e) => {
            if (!e.selection.isEmpty()) {
                // Show floating "AI Explain" button at selection end
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        });
    };

    return (
        <div className="h-full relative">
            <Editor
                height="100%" defaultLanguage="python"
                value={code} onChange={onChange}
                theme={theme === 'dark' ? 'vs-dark' : 'light'}
                onMount={handleEditorDidMount}
                options={{ minimap: { enabled: false }, fontSize: 15 }}
            />
            {showButton && (
                <button onClick={handleButtonClick}
                    className="absolute z-50 bg-[#0d1117] text-blue-400 
                    px-3 py-1.5 rounded border border-blue-500/30">
                    AI Explain
                </button>
            )}
        </div>
    );
};
```

**ExplanationPanel.jsx** — AI chat with Markdown rendering:
```jsx
import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ExplanationPanel = ({ messages, loading, error, onSendMessage, theme }) => {
    const [input, setInput] = useState('');

    return (
        <div className="h-full flex flex-col">
            {/* Messages with Markdown rendering */}
            <div className="flex-1 overflow-y-auto">
                {messages.map((msg, i) => (
                    <div key={i}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {msg.content}
                        </ReactMarkdown>
                    </div>
                ))}
            </div>
            {/* Chat input */}
            <form onSubmit={handleSubmit}>
                <input value={input} onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a follow-up question..." />
            </form>
        </div>
    );
};
```

---

---

## CHAPTER 06: TESTING

Testing ensures that the application is functional, reliable, and meets user requirements.

---

### 6.1 Setup and Execution

**Step 1: Install Backend Dependencies**
```bash
cd backend
pip install flask flask-cors python-dotenv groq
```

**Step 2: Configure API Key**
Create a `.env` file in the backend directory:
```
GROQ_API_KEY=your_groq_api_key_here
```

**Step 3: Start Backend Server**
```bash
python app.py
```
The Flask server starts on `http://localhost:5000`.

**Step 4: Install Frontend Dependencies**
```bash
cd frontend
npm install
```

**Step 5: Launch Frontend**
```bash
npm run dev
```
Vite opens the application at `http://localhost:5173`.

---

### 6.2 Types of Testing

#### 6.2.1 Unit Testing
Each independent function was tested separately:
- `handleAnalyze()` tested with various code snippets.
- `handleSendMessage()` tested with follow-up questions.
- `createNewFile()`, `closeFile()`, `deleteHistoryItem()` tested for state management.
- Backend `/analyze` endpoint tested with valid and invalid payloads.

#### 6.2.2 Integration Testing
Modules were tested together to ensure:
- Smooth data flow from Monaco Editor → React State → Axios → Flask → Groq API.
- Proper response rendering in the ExplanationPanel with Markdown formatting.
- History auto-save and restore across browser sessions.

#### 6.2.3 System Testing
The complete system was tested through real-world user interactions:
- Multiple file tabs opened simultaneously.
- Theme switching mid-analysis.
- History restoration and deletion.
- Error handling for API failures and empty inputs.

#### 6.2.4 User Acceptance Testing (UAT)
Feedback was collected from trial users:
- Code explanation clarity and accuracy.
- UI intuitiveness and ease of navigation.
- Theme preference and readability.
- Overall learning value and user satisfaction.

---

### 6.3 Testing Tools Used

| Tool | Purpose |
|------|---------|
| Chrome DevTools | Frontend debugging and network inspection |
| Vite Dev Server | Hot module replacement for rapid testing |
| Flask Debug Mode | Backend error logging and auto-reload |
| Postman | Manual API endpoint testing |
| Browser localStorage | History persistence verification |

---

### 6.4 Sample Test Cases

| Test Case ID | Scenario | Expected Outcome | Result |
|-------------|----------|------------------|--------|
| TC01 | Click RUN with Python code | AI analysis displayed | ✅ Pass |
| TC02 | Select code lines, click AI Explain | Selected code analyzed | ✅ Pass |
| TC03 | Ask follow-up question | Context-aware response | ✅ Pass |
| TC04 | Click RUN with empty editor | Error message shown | ✅ Pass |
| TC05 | Toggle dark/light theme | All UI components update | ✅ Pass |
| TC06 | Create new file tab | New tab appears with default content | ✅ Pass |
| TC07 | Open local file | File content loaded in editor | ✅ Pass |
| TC08 | Rename file (double-click) | File name updated in tab | ✅ Pass |
| TC09 | Close file tab | Tab removed, previous tab activated | ✅ Pass |
| TC10 | Delete history item | Item removed from history | ✅ Pass |
| TC11 | Restore history item | Code and analysis restored | ✅ Pass |
| TC12 | Red button (close) | Returns to Welcome Screen | ✅ Pass |
| TC13 | Refresh browser | History persisted in localStorage | ✅ Pass |
| TC14 | Backend not running | Error message displayed | ✅ Pass |

---

### 6.5 Bug Tracking and Resolution

| Bug ID | Description | Resolution |
|--------|-------------|------------|
| B01 | Red close button not returning to Welcome Screen | Fixed: Changed `setActiveFile(null)` to `setActiveFileId(null)` |
| B02 | Unused imports increasing bundle size | Removed all unused imports from App.jsx, CodeEditor.jsx, ExplanationPanel.jsx |
| B03 | Default Vite CSS overriding custom styles | Deleted unused `App.css` boilerplate file |
| B04 | Unnecessary database code in backend | Removed SQLAlchemy model, config, and imports from app.py |

---

---

## CHAPTER 07: RESULT

The project **"AI Code Tutor — An Intelligent Code Analysis and Learning Platform"** was successfully implemented and achieved all expected outcomes.

**Chatbot and Code Analysis Performance:**
- The AI tutor provides accurate, educational explanations for code in Python, JavaScript, Java, C++, and other languages.
- Average response time is under 3 seconds, thanks to Groq's ultra-fast LPU inference.
- Follow-up questions maintain full context, enabling deeper learning conversations.
- Selection-based analysis allows targeted explanation of specific code sections.

**User Interface Quality:**
- The VS Code-inspired interface provides a familiar, professional coding environment.
- Dark and light themes are fully implemented across all components.
- The floating AI panel and slide-in history sidebar provide a clean, non-intrusive experience.
- The macOS-style traffic light controls (red/yellow/green) add visual polish.

**Feature Completeness:**
- File management (create, open, rename, close) — ✅ Complete.
- Code analysis (full file and selection-based) — ✅ Complete.
- Interactive chat with context — ✅ Complete.
- History (save, restore, delete, clear) — ✅ Complete.
- Theme toggle (dark/light) — ✅ Complete.
- Editor statistics (line, column) — ✅ Complete.
- Welcome Screen with quick actions — ✅ Complete.
- Cloud deployment (Vercel) — ✅ Complete.

**Deployment:**
- The application is deployed to **Vercel** and accessible as a live web application.
- Frontend is served via Vercel's global CDN for fast load times worldwide.
- Backend runs as a Python serverless function, auto-scaling with demand.
- GitHub Repository: [github.com/Vikbuilds/Aicodetutor](https://github.com/Vikbuilds/Aicodetutor)

**Key Metrics:**

| Metric | Value |
|--------|-------|
| Average AI response time | < 3 seconds |
| AI model used | LLaMA 3.3 70B Versatile |
| Frontend bundle size | ~2 MB (optimized) |
| Backend lines of code | 58 lines (Flask) / 65 lines (Serverless) |
| Frontend lines of code | ~886 lines |
| Number of React components | 3 |
| Test cases passed | 14/14 (100%) |
| Bugs identified and fixed | 4 |
| Deployment platform | Vercel (Serverless) |
| Source control | GitHub |

The project successfully demonstrates that powerful AI-assisted learning tools can be built with minimal infrastructure by leveraging cloud AI APIs, modern frontend frameworks, lightweight backend architectures, and serverless cloud deployment.

---

---

## CHAPTER 08: CONCLUSION

The project titled **"AI Code Tutor — An Intelligent Code Analysis and Learning Platform"** represents a meaningful achievement in applying AI technology to programming education. The primary objective was to create an interactive system that leverages Groq's LLaMA 3.3 70B model through a VS Code-inspired web interface to deliver intelligent code analysis and educational tutoring.

Through the development process, the project demonstrated mastery of several critical skills:
- **Full-stack web development** using React 19, Vite, Tailwind CSS, and Flask.
- **AI service integration** through the Groq Cloud API.
- **Prompt engineering** for educational AI responses.
- **State management** with React hooks and browser localStorage.
- **UI/UX design** with professional-grade code editing and responsive layouts.
- **REST API design** with proper validation, error handling, and CORS configuration.
- **Cloud deployment** using Vercel serverless functions and CDN hosting.

The code analysis feature demonstrated strong understanding of multiple programming languages, providing accurate explanations, error detection, and improvement suggestions. The interactive chat system enabled context-aware follow-up conversations, creating a truly educational experience. The history system allowed users to revisit and learn from past analyses.

**System Performance Highlights:**
- Rapid AI response time (average < 3 seconds) powered by Groq's LPU hardware.
- Stable operation with no crashes or API failures during testing.
- Clean, professional interface praised by test users for its intuitiveness.
- 100% test case pass rate across all functional areas.

**Challenges Faced:**
- Managing complex React state across multiple features (files, chat, history, theme).
- Handling edge cases like empty files, API timeouts, and concurrent state updates.
- Designing a responsive floating panel system that works alongside the code editor.
- Implementing proper Markdown rendering with code block syntax highlighting.

These challenges were addressed through iterative development, testing, and careful architectural decisions.

**Impact:** This project bridges the gap between passive learning resources and interactive AI tutoring. It provides students with an always-available coding mentor that adapts to their specific code and questions, making programming education more accessible and effective.

---

---

## CHAPTER 09: FUTURE ENHANCEMENTS

### 9.1 Multi-Language Code Detection
Implement automatic programming language detection to dynamically switch Monaco Editor's syntax highlighting and tailor AI prompts based on the detected language.

### 9.2 Real-Time Code Execution
Integrate a sandboxed code execution environment allowing users to run their code directly within the application and see output alongside AI explanations.

### 9.3 Smart Refactoring Suggestions
Add one-click refactoring actions such as "Fix Bug", "Optimize Code", "Add Comments", and "Convert to TypeScript" powered by AI-generated diffs.

### 9.4 Visual Diff View
Show AI-suggested code changes in a side-by-side diff view, allowing users to review and apply modifications before accepting them.

### 9.5 Gamification and Coding Challenges
Introduce AI-generated coding challenges based on the user's skill level, with hints, scoring, and progress tracking to encourage learning.

### 9.6 Multi-File Project Support
Extend the system to analyze entire project directories, understanding relationships between files and providing project-level insights.

### 9.7 User Authentication and Cloud Sync
Implement user accounts with cloud-synced history, preferences, and progress tracking across devices.

### 9.8 Voice-Based Interaction
Add voice input for asking questions and text-to-speech for AI responses, making the platform accessible to visually impaired users.

### 9.9 Collaborative Learning
Enable real-time collaborative coding sessions where multiple users can share an editor and learn together with AI assistance.

### 9.10 Mobile-Responsive Design
Optimize the interface for tablets and mobile devices, enabling learning on-the-go.

### 9.11 Export and Sharing
Allow users to export their annotated code with AI explanations as PDF reports or shareable links.

### 9.12 Integration with GitHub
Connect to GitHub repositories to directly import, analyze, and improve code from user repositories.

---

---

## CHAPTER 10: BIBLIOGRAPHY & REFERENCES

**Books**
- Flanagan, D. (2020). *JavaScript: The Definitive Guide* (7th ed.). O'Reilly Media.
- Grinberg, M. (2018). *Flask Web Development* (2nd ed.). O'Reilly Media.
- Banks, A., & Porcello, E. (2020). *Learning React* (2nd ed.). O'Reilly Media.

**Official Documentation**
- React Documentation. (n.d.). Retrieved from https://react.dev/
- Vite Documentation. (n.d.). Retrieved from https://vitejs.dev/
- Flask Documentation. (n.d.). Retrieved from https://flask.palletsprojects.com/
- Monaco Editor Documentation. (n.d.). Retrieved from https://microsoft.github.io/monaco-editor/
- Groq API Documentation. (n.d.). Retrieved from https://console.groq.com/docs/
- Tailwind CSS Documentation. (n.d.). Retrieved from https://tailwindcss.com/docs

**Research Papers**
- Touvron, H., et al. (2024). *LLaMA: Open and Efficient Foundation Language Models*. Meta AI Research.
- Brown, T. B., et al. (2020). *Language Models are Few-Shot Learners*. Advances in Neural Information Processing Systems.
- Chen, M., et al. (2021). *Evaluating Large Language Models Trained on Code*. OpenAI.

**Online Resources**
- Groq. (2025). Groq Cloud Platform. Retrieved from https://groq.com/
- Meta AI. (2025). LLaMA Model Family. Retrieved from https://ai.meta.com/llama/
- Lucide Icons. (n.d.). Retrieved from https://lucide.dev/
- npm — @monaco-editor/react. (n.d.). Retrieved from https://www.npmjs.com/package/@monaco-editor/react
- npm — react-markdown. (n.d.). Retrieved from https://www.npmjs.com/package/react-markdown
- Vercel Documentation. (n.d.). Retrieved from https://vercel.com/docs
- Vercel Serverless Functions (Python). (n.d.). Retrieved from https://vercel.com/docs/functions/runtimes/python
- GitHub — Vikbuilds/Aicodetutor. (2025). Retrieved from https://github.com/Vikbuilds/Aicodetutor

---

*End of Report*
