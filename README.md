# Digital Signage Dashboard

A content management dashboard built with Next.js for managing digital signage content on buses. This project was developed as a technical assignment for Evide.

## Steps to Run

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Features Implemented

### Core Features

- Dashboard page with sidebar and header navigation
- Content List displaying content title, type (image/video/text), and scheduled time
- Add Content Form with file upload interface for images/videos and text input
- Mock API route at /api/content for content management
- File uploads are simulated (UI only) as actual file storage requires persistent storage solutions
- Content stored in memory with JSON responses

### Bonus Features

- Edit existing content functionality
- Delete content with confirmation
- Filter content by type (image/video/text)
- Responsive design for mobile and desktop devices
- Form validation

## Technical Implementation

- Built with Next.js 15.5.2 using App Router
- Tailwind CSS for styling
- Lucide React for icons
- RESTful API endpoints with full CRUD operations
