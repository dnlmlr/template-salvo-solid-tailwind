
type SidebarProps = {
    showSidebar: boolean;
}

function Sidebar(props: SidebarProps) {
    const showSidebar = () => props.showSidebar ? "" : "-ml-[16rem]";
    return (
        <div id="sidebar" class={`bg-slate-500 w-64 flex-0 transition-all ${showSidebar()}`}>
            <ul class="py-4 px-4 space-y-4 text-lg font-semibold text-gray-100">
                <li class="">ajdhjkd</li>
                <li>ajdhjkd</li>
                <li>ajdhjkd</li>
                <li>ajdhjkd</li>
                <li>ajdhjkd</li>
            </ul>
        </div >
    );
}

export default Sidebar;