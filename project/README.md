# SE Bakers - Multi-Branch Management System

A comprehensive bakery management system with Super Admin and Branch Admin roles, supporting multiple branches (Jaffna and Colombo).

## Features

### 🔐 Authentication System
- **Login Page**: Beautiful, modern login interface for Super Admin
- **Role-Based Access**: Different interfaces for Super Admin and Branch Admin
- **Secure Logout**: User session management with logout functionality

### 👑 Super Admin Features
- **Combined Dashboard**: View aggregated data from all branches
- **Branch Selection**: Switch between Combined, Jaffna, and Colombo views
- **Multi-Branch Analytics**: 
  - Combined sales performance
  - Branch comparison charts
  - Unified inventory alerts
  - Cross-branch order tracking

### 🏢 Branch Admin Features
- **Branch-Specific Views**: Dedicated dashboards for Jaffna and Colombo
- **Local Management**: Manage products, orders, customers, and staff
- **Branch Analytics**: Local performance metrics and reports

### 📊 Dashboard Features
- **Real-time Metrics**: Sales, orders, customers, and inventory alerts
- **Interactive Charts**: Sales trends, product performance, and branch comparisons
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd project
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173`

## Usage

### Super Admin Login
1. Access the login page
2. Enter any username and password (demo mode)
3. You'll be redirected to the Super Admin dashboard
4. Use the branch selector to switch between:
   - **Combined**: View aggregated data from all branches
   - **Jaffna**: View Jaffna branch-specific data
   - **Colombo**: View Colombo branch-specific data

### Demo Credentials
- **Username**: admin (or any username)
- **Password**: admin123 (or any password)
- **Note**: This is a demo system - any credentials will work

## Project Structure

```
project/
├── src/
│   ├── admin/
│   │   └── SuperAdminDashboard.jsx    # Super Admin combined dashboard
│   ├── branches/
│   │   ├── jaffna/                    # Jaffna branch components
│   │   └── colombo/                   # Colombo branch components
│   ├── components/
│   │   ├── auth/
│   │   │   └── LoginPage.jsx          # Authentication component
│   │   ├── layout/
│   │   │   ├── Header.jsx             # Header with user info
│   │   │   └── Sidebar.jsx            # Navigation sidebar
│   │   └── ui/                        # Reusable UI components
│   ├── App.jsx                        # Main application component
│   └── main.jsx                       # Application entry point
```

## Key Components

### LoginPage.jsx
- Modern, responsive login interface
- Form validation and error handling
- Loading states and user feedback

### SuperAdminDashboard.jsx
- Combined metrics from both branches
- Interactive charts and analytics
- Branch performance comparison
- Unified inventory and order management

### Sidebar.jsx
- Role-based navigation
- Branch selection for Super Admin
- Dynamic menu items based on user role

### Header.jsx
- User information display
- Role indicators (Super Admin/Branch Admin)
- Logout functionality

## Technologies Used

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible UI primitives
- **Lucide React**: Beautiful icons
- **Recharts**: Interactive charts and data visualization
- **Class Variance Authority**: Type-safe component variants

## Features in Detail

### Combined Dashboard (Super Admin)
- **Total Sales**: Aggregated sales from all branches
- **Branch Performance**: Side-by-side comparison charts
- **Top Products**: Best-selling items across branches
- **Low Stock Alerts**: Unified inventory warnings
- **Recent Orders**: Latest orders from all branches

### Branch-Specific Views
- **Jaffna Branch**: Orange-themed interface
- **Colombo Branch**: Blue-themed interface
- **Local Metrics**: Branch-specific analytics
- **Local Management**: Products, orders, customers, staff

## Future Enhancements

- [ ] Backend integration with real authentication
- [ ] Database connectivity for persistent data
- [ ] Real-time notifications
- [ ] Advanced reporting and analytics
- [ ] User management and permissions
- [ ] Inventory tracking and alerts
- [ ] Order processing workflow
- [ ] Customer relationship management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

---

**SE Bakers** - Bringing fresh baked goods to Sri Lanka since 2024 🧁 