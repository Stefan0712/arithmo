import { Check } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { Link } from "react-router-dom";

const Menu = () => {

    const {toggleTheme} = useTheme();
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme") ?? 'light');

    const handleChangeTheme = (theme: string) =>{
        toggleTheme();
        setCurrentTheme(theme)
    }
    return (
        <div className="w-full h-full flex flex-col gap-4 p-4">
            <h2 className="text-muted font-bold text-xl">Settings</h2>
            <b className="text-muted font-bold">Theme</b>
            <div className="w-full rounded-xl bg-surface flex flex-col">
                <button onClick={()=>handleChangeTheme('light')} className="text-muted h-[50px] w-full grid grid-cols-[1fr_30px] items-center px-2">
                    <p className="text-start">Light</p>
                    {currentTheme === 'light' ? <Check /> : null}
                </button>
                <button onClick={()=>handleChangeTheme('dark')} className="text-muted h-[50px] w-full items-center px-2 grid grid-cols-[1fr_30px]">
                    <p className="text-start">Dark</p>
                    {currentTheme === 'dark' ? <Check /> : null}
                </button>
            </div>
            <b className="text-muted font-bold">History</b>
            <div className="w-full rounded-xl bg-surface flex flex-col">
                <Link to={'/history'} className="text-muted h-[50px] w-full grid grid-cols-[1fr_30px] items-center px-2">
                    <p className="text-start">Games History</p>
                </Link>
                <button className="text-muted h-[50px] w-full items-center px-2 grid grid-cols-[1fr_30px]">
                    <p className="text-start">My Stats</p>
                </button>
            </div>
        </div>
    )
}

export default Menu;