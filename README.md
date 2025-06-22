# BoxOffice Inventory Management System

This project is a simple inventory management system for BoxOffice, built with Next.js and Tailwind CSS. It allows users to manage ticket inventory, including adding, editing, cloning, and deleting listings.

## Features

- **Inventory Table**: Displays a list of ticket inventory items with various details.
- **Add/Edit Listings**: A form to add new ticket listings or edit existing ones.
- **Bulk Actions**: Select multiple items for cloning or deletion.
- **Responsive Design**: Adapts to different screen sizes.
- **Dynamic Match Details**: Date, time, and location update dynamically based on the selected match event.
- **Column Filters**: Functional filters for various columns in the inventory table.

## Planning and Implementation Details

### Global Styles and Constants
- **Global Colors**: Defined in `tailwind.config.js` under `theme.extend.colors`.
- **Global Sizes (Font Sizes & Spacing)**: Defined in `tailwind.config.js` under `theme.extend.fontSize` and `theme.extend.spacing` to ensure consistent sizing across the application.

### Sidebar Responsiveness
- The sidebar (<mcfile name="Sidebar.tsx" path="src/components/Sidebar.tsx"></mcfile>) is hidden on mobile screens and displayed on larger screens using Tailwind CSS classes (`hidden sm:flex`).

### Form Creation and Data Handling
- The form (<mcfile name="FormSection.tsx" path="src/components/FormSection.tsx"></mcfile>) is responsible for adding new inventory items.
- Form fields are dynamically populated and validated.
- Match event details (date, time, location) are updated dynamically in the form based on the selected match, pulling data from the mock API.

### Table Filtering
- The inventory table (<mcfile name="TableSection.tsx" path="src/components/TableSection.tsx"></mcfile>) includes functional filters for all columns defined in `columnKeyMap`.
- The "Ticket Type" filter checkboxes are now clickable, and the filter resets correctly.
- A `useEffect` hook in `TableSection.tsx` handles closing the filter dropdown when clicking outside.

### Dynamic Changes Based on Table Value
- The `inventory` state is managed in <mcfile name="page.tsx" path="src/app/page.tsx"></mcfile> and passed to both <mcfile name="FormSection.tsx" path="src/components/FormSection.tsx"></mcfile> and <mcfile name="TableSection.tsx" path="src/components/TableSection.tsx"></mcfile>, allowing for centralized state management and dynamic updates across components.

### Header Responsiveness
- (To be implemented/verified) Ensure the header adapts well to different screen sizes.

## Project Structure

-   `src/app/page.tsx`: The main application page, responsible for state management and assembling components.
-   `src/components/`: Contains reusable UI components:
    -   <mcfile name="FormSection.tsx" path="src/components/FormSection.tsx"></mcfile>: Handles the form for adding/editing inventory items.
    -   <mcfile name="TableSection.tsx" path="src/components/TableSection.tsx"></mcfile>: Displays the inventory table with filtering capabilities.
    -   <mcfile name="Header.tsx" path="src/components/Header.tsx"></mcfile>: Application header.
    -   <mcfile name="Sidebar.tsx" path="src/components/Sidebar.tsx"></mcfile>: Navigation sidebar.
-   `src/lib/mockApi.ts`: Provides mock API functions for data operations and defines the `InventoryItem` interface, including `matchTime` and `matchLocation`.
-   `tailwind.config.js`: Tailwind CSS configuration, including global colors, font sizes, and spacing.

## Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/boxoffice-inventory.git
    cd boxoffice-inventory
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open in your browser**:
    Open [http://localhost:3000](http://localhost:3000) with your web browser to see the result.

## Technologies Used

-   [Next.js](https://nextjs.org/)
-   [React](https://react.dev/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [React Icons](https://react-icons.github.io/react-icons/)

## License

This project is licensed under the MIT License.
