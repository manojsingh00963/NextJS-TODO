# Next.js Todo Application

A modern web application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Next.js 13.5.1 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- MongoDB integration with Mongoose
- Express.js backend server
- Modern UI components with Radix UI
- Form handling with React Hook Form
- Toast notifications with Sonner
- Date handling with date-fns
- Lucide React icons

## Prerequisites

- Node.js (LTS version recommended)
- MongoDB (for database)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Start the backend server (in a separate terminal):
   ```bash
   npm run server
   ```

The application will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start the Next.js development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run server` - Start the Express backend server

## Project Structure

```
/
├── app/              # Next.js app directory
├── components/       # React components
├── server/          # Express backend server
├── public/          # Static assets
└── styles/          # Global styles
```

## Dependencies

- Next.js 13.5.1
- React 18.2.0
- TypeScript 5.2.2
- Tailwind CSS 3.3.3
- Mongoose 8.13.2
- Express 4.21.2
- And other UI/UX libraries

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. #
