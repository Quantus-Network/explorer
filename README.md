# Quantus Block Explorer

A modern, feature-rich blockchain explorer for the Quantus Network built with React.js 19 + Tanstack Router, TypeScript, and GraphQL. Explore transactions, blocks, and accounts with real-time data visualization and an intuitive user interface.

![Quantus Explorer](./public/logo.png)

## 🚀 Features

### Core Functionality

- **🔍 Universal Search** - Search across transactions, blocks, and accounts with intelligent auto-complete
- **📊 Real-time Data** - Live blockchain statistics and recent activity updates
- **📱 Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **🌙 Dark/Light Theme** - Toggle between themes with system preference support
- **⚡ Fast Performance** - Server-side rendering with Next.js 14 App Router

### Data Views

- **💰 Transactions** - Browse all network transactions with detailed information
- **🧱 Blocks** - Explore block data including height, hash, and timestamp
- **👤 Accounts** - View account balances and transaction history
- **📈 Chain Statistics** - Network metrics and activity summaries

### Technical Features

- **Type-Safe GraphQL** - Automated code generation for GraphQL queries
- **Modern UI Components** - Built with Radix UI primitives and Tailwind CSS
- **Accessibility First** - WCAG compliant components and keyboard navigation

## 🛠️ Technology Stack

### Frontend

- **React.js 19** - The library for web user interfaces
- **Tanstack Router** - Modern and scalable router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons

### Data & API

- **Apollo Client** - GraphQL client with caching
- **GraphQL Code Generator** - Type-safe GraphQL operations
- **Date-fns** - Date manipulation utilities

### Development Tools

- **Storybook** - Component development environment
- **Jest** - Testing framework
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks

## 📋 Prerequisites

- **Node.js** 18.x or higher
- **Yarn** 1.22.x or higher
- **Git** for version control

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Quantus-Network/explorer.git
cd explorer
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Required
VITE_SITE_URL=http://localhost:3100

# Optional
ANALYZE=false
```

### 4. Generate GraphQL Types

```bash
bun gql:compile
```

### 5. Start Development Server

```bash
bun dev
```

Visit [http://localhost:3100](http://localhost:3100) to see the application.

## 📁 Project Structure

```
quantus-block-explorer/
├── src/
│   ├── __generated__/         # Auto-generated GraphQL types
│   ├── api/                   # GraphQL queries and mutations
│   ├── app/                   # Next.js App Router pages
│   │   ├── accounts/          # Account pages
│   │   ├── blocks/            # Block pages
│   │   ├── transactions/      # Transaction pages
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── features/          # Feature-specific components
│   │   ├── layout/            # Layout components
│   │   └── ui/                # Reusable UI components
│   ├── config/                # Configuration files
│   ├── constants/             # Application constants
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility libraries
│   ├── schemas/               # TypeScript schemas
│   ├── types/                 # Type definitions
│   └── utils/                 # Utility functions
├── public/                    # Static assets
├── .storybook/                # Storybook configuration
├── .github/                   # GitHub workflows
└── package.json
```

## 🔧 Development Scripts

| Command           | Description               |
| ----------------- | ------------------------- |
| `bun dev`         | Start development server  |
| `bun run build`   | Build for production      |
| `bun start`       | Start production server   |
| `bun lint`        | Run ESLint                |
| `bun test`        | Run tests                 |
| `bun format`      | Format code with Prettier |
| `bun storybook`   | Start Storybook           |
| `bun gql:compile` | Generate GraphQL types    |

## 🧪 Testing

### Unit Tests

```bash
bun test
```

### Storybook Tests

```bash
bun storybook
bun test-storybook:ci
```

## 🎨 Component Development

We use Storybook for component development and testing:

```bash
bun storybook
```

Components are organized by feature and include:

- Stories for different states
- Accessibility testing
- Visual regression testing

## 📊 GraphQL Integration

The project uses Apollo Client for GraphQL integration with automatic code generation:

### Adding New Queries

1. Create query in `src/api/`
2. Run `bun gql:compile` to generate types
3. Import and use in components

### Example Query Structure

```typescript
export const exampleQuery = {
  useGetData: (config?: QueryHookOptions) => {
    const GET_DATA = gql`
      query GetData($id: String!) {
        data(id: $id) {
          id
          name
        }
      }
    `;

    return useQuery<DataResponse>(GET_DATA, config);
  }
};
```

## 🎯 Performance Optimization

- **CSR** - Client-side rendering for smooth and fast interactions
- **Code Splitting** - Automatic code splitting with Vite.js
- **Bundle Analysis** - Use `ANALYZE=true bun run build` to analyze bundle size

## 🔐 Environment Variables

| Variable           | Description            | Required |
| ------------------ | ---------------------- | -------- |
| `VITE_SITE_URL`    | Site base URL          | Yes      |
| `VITE_GRAPHQL_URL` | GraphQL API endpoint   | Yes      |
| `ANALYZE`          | Enable bundle analyzer | No       |

## 🚀 Deployment

### Manual Deployment

```bash
bun run build
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests and linting**
   ```bash
   bun test
   bun lint
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Code Style

- Use TypeScript for all new code
- Follow the existing naming conventions
- Add tests for new features
- Update documentation as needed

## 📝 Code Quality

This project maintains high code quality through:

- **ESLint** - Airbnb configuration with TypeScript support
- **Prettier** - Consistent code formatting
- **Husky** - Pre-commit hooks for quality checks
- **TypeScript** - Type safety throughout the codebase

## 🐛 Troubleshooting

### Common Issues

**GraphQL Types Not Generated**

```bash
bun gql:compile
```

**Development Server Won't Start**

```bash
bun clean
bun dev
```

### Getting Help

- Check the [Issues](https://github.com/Quantus-Network/explorer/issues) page
- Create a new issue with detailed information

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React.js](https://react.dev/) - The library for web and native user interfaces
- [Tanstack Router](https://tanstack.com/router/latest) - Modern and scalable routing for React and Solid applications
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Radix UI](https://radix-ui.com/) - Accessible components
- [Apollo Client](https://apollographql.com/) - GraphQL client
- [Quantus Network](https://quantus.com/) - The blockchain network

---

**Built with ❤️ by the Quantus Team**

For more information, visit our [website](https://quantus.com/)
