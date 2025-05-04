# ShopApp - Advanced React Native E-commerce Application

![ShopApp Banner](./screenshots/banner.png)

A comprehensive, feature-rich e-commerce mobile application built with React Native, Redux, and TypeScript. This application demonstrates advanced mobile development concepts including complex navigation, state management, authentication flows, theming, and more.

## ✨ Features

### User Experience
- **Onboarding Flow**: Smooth introduction for first-time users
- **Authentication**: Complete login, registration, and password recovery
- **Product Browsing**: Categories, featured products, new arrivals, and best sellers
- **Product Details**: Comprehensive product information with variants (colors, sizes)
- **Shopping Cart**: Add, remove, and update quantities with persistent storage
- **Checkout Process**: Multi-step checkout with address and payment selection
- **Order Management**: View order history and track current orders
- **User Profile**: Edit profile information, manage addresses and payment methods
- **Theme Support**: Dynamic light and dark mode with system preference detection

### Technical Features
- **Advanced Navigation**: Nested stack and tab navigation
- **State Management**: Redux Toolkit for global state, Context API for specific features
- **Form Handling**: Formik with Yup validation
- **API Integration**: Axios with interceptors for token management
- **Data Persistence**: AsyncStorage and Redux Persist
- **Animations**: React Native Reanimated for smooth UI interactions
- **Toast Notifications**: Custom toast system for user feedback
- **Theming System**: Dynamic theme switching with persistence

## 🛠️ Technical Architecture

### State Management
- **Redux Toolkit**: Global state management for products, categories, wishlist, orders, and addresses
- **Context API**: Theme, authentication, and cart management
- **AsyncStorage**: Persistent storage for user preferences and authentication tokens

### Navigation
- **React Navigation 6**: Latest navigation library with native stack and bottom tabs
- **Navigation Structure**:
  - Authentication flow (Login, Register, Forgot Password)
  - Main app flow with bottom tabs (Home, Explore, Cart, Profile)
  - Nested stack navigators for each tab section

### Styling and UI
- **Dynamic Theming**: Complete light and dark mode support
- **Responsive Design**: Adapts to different screen sizes
- **Custom Components**: Reusable UI components for consistent design

## 📱 Screenshots

<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
  <img src="./screenshots/onboarding.png" width="200" alt="Onboarding Screen" />
  <img src="./screenshots/login.png" width="200" alt="Login Screen" />
  <img src="./screenshots/home.png" width="200" alt="Home Screen" />
  <img src="./screenshots/product-details.png" width="200" alt="Product Details" />
  <img src="./screenshots/cart.png" width="200" alt="Shopping Cart" />
  <img src="./screenshots/checkout.png" width="200" alt="Checkout Process" />
  <img src="./screenshots/profile.png" width="200" alt="User Profile" />
  <img src="./screenshots/dark-mode.png" width="200" alt="Dark Mode" />
</div>

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or newer)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/)
- [Expo Go](https://expo.dev/client) app on your iOS or Android device (for testing)

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/nxr-deen/shop-app.git
cd shopapp
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Start the development server:
\`\`\`bash
npx expo start
# or
yarn expo start
\`\`\`

4. Run on a device or emulator:
   - Scan the QR code with the Expo Go app on your phone
   - Press 'a' to run on an Android emulator
   - Press 'i' to run on an iOS simulator

### Environment Setup

Create a `.env` file in the root directory with the following variables:
\`\`\`
API_URL=https://your-api-url.com
\`\`\`

## 📂 Project Structure

\`\`\`
shopapp/
├── App.tsx                # Main application component
├── src/
│   ├── components/        # Reusable UI components
│   ├── contexts/          # React Context providers
│   │   ├── AuthContext.tsx
│   │   ├── CartContext.tsx
│   │   └── ThemeContext.tsx
│   ├── navigation/        # Navigation configuration
│   │   ├── RootNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   ├── MainNavigator.tsx
│   │   └── stacks/        # Stack navigators for each section
│   ├── screens/           # Application screens
│   │   ├── auth/          # Authentication screens
│   │   ├── main/          # Main app screens
│   │   ├── SplashScreen.tsx
│   │   └── OnboardingScreen.tsx
│   ├── services/          # API and other services
│   │   └── api.ts
│   ├── store/             # Redux store configuration
│   │   ├── index.ts
│   │   └── slices/        # Redux slices
│   ├── theme/             # Theme definitions
│   │   └── index.ts
│   └── types/             # TypeScript type definitions
│       └── index.ts
├── assets/                # Images, fonts, etc.
├── app.json               # Expo configuration
└── package.json           # Project dependencies
\`\`\`

## 🔄 State Management

### Redux Store Structure

- **Products Slice**: Manages product data, featured items, new arrivals, and best sellers
- **Categories Slice**: Manages category data
- **Wishlist Slice**: Manages user's wishlist items
- **Orders Slice**: Manages order history and current orders
- **Addresses Slice**: Manages user's saved addresses

### Context API Usage

- **AuthContext**: Manages user authentication state and methods
- **ThemeContext**: Manages theme preferences and switching
- **CartContext**: Manages shopping cart state and operations

## 🧪 Testing

### Running Tests

\`\`\`bash
npm test
# or
yarn test
\`\`\`

## 📦 Building for Production

### Expo Build

\`\`\`bash
expo build:android
# or
expo build:ios
\`\`\`

### EAS Build (Recommended)

\`\`\`bash
eas build --platform android
# or
eas build --platform ios
\`\`\`

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your Changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the Branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Navigation](https://reactnavigation.org/)
- [Formik](https://formik.org/)
- [Yup](https://github.com/jquense/yup)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)

## 📞 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - email@example.com

Project Link: [https://github.com/yourusername/shopapp](https://github.com/yourusername/shopapp)
\`\`\`
