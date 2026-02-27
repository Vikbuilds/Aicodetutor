import React from 'react';
import { Sparkles, Activity, Code2, ArrowRight, Github, Zap, Shield, Globe } from 'lucide-react';

const LandingPage = ({ onStart, theme }) => {
    const isDark = theme === 'dark';

    return (
        <div className={`min-h-screen ${isDark ? 'bg-[#0d1117] text-white' : 'bg-white text-gray-900'} overflow-x-hidden selection:bg-blue-500/30`}>
            {/* Background Orbs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-float"></div>
                <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-purple-600/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '-2s' }}></div>
            </div>

            {/* Navbar */}
            <nav className="relative z-10 flex items-center justify-between px-6 py-8 max-w-7xl mx-auto">
                <div className="flex items-center space-x-2">
                    <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/20">
                        <Code2 className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">AI Code Tutor</span>
                </div>
                <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
                    <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
                    <a href="#" className="hover:text-blue-400 transition-colors">Community</a>
                    <button
                        onClick={onStart}
                        className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all font-semibold"
                    >
                        Sign In
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative z-10 px-6 pt-20 pb-32 max-w-7xl mx-auto text-center">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-8 animate-fade-in">
                    <Zap className="w-3 h-3" />
                    <span>v2.0 is now live</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 animate-slide-up">
                    Master Coding with <br />
                    <span className="text-gradient">AI Intelligence</span>
                </h1>

                <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    Stop just writing code. Start understanding it. Our AI Tutor explains logic,
                    generates challenges, and guides you step-by-step through execution.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                    <button
                        onClick={onStart}
                        className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center justify-center space-x-2 transition-all shadow-xl shadow-blue-900/20 transform hover:-translate-y-1"
                    >
                        <span>Start Learning Now</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                    <a
                        href="https://github.com"
                        target="_blank"
                        className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold flex items-center justify-center space-x-2 transition-all border border-white/10"
                    >
                        <Github className="w-5 h-5" />
                        <span>Star on GitHub</span>
                    </a>
                </div>

                {/* Hero Image / UI Preview Placeholder */}
                <div className="mt-20 relative animate-slide-up" style={{ animationDelay: '0.6s' }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent z-10 h-32 bottom-0"></div>
                    <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl glass">
                        <div className="bg-white/5 px-4 py-3 border-b border-white/10 flex items-center space-x-2">
                            <div className="flex space-x-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                            </div>
                        </div>
                        <div className="aspect-video bg-[#0d1117] flex items-center justify-center text-gray-700">
                            {/* This would be an image of the actual app dashboard */}
                            <div className="flex flex-col items-center">
                                <Code2 className="w-16 h-16 mb-4 opacity-10" />
                                <span className="text-sm font-mono opacity-20">[ UI Preview Area ]</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="relative z-10 px-6 py-32 bg-white/5 border-y border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Supercharged Learning</h2>
                        <p className="text-gray-400">Everything you need to level up your engineering skills.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Sparkles className="w-6 h-6 text-purple-400" />}
                            title="AI Challenges"
                            description="Personalized tasks generated from your code to push your limits."
                            isDark={isDark}
                        />
                        <FeatureCard
                            icon={<Activity className="w-6 h-6 text-blue-400" />}
                            title="Execution Tracing"
                            description="Visualize variable changes and logic flow line-by-line."
                            isDark={isDark}
                        />
                        <FeatureCard
                            icon={<Zap className="w-6 h-6 text-yellow-400" />}
                            title="Live Refactoring"
                            description="Instant best-practice suggestions to write clean, Pythonic code."
                            isDark={isDark}
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 py-12 px-6 border-t border-white/5 text-center text-gray-500 text-sm">
                <p>© 2026 AI Code Tutor. Built for the next generation of engineers.</p>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, description, isDark }) => (
    <div className={`p-8 rounded-2xl glass hover:bg-white/5 transition-all group border border-white/5 hover:border-white/10`}>
        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
);

export default LandingPage;
