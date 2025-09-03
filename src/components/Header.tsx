export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-gray-900">
          Digital Signage Dashboard
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">Admin User</span>
      </div>
    </header>
  );
}
