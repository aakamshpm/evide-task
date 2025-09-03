"use client";

import { useState, useEffect } from "react";
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
  const [content, setContent] = useState<ContentItem[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<ContentItem | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>("all");

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("/api/content");

      if (!response.ok) {
        throw new Error("Failed to fetch content");
      }

      const result = await response.json();
      setContent(result.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddContent = () => {
    setEditingContent(null);
    setIsFormOpen(true);
  };

  const handleEditContent = (contentItem: ContentItem) => {
    setEditingContent(contentItem);
    setIsFormOpen(true);
  };

  const handleDeleteContent = async (id: number) => {
    if (!confirm("Are you sure you want to delete this content?")) {
      return;
    }

    try {
      const response = await fetch(`/api/content?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete content");
      }

      await fetchContent();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete content");
    }
  };

  const handleFormSubmit = async (newContent: ContentItem) => {
    try {
      const method = editingContent ? "PUT" : "POST";
      const response = await fetch("/api/content", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContent),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to ${editingContent ? "update" : "create"} content`
        );
      }

      await fetchContent();
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : `Failed to ${editingContent ? "update" : "create"} content`
      );
    }
  };

  const filteredContent =
    filterType === "all"
      ? content
      : content.filter((item) => item.type === filterType);

  const filterOptions = [
    { value: "all", label: "All Content", count: content.length },
    {
      value: "text",
      label: "Text",
      count: content.filter((item) => item.type === "text").length,
    },
    {
      value: "image",
      label: "Images",
      count: content.filter((item) => item.type === "image").length,
    },
    {
      value: "video",
      label: "Videos",
      count: content.filter((item) => item.type === "video").length,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="text-red-600 mb-4">Error: {error}</div>
          <button
            onClick={fetchContent}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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

      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilterType(option.value)}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filterType === option.value
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {option.label}
              <span
                className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  filterType === option.value
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {option.count}
              </span>
            </button>
          ))}
        </div>
        {filterType !== "all" && (
          <p className="mt-2 text-sm text-gray-600">
            Showing {filteredContent.length} of {content.length} items
          </p>
        )}
      </div>

      <ContentList
        content={filteredContent}
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
