import { Image, Video, FileText, File } from "lucide-react";

const mockContent = [
  {
    id: 1,
    title: "Morning Announcement",
    type: "text",
    scheduledTime: "2025-09-03 08:00 AM",
  },
  {
    id: 2,
    title: "Route Update Video",
    type: "video",
    scheduledTime: "2025-09-03 10:30 AM",
  },
  {
    id: 3,
    title: "Safety Poster",
    type: "image",
    scheduledTime: "2025-09-03 12:00 PM",
  },
];

export default function ContentList() {
  const getTypeIcon = (type: string) => {
    const iconProps = { size: 16, className: "text-gray-500" };

    switch (type) {
      case "image":
        return <Image {...iconProps} className="text-blue-500" />;
      case "video":
        return <Video {...iconProps} className="text-purple-500" />;
      case "text":
        return <FileText {...iconProps} className="text-green-500" />;
      default:
        return <File {...iconProps} />;
    }
  };

  const getTypeBadge = (type: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (type) {
      case "image":
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case "video":
        return `${baseClasses} bg-purple-100 text-purple-800`;
      case "text":
        return `${baseClasses} bg-green-100 text-green-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Content List</h3>
        <p className="mt-1 text-sm text-gray-500">
          Manage your digital signage content and schedules
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Content Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Scheduled Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockContent.map((content) => (
              <tr key={content.id} className="hover:bg-gray-50 cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="mr-3 flex-shrink-0">
                      {getTypeIcon(content.type)}
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {content.title}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={getTypeBadge(content.type)}>
                    {content.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {content.scheduledTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3 cursor-pointer">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-900 cursor-pointer">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
