import ContentList from "@/components/ContentList";

export default function Home() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600">Manage your digital signage content</p>
      </div>

      <ContentList />
    </div>
  );
}
