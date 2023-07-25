import { Icon } from "solid-heroicons";
import InputField from "./InputField";
import { userCircle, bars_3 } from "solid-heroicons/solid";
import { A } from '@solidjs/router';

type NavbarProps = {
    onToggleSidebar?: () => void;
}

function Navbar(props: NavbarProps) {
    return (
        <nav class="flex items-center justify-between px-4 py-2 bg-sky-700 h-12 space-x-4">
            <div class="flex flex-row space-x-4 items-center">
                <button onClick={props.onToggleSidebar}>
                    <Icon path={bars_3} class="text-gray-100 h-6"></Icon>
                </button>

                <div class="hidden sm:block">
                    <h6 class="text-2xl font-bold text-gray-100">Project</h6>
                </div>
            </div>

            <InputField placeholder="Search" class="flex-1 h-8 md:max-w-md" />

            <A
                href="/settings"
                class="flex items-center md:space-x-4 text-gray-100"
            >
                <span class="hidden md:block">Username</span>
                <Icon path={userCircle} class="text-gray-100 h-6"></Icon>
            </A>
        </nav>
    );
}

export default Navbar;