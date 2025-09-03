import { NextRequest, NextResponse } from "next/server";

interface ContentItem {
  id: number;
  title: string;
  type: string;
  scheduledTime: string;
  content?: string;
}

let mockContent: ContentItem[] = [
  {
    id: 1,
    title: "Morning Announcement",
    type: "text",
    scheduledTime: "2025-09-03 08:00",
    content: "Welcome to your bus ride! Please fasten your seatbelts.",
  },
  {
    id: 2,
    title: "Route Update Video",
    type: "video",
    scheduledTime: "2025-09-03 10:30",
  },
  {
    id: 3,
    title: "Safety Poster",
    type: "image",
    scheduledTime: "2025-09-03 12:00",
  },
];

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: mockContent,
      count: mockContent.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch content" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title || !body.type || !body.scheduledTime) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newContent: ContentItem = {
      id: Date.now(),
      title: body.title,
      type: body.type,
      scheduledTime: body.scheduledTime,
      content: body.type === "text" ? body.content : undefined,
    };

    mockContent.push(newContent);

    return NextResponse.json({
      success: true,
      data: newContent,
      message: "Content created successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create content" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Content ID is required" },
        { status: 400 }
      );
    }

    const contentId = parseInt(id);
    const initialLength = mockContent.length;
    mockContent = mockContent.filter((item) => item.id !== contentId);

    if (mockContent.length === initialLength) {
      return NextResponse.json(
        { success: false, error: "Content not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Content deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete content" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        { success: false, error: "Content ID is required" },
        { status: 400 }
      );
    }

    const contentIndex = mockContent.findIndex((item) => item.id === body.id);

    if (contentIndex === -1) {
      return NextResponse.json(
        { success: false, error: "Content not found" },
        { status: 404 }
      );
    }

    const updatedContent: ContentItem = {
      ...mockContent[contentIndex],
      title: body.title || mockContent[contentIndex].title,
      type: body.type || mockContent[contentIndex].type,
      scheduledTime:
        body.scheduledTime || mockContent[contentIndex].scheduledTime,
      content:
        body.type === "text" ? body.content : mockContent[contentIndex].content,
    };

    mockContent[contentIndex] = updatedContent;

    return NextResponse.json({
      success: true,
      data: updatedContent,
      message: "Content updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update content" },
      { status: 500 }
    );
  }
}
