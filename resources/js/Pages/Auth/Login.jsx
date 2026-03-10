import React, { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Zap, Lock, Mail, Eye, EyeOff } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = React.useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => { reset('password'); };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen bg-[#02040a] text-white font-sans flex items-center justify-center relative overflow-hidden">
            <Head title="Studio Login" />

            {/* Ambient Glows */}
            <div className="fixed top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-primary/8 rounded-full blur-[200px] pointer-events-none"></div>
            <div className="fixed bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/8 rounded-full blur-[150px] pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full max-w-md px-6"
            >
                {/* Logo */}
                <div className="flex justify-center mb-10">
                    <Link href="/">
                        <img src="/img/logo_wbc.png" alt="Techy News" className="h-10 w-auto" />
                    </Link>
                </div>

                {/* Card */}
                <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-10 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                                <Lock className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Studio Access</span>
                        </div>
                        <h1 className="text-3xl font-black tracking-tighter">Welcome back.</h1>
                        <p className="text-gray-500 font-light mt-2 text-sm">Sign in to access the AI Studio.</p>
                    </div>

                    {status && (
                        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-sm text-green-400 font-medium">
                            {status}
                        </div>
                    )}

                    {Object.keys(errors).length > 0 && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
                            {Object.values(errors).map((err, i) => (
                                <p key={i} className="text-sm text-red-400 font-medium">{err}</p>
                            ))}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    autoComplete="email"
                                    autoFocus
                                    placeholder="your@email.com"
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-11 pr-4 py-4 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-11 pr-12 py-4 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Remember + Forgot */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={e => setData('remember', e.target.checked)}
                                    className="w-4 h-4 rounded bg-white/5 border border-white/10 text-primary focus:ring-primary/30 accent-primary"
                                />
                                <span className="text-xs text-gray-500 font-medium">Remember me</span>
                            </label>
                            {canResetPassword && (
                                <Link href={route('password.request')} className="text-xs text-gray-500 hover:text-primary transition-colors font-medium">
                                    Forgot password?
                                </Link>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-white text-black font-black py-4 rounded-xl hover:scale-105 hover:bg-gray-100 transition-all text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(255,255,255,0.1)] disabled:opacity-70 disabled:scale-100 flex items-center justify-center gap-2"
                        >
                            {processing ? (
                                <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></span>
                            ) : (
                                <Zap className="w-4 h-4" />
                            )}
                            {processing ? 'Signing in...' : 'Enter Studio'}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <p className="text-center text-[10px] font-black uppercase tracking-widest text-gray-700 mt-8">
                    <Link href="/" className="hover:text-gray-500 transition-colors">← Back to Techy News</Link>
                </p>
            </motion.div>
        </div>
    );
}
