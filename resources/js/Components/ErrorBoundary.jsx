import React from 'react';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("UI Error Caught by Boundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-[#f8f6f6] dark:bg-[#02040a] text-black dark:text-white flex flex-col items-center justify-center p-6 selection:bg-primary/30">
                    <div className="max-w-md w-full bg-white/70 dark:bg-white/5 backdrop-blur-3xl border border-black/5 dark:border-white/10 p-10 rounded-[2.5rem] shadow-2xl text-center relative overflow-hidden group">
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-500/10 rounded-full blur-[50px] pointer-events-none"></div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6 text-red-500">
                                <AlertTriangle className="w-8 h-8" />
                            </div>
                            <h1 className="text-2xl font-black mb-2 uppercase tracking-tight">System Glitch</h1>
                            <p className="text-gray-500 dark:text-gray-400 mb-8 font-light leading-relaxed">
                                Our neural link encountered unexpected turbulence. Don't worry, the intelligence core is still intact.
                            </p>
                            
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => window.location.reload()}
                                    className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-primary text-white font-black uppercase tracking-wider text-xs hover:bg-primary/90 transition-colors shadow-[0_0_20px_rgba(43,124,238,0.2)]"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    Reboot System
                                </button>
                                <a
                                    href="/"
                                    className="flex items-center justify-center gap-2 w-full py-4 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 font-black uppercase tracking-wider text-xs transition-colors"
                                >
                                    <Home className="w-4 h-4" />
                                    Return to Base
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
