import { Link, useLocation } from "react-router-dom";

const Layout = ({ children }) => {
    const location = useLocation();

    const navItems = [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Tickets", path: "/tickets" },
        { name: "SLA Management", path: "/sla" },
    ];

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col shadow-2xl">
                <div className="p-6 border-b border-slate-700">
                    <h1 className="text-2xl font-bold tracking-tight text-blue-400">HelpDesk Pro</h1>
                    <p className="text-xs text-slate-400 mt-1">Real-time Support System</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 font-medium ${isActive
                                        ? "bg-blue-600 text-white shadow-lg translate-x-1"
                                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-700">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold">A</div>
                        <div>
                            <p className="text-sm font-semibold">Admin User</p>
                            <p className="text-xs text-slate-400">Online</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
                    <h2 className="text-xl font-bold text-slate-800 capitalize">
                        {location.pathname.replace('/', '') || 'Dashboard'}
                    </h2>
                    <button className="md:hidden p-2 text-slate-600">Menu</button>
                </header>

                <div className="p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
