import { redirect } from "next/navigation"
import { logout } from "../utils/action"
import { useRouter } from "next/navigation"

export default function Settings() {
    const router = useRouter();

    const Logout = async () => {
        await logout()
        router.push('/login');
    }
    return (
        <div id="settings-popup" className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 dark:bg-gray-800">
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors duration-200">
                My GPTs
            </button>
            <button
                onClick={Logout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700 transition-colors duration-200"
            >
                Logout
            </button>
        </div>
    )
}