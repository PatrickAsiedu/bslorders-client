# BSLOrders

## Description

BSLOrders is a modern web application for managing lunch orders at Broadspectrum Ltd. Built with React, Redux, and Tailwind CSS, it provides a seamless experience for users, chefs, and administrators to place, manage, and review daily food and drink orders.

## Motivation

At Broadspectrum, where all employees are entitled to lunch, the use of Microsoft Forms for order placement resulted in tampered orders, increased company costs, and added complexity for chefs. BSLOrders is an authenticated web-based application designed to reduce company costs by preventing unauthorized orders, ensuring order accuracy for employees, and simplifying the process for chefs, thereby improving efficiency and user experience.

## Quick Start

### Visit the Live Demo OR Skip to Installation Guide

You can access the live demo version of BSLOrders here:  
[https://bslorders-client.vercel.app](https://bslorders-client.vercel.app/)

### Installation Guide

### Clone repository

```bash
git clone https://github.com/PatrickAsiedu/bslorders-client.git
cd bslorders-client
```

```sh
npm install
```

### Start Development Server

```sh
npm start
```

### Setup Server

You can find the backend/server code here:  
[https://github.com/PatrickAsiedu/bslorders-server](https://github.com/PatrickAsiedu/bslorders-server)

## Usage

### Features

- **User Dashboard:** Place lunch orders, view order history, and manage account details.
- **Chef Dashboard:** View daily orders, manage menus, add/edit foods and drinks.
- **Admin Dashboard:** Approve user signups, reset passwords, manage users, and view order summaries.
- **Responsive UI:** Optimized for desktop and mobile devices.
- **Role-Based Access:** Separate interfaces for users, chefs, and admins.
- **CSV Export:** Download order summaries for reporting.
- **Notifications:** Real-time feedback for actions and approvals.

### Tech Stack

- **React** for UI
- **Redux** for state management ([src/redux](src/redux))
- **Tailwind CSS** for styling ([tailwind.config.js](tailwind.config.js))
- **Axios** for API requests ([src/network/api.js](src/network/api.js))
- **SweetAlert2** for notifications ([src/utils/util-functions.js](src/utils/util-functions.js))

### Project Structure

- `src/` - Main source code
  - `components/` - Reusable UI components
  - `pages/` - Application pages (User, Chef, Admin)
  - `redux/` - State management
  - `network/` - API configuration
  - `utils/` - Utility functions
  - `assets/` - Images and static assets
- `public/` - Static files and HTML template
- `build/` - Production build output
