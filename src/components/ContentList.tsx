import { Image, Video, FileText, File } from "lucide-react";

interface ContentItem {
  id: number;
  title: string;
  type: string;
  scheduledTime: string;
  content?: string;
}

interface ContentListProps {
  content: ContentItem[];
  onEdit: (content: ContentItem) => void;
  onDelete: (id: number) => void;
}

export default function ContentList({
  content,
  onEdit,
  onDelete,
}: ContentListProps) {
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
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Content List</h3>
        <p className="mt-1 text-sm text-gray-500">
          Manage your digital signage content and schedules
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Content Title
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                Type
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                Scheduled Time
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {content.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onEdit(item)}
              >
                <td className="px-4 sm:px-6 py-4">
                  <div className="flex items-center">
                    <div className="mr-3 flex-shrink-0">
                      {getTypeIcon(item.type)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-sm font-medium text-gray-900 block">
                        {item.title}
                      </span>
                      <span
                        className={getTypeBadge(item.type) + " mt-1 sm:hidden"}
                      >
                        {item.type}
                      </span>
                      <span className="text-xs text-gray-500 block sm:hidden mt-1">
                        {item.scheduledTime}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                  <span className={getTypeBadge(item.type)}>{item.type}</span>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                  {item.scheduledTime}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(item.id);
                    }}
                    className="text-red-600 hover:text-red-900 cursor-pointer"
                  >
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
