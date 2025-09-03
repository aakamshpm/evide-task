export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-sm min-h-screen">
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
        </div>

        <nav>
          <ul className="space-y-2">
            <li>
              <div className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg font-medium">
                Dashboard
              </div>
            </li>
            <li>
              <div className="flex items-center px-4 py-2 text-gray-400 rounded-lg">
                Content Library
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
