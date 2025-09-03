"use client";

import { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";

interface ContentItem {
  id: number;
  title: string;
  type: string;
  scheduledTime: string;
  content?: string;
}

interface ContentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: ContentItem) => void;
  editingContent?: ContentItem | null;
}

export default function ContentForm({
  isOpen,
  onClose,
  onSubmit,
  editingContent,
}: ContentFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    type: "text",
    content: "",
    file: null as File | null,
    scheduleDate: "",
    scheduleTime: "",
    scheduledTime: "",
  });

  const [isDirty, setIsDirty] = useState(false);

  // Reset form when modal opens/closes or editing content changes
  useEffect(() => {
    if (editingContent) {
      const [date, time] = editingContent.scheduledTime.split(" ");

      setFormData({
        title: editingContent.title,
        type: editingContent.type,
        content: editingContent.content || "",
        file: null,
        scheduleDate: date || "",
        scheduleTime: time || "",
        scheduledTime: editingContent.scheduledTime,
      });
    } else {
      setFormData({
        title: "",
        type: "text",
        content: "",
        file: null,
        scheduleDate: "",
        scheduleTime: "",
        scheduledTime: "",
      });
    }
    setIsDirty(false);
  }, [editingContent, isOpen]);

  useEffect(() => {
    if (editingContent) {
      const hasChanged =
        formData.title !== editingContent.title ||
        formData.type !== editingContent.type ||
        formData.content !== (editingContent.content || "") ||
        formData.scheduleDate !==
          (editingContent.scheduledTime.split(" ")[0] || "") ||
        formData.scheduleTime !==
          (editingContent.scheduledTime.split(" ")[1] || "");
      setIsDirty(hasChanged);
    } else {
      setIsDirty(
        formData.title !== "" ||
          formData.content !== "" ||
          formData.scheduleDate !== "" ||
          formData.scheduleTime !== ""
      );
    }
  }, [formData, editingContent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Combine date and time
    const combinedDateTime =
      formData.scheduleDate && formData.scheduleTime
        ? `${formData.scheduleDate} ${formData.scheduleTime}`
        : formData.scheduledTime;

    const newContent: ContentItem = {
      id: editingContent?.id || Date.now(),
      title: formData.title,
      type: formData.type,
      scheduledTime: combinedDateTime,
      content: formData.type === "text" ? formData.content : undefined,
    };

    onSubmit(newContent);

    setFormData({
      title: "",
      type: "text",
      content: "",
      file: null,
      scheduleDate: "",
      scheduleTime: "",
      scheduledTime: "",
    });
    setIsDirty(false);
    onClose();
  };

  const handleClose = () => {
    if (isDirty) {
      if (
        confirm("You have unsaved changes. Are you sure you want to close?")
      ) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b">
          <h3 className="text-lg font-medium">
            {editingContent ? "Edit Content" : "Add New Content"}
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter content title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="text">Text</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </div>

          {formData.type === "text" ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                required
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Enter text content"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload File
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <input
                  type="file"
                  accept={formData.type === "image" ? "image/*" : "video/*"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      file: e.target.files?.[0] || null,
                    })
                  }
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer text-blue-600 hover:text-blue-800 text-sm"
                >
                  Choose {formData.type} file
                </label>
                {formData.file && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected: {formData.file.name}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Schedule Date
              </label>
              <input
                type="date"
                required
                value={formData.scheduleDate}
                onChange={(e) =>
                  setFormData({ ...formData, scheduleDate: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Schedule Time
              </label>
              <input
                type="time"
                required
                value={formData.scheduleTime}
                onChange={(e) =>
                  setFormData({ ...formData, scheduleTime: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer order-2 sm:order-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isDirty && !!editingContent}
              className={`px-4 py-2 rounded-md order-1 sm:order-2 ${
                isDirty || !editingContent
                  ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {editingContent ? "Save Changes" : "Add Content"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
