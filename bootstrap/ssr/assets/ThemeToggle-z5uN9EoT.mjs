import React from "react";
import { usePage } from "@inertiajs/react";
import { jsx } from "react/jsx-runtime";
import { Moon, Sun } from "lucide-react";
//#region resources/js/Hooks/useLanguage.js
function useLanguage() {
	const { translations, locale } = usePage().props;
	/**
	* Translate a given key.
	* If the key is not found in the translations, return the key itself.
	*/
	const __ = (key) => {
		return translations?.[key] || key;
	};
	return {
		__,
		locale
	};
}
//#endregion
//#region resources/js/Components/ThemeToggle.jsx
var ThemeToggle = () => {
	const [isDark, setIsDark] = React.useState(false);
	React.useEffect(() => {
		setIsDark(document.documentElement.classList.contains("dark"));
	}, []);
	const toggleTheme = () => {
		const newTheme = !isDark ? "dark" : "light";
		setIsDark(!isDark);
		if (newTheme === "dark") {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	};
	return /* @__PURE__ */ jsx("button", {
		onClick: toggleTheme,
		className: "p-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors",
		title: isDark ? "Switch to Light Mode" : "Switch to Dark Mode",
		children: isDark ? /* @__PURE__ */ jsx(Sun, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(Moon, { className: "w-5 h-5" })
	});
};
//#endregion
export { useLanguage as n, ThemeToggle as t };
