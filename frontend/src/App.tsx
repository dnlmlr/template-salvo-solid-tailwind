import { Router, Routes, Route } from '@solidjs/router';
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./views/Dashboard";
import Settings from "./views/Settings";
import { Show, createSignal } from "solid-js";

function App() {
    const [showSidebar, setShowSidebar] = createSignal(true);
    const [showSidebar2, setShowSidebar2] = createSignal(true);


    function handleToggleSidebar() {
        setShowSidebar2(!showSidebar2());
        setTimeout(() =>
            setShowSidebar(!showSidebar()), 200);
    }

    return (
        <Router>
            <div class="flex flex-col min-h-screen">
                <Navbar onToggleSidebar={handleToggleSidebar} />

                <div class="flex flex-1">
                        <Sidebar showSidebar={showSidebar2()} />

                    <main class="flex-1 bg-slate-300 p-2 mx-auto">
                        <Routes>
                            <Route path="/" component={Dashboard}>
                            </Route>
                            <Route path="/settings" component={Settings}>
                            </Route>
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
}

export default App;