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
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                My GPTs
            </button>
            <button onClick={Logout}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                Logout
            </button>
        </div>
    )
}