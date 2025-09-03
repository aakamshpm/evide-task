"use client";

import { useState } from "react";
import ContentList from "@/components/ContentList";
import ContentForm from "@/components/ContentForm";
import { Plus } from "lucide-react";

interface ContentItem {
  id: number;
  title: string;
  type: string;
  scheduledTime: string;
  content?: string;
}

export default function Home() {
  const [content, setContent] = useState<ContentItem[]>([
    {
      id: 1,
      title: "Morning Announcement",
      type: "text",
      scheduledTime: "2025-09-03 08:00 AM",
      content: "Welcome to your bus ride! Please fasten your seatbelts.",
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
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<ContentItem | null>(
    null
  );

  const handleAddContent = () => {
    setEditingContent(null);
    setIsFormOpen(true);
  };

  const handleEditContent = (contentItem: ContentItem) => {
    setEditingContent(contentItem);
    setIsFormOpen(true);
  };

  const handleDeleteContent = (id: number) => {
    if (confirm("Are you sure you want to delete this content?")) {
      setContent(content.filter((item) => item.id !== id));
    }
  };

  // To update the whole list
  const handleFormSubmit = (newContent: ContentItem) => {
    if (editingContent) {
      setContent(
        content.map((item) =>
          item.id === editingContent.id ? newContent : item
        )
      );
    } else {
      setContent([...content, newContent]);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600">Manage your digital signage content</p>
        </div>

        <button
          onClick={handleAddContent}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} className="mr-2" />
          Add Content
        </button>
      </div>

      <ContentList
        content={content}
        onEdit={handleEditContent}
        onDelete={handleDeleteContent}
      />

      <ContentForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        editingContent={editingContent}
      />
    </div>
  );
}
