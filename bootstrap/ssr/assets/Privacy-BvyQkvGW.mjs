import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { Head } from "@inertiajs/react";
import { N as Navbar, P as PublicFooter } from "./PublicFooter-CfergmOz.mjs";
import { u as useLanguage } from "./ThemeToggle-DHUR6cL4.mjs";
import "framer-motion";
import "lucide-react";
import "sonner";
function Privacy() {
  const { __ } = useLanguage();
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#f8f6f6] dark:bg-[#02040a] text-gray-900 dark:text-white font-sans selection:bg-primary/30 overflow-x-hidden relative transition-colors duration-500", children: [
    /* @__PURE__ */ jsx(Head, { title: `${__("Privacy Policy")} | Techy News` }),
    /* @__PURE__ */ jsx("div", { className: "fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary/8 rounded-full blur-[120px] pointer-events-none mix-blend-screen overflow-hidden" }),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("main", { className: "max-w-4xl mx-auto px-6 py-32 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "bg-white/[0.6] dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-[2.5rem] p-10 shadow-sm dark:shadow-none transition-all duration-500 relative overflow-hidden group", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400", children: __("Privacy Policy") }),
      /* @__PURE__ */ jsxs("div", { className: "prose prose-lg dark:prose-invert prose-p:font-light prose-h2:font-black prose-a:text-primary max-w-none text-gray-700 dark:text-gray-300", children: [
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: __("Last Updated: April 5, 2026") }) }),
        /* @__PURE__ */ jsx("p", { children: __("At Techy News (techynews.lat), we take your privacy very seriously. This Privacy Policy explains how we collect, use, and protect your information when you visit our website.") }),
        /* @__PURE__ */ jsxs("h2", { children: [
          "1. ",
          __("Information We Collect")
        ] }),
        /* @__PURE__ */ jsx("p", { children: __("We believe in minimal data collection. We actively track strictly necessary metrics for operational integrity and audience insights using fully private, in-house software isolated physically to our infrastructure. The data we collect includes:") }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: __("Anonymous Log Data:") }),
            " ",
            __("Pages visited, aggregated time spent, and general browser type strings.")
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: __("IP Addresses:") }),
            " ",
            __("All IP addresses are irreversibly hashed and anonymized prior to storage. We do not store raw IP addresses on our server.")
          ] })
        ] }),
        /* @__PURE__ */ jsxs("h2", { children: [
          "2. ",
          __("Cookies & Third-Party Trackers")
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          __("We pride ourselves on providing a clean reading experience."),
          " ",
          /* @__PURE__ */ jsx("strong", { children: __("We do not use tracking cookies.") }),
          " ",
          __("Furthermore, we do not integrate third-party data conglomerates (such as Facebook Pixel or cross-site programmatic Ads trackers) that might compromise your browsing behavior patterns.")
        ] }),
        /* @__PURE__ */ jsxs("h2", { children: [
          "3. ",
          __("Use of Information")
        ] }),
        /* @__PURE__ */ jsx("p", { children: __("The statistical data we collect is used strictly for internal traffic analysis, optimizing server performance, and determining which news categories are most engaging for our readership.") }),
        /* @__PURE__ */ jsxs("h2", { children: [
          "4. ",
          __("Information Security")
        ] }),
        /* @__PURE__ */ jsx("p", { children: __("Your connection to Techy News is secured utilizing standard SSL encryption. Information stored internally is safeguarded against unauthorized access. Given the extremely limited scope of our data collection (no names, account systems, or credit cards exist on the public domain interface), potential risk vectors are inherently low.") }),
        /* @__PURE__ */ jsxs("h2", { children: [
          "5. ",
          __("Changes to This Policy")
        ] }),
        /* @__PURE__ */ jsx("p", { children: __("We reserve the right to revise this Privacy Policy at our discretion. Significant modifications will be recorded within this document and the effective date will be formally updated.") }),
        /* @__PURE__ */ jsx("p", { children: __("If you have any questions or require administrative data remediation regarding this privacy policy, please contact our administrative team via email.") })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(PublicFooter, {})
  ] });
}
export {
  Privacy as default
};
