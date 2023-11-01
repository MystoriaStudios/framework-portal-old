import {useEffect, useState} from "react";
import {useUser} from "@clerk/nextjs";

function useDarkMode() {
    const user = useUser()
    const [theme, setTheme] = useState(user.user?.publicMetadata["theme"]?.toString() || "dark");
    const colorTheme = theme === "dark" ? "light" : "dark";

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove(colorTheme);
        root.classList.add(theme);
        // @ts-ignore
        root.setAttribute("data-theme", theme)

        if (window !== undefined) {
            localStorage.setItem("theme", theme);
            if (user.isSignedIn) {
                user.user.publicMetadata["theme"] = theme
            }
        }
    }, [theme]);

    return [colorTheme, setTheme];
}

export default useDarkMode;