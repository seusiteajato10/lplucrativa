# AI Rules for Lovable App

This document outlines the core technologies used in this project and provides guidelines for using specific libraries and tools.

## Tech Stack Overview

*   **Frontend Framework**: React (with Vite for fast development)
*   **Language**: TypeScript
*   **Routing**: React Router DOM
*   **UI Components**: shadcn/ui (built on Radix UI primitives, styled with Tailwind CSS)
*   **Styling**: Tailwind CSS
*   **Icons**: Lucide React
*   **Backend/Database/Authentication**: Supabase (using `@supabase/supabase-js`)
*   **Data Fetching & Caching**: React Query (`@tanstack/react-query`)
*   **Form Management**: React Hook Form (with Zod for schema validation)
*   **Notifications**: Sonner (for simple, modern toasts)
*   **SEO Management**: React Helmet Async
*   **Date Utilities**: date-fns

## Library Usage Rules

To maintain consistency and efficiency, please adhere to the following rules when developing:

*   **UI Components**: Always prioritize `shadcn/ui` components for building the user interface. If a required component is not available in `shadcn/ui`, create a new, small component following `shadcn/ui`'s styling and structure principles. Do NOT modify existing `shadcn/ui` component files directly.
*   **Styling**: All styling must be done using **Tailwind CSS** utility classes. Avoid inline styles or custom CSS files unless absolutely necessary for complex, unique scenarios not covered by Tailwind.
*   **Icons**: Use icons from the `lucide-react` library.
*   **State Management (Server-side)**: For all data fetching, caching, and synchronization with the server, use **React Query (`@tanstack/react-query`)**.
*   **State Management (Client-side)**: For global client-side state, leverage **React Context API**. Avoid Redux or other complex state management libraries unless explicitly required for very specific, large-scale state needs.
*   **Routing**: Use `react-router-dom` for all navigation and routing within the application. Keep routes defined in `src/App.tsx`.
*   **Forms**: Implement forms using **React Hook Form** for state management and validation. Use **Zod** for defining form schemas and validation rules.
*   **Toasts/Notifications**: For user feedback and notifications, use **Sonner**. It provides a simple and elegant way to display toasts.
*   **Date Manipulation**: For any date formatting, parsing, or manipulation, use `date-fns`.
*   **Database & Authentication**: All interactions with the backend (database queries, authentication, storage) must be done through the **Supabase client (`@supabase/supabase-js`)** located at `src/integrations/supabase/client.ts`.
*   **SEO**: Manage document head tags (title, meta descriptions) using `react-helmet-async`.