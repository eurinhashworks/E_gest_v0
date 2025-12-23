# E-commerce Management Dashboard

This is a comprehensive dashboard for managing an e-commerce business. It provides a centralized interface for tracking sales, managing products, clients, and suppliers, and viewing detailed financial reports and activity logs.

## Features

- **Dashboard Overview**: Get a quick snapshot of your business with key metrics like revenue, orders, and active clients.
- **Product Management**: Add, edit, and manage your product catalog, including stock levels and pricing.
- **Sales Tracking**: View and manage all sales orders, track their status, and see payment information.
- **Client Management**: Keep a detailed record of your clients, their purchase history, and interactions.
- **Supplier Management**: Manage your suppliers and their supply orders.
- **Financials**: Track all revenue and expenses, and view financial summaries.
- **Activity Log**: See a complete history of all user actions within the system.
- **User Management**: Manage users and their permissions.

## Project Structure

The project is a Next.js application built with TypeScript. Here's a brief overview of the key directories:

-   `app/`: Contains all the application's routes and pages.
    -   `app/(dashboard)/`: The main dashboard layout and its sub-pages (clients, products, sales, etc.).
-   `components/`: Contains all the reusable React components.
    -   `components/ui/`: Base UI components like buttons, cards, and forms.
    -   `components/*`: Feature-specific components for clients, products, etc.
-   `lib/`: Contains utility functions, authentication context, and mock data.
-   `hooks/`: Contains custom React hooks, such as `use-toast` for notifications.
-   `styles/`: Contains global CSS styles.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You will need to have Node.js and pnpm installed on your machine.

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username/your_repository.git
    ```
2.  Navigate to the project directory
    ```sh
    cd your_repository
    ```
3.  Install NPM packages
    ```sh
    pnpm install
    ```

### Running the Application

To run the application in development mode, use the following command:

```sh
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The application uses a mock authentication system. You can use any email and password to log in.

## Usage

Once you have logged in, you will be taken to the main dashboard. From there, you can navigate to the different sections of the application using the sidebar. Each section provides a table of data with options to create, edit, view, and delete records.

## Built With

-   [Next.js](https://nextjs.org/) - React Framework
-   [TypeScript](https://www.typescriptlang.org/) - Programming Language
-   [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
-   [Shadcn/ui](https://ui.shadcn.com/) - UI Components
-   [Radix UI](https://www.radix-ui.com/) - Primitives for building high-quality design systems
-   [Lucide React](https://lucide.dev/) - Icon Library