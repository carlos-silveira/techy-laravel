import { jsxs, jsx } from "react/jsx-runtime";
import React, { useEffect } from "react";
import { useForm, Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Lock, Mail, EyeOff, Eye, Zap } from "lucide-react";
function Login({ status, canResetPassword }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false
  });
  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);
  const submit = (e) => {
    e.preventDefault();
    post("/login");
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#02040a] text-white font-sans flex items-center justify-center relative overflow-hidden", children: [
    /* @__PURE__ */ jsx(Head, { title: "Studio Login" }),
    /* @__PURE__ */ jsx("div", { className: "fixed top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-primary/8 rounded-full blur-[200px] pointer-events-none" }),
    /* @__PURE__ */ jsx("div", { className: "fixed bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/8 rounded-full blur-[150px] pointer-events-none" }),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        className: "relative z-10 w-full max-w-md px-6",
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-10", children: /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsx("img", { src: "/img/logo_wbc.png", alt: "Techy News", className: "h-10 w-auto" }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-10 shadow-[0_30px_80px_rgba(0,0,0,0.5)]", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsx(Lock, { className: "w-4 h-4 text-primary" }) }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black uppercase tracking-[0.3em] text-primary", children: "Studio Access" })
              ] }),
              /* @__PURE__ */ jsx("h1", { className: "text-3xl font-black tracking-tighter", children: "Welcome back." }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-500 font-light mt-2 text-sm", children: "Sign in to access the AI Studio." })
            ] }),
            status && /* @__PURE__ */ jsx("div", { className: "mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-sm text-green-400 font-medium", children: status }),
            Object.keys(errors).length > 0 && /* @__PURE__ */ jsx("div", { className: "mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl", children: Object.values(errors).map((err, i) => /* @__PURE__ */ jsx("p", { className: "text-sm text-red-400 font-medium", children: err }, i)) }),
            /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-5", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-2", children: "Email" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(Mail, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "email",
                      name: "email",
                      value: data.email,
                      onChange: (e) => setData("email", e.target.value),
                      autoComplete: "email",
                      autoFocus: true,
                      placeholder: "your@email.com",
                      className: "w-full bg-white/[0.03] border border-white/10 rounded-xl pl-11 pr-4 py-4 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-2", children: "Password" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(Lock, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: showPassword ? "text" : "password",
                      name: "password",
                      value: data.password,
                      onChange: (e) => setData("password", e.target.value),
                      autoComplete: "current-password",
                      placeholder: "••••••••",
                      className: "w-full bg-white/[0.03] border border-white/10 rounded-xl pl-11 pr-12 py-4 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setShowPassword(!showPassword),
                      className: "absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors",
                      children: showPassword ? /* @__PURE__ */ jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4" })
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "checkbox",
                      name: "remember",
                      checked: data.remember,
                      onChange: (e) => setData("remember", e.target.checked),
                      className: "w-4 h-4 rounded bg-white/5 border border-white/10 text-primary focus:ring-primary/30 accent-primary"
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 font-medium", children: "Remember me" })
                ] }),
                canResetPassword && /* @__PURE__ */ jsx(Link, { href: "/forgot-password", className: "text-xs text-gray-500 hover:text-primary transition-colors font-medium", children: "Forgot password?" })
              ] }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "submit",
                  disabled: processing,
                  className: "w-full bg-white text-black font-black py-4 rounded-xl hover:scale-105 hover:bg-gray-100 transition-all text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(255,255,255,0.1)] disabled:opacity-70 disabled:scale-100 flex items-center justify-center gap-2",
                  children: [
                    processing ? /* @__PURE__ */ jsx("span", { className: "w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" }) : /* @__PURE__ */ jsx(Zap, { className: "w-4 h-4" }),
                    processing ? "Signing in..." : "Enter Studio"
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-center text-[10px] font-black uppercase tracking-widest text-gray-700 mt-8", children: /* @__PURE__ */ jsx(Link, { href: "/", className: "hover:text-gray-500 transition-colors", children: "← Back to Techy News" }) })
        ]
      }
    )
  ] });
}
export {
  Login as default
};
