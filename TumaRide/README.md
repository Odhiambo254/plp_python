# TumaRide - Smart Logistics for Kenya 🚗📦

**TumaRide** is a revolutionary logistics platform that connects travelers with senders, enabling efficient and affordable delivery services across Kenya. Travelers can earn money by delivering parcels along their existing routes, while senders get cost-effective shipping solutions.

## 🎯 Features

### For Senders 📦
- **Easy Parcel Creation**: Simple form to create delivery requests
- **Smart Pricing**: Distance and weight-based pricing that's always cheaper than traditional couriers
- **Real-time Tracking**: Monitor your parcel's journey from pickup to delivery
- **Multiple Parcel Types**: Support for documents, small, medium, and large packages
- **Flexible Payment**: Pay on delivery or prepaid options
- **Price Calculator**: Instant cost estimation with detailed breakdown

### For Travelers 🚗
- **Trip Registration**: Register your travel routes and available cargo space
- **Earn Money**: Get paid for delivering parcels on your existing trips
- **Flexible Schedule**: Choose deliveries that match your travel plans
- **Earnings Dashboard**: Track your income and completed deliveries
- **Rating System**: Build your reputation as a trusted traveler
- **Available Parcels**: Browse and accept suitable delivery requests

### Core Features 🔧
- **Dual Role System**: Users can be both senders and travelers
- **Green Theme Design**: Modern UI with #008037 primary color
- **Secure Authentication**: Phone/email login with role selection
- **Responsive Design**: Optimized for mobile-first experience
- **Offline-Ready**: Core functionality works without internet

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development - macOS only)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TumaRide
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   # For web development
   npm run web
   
   # For mobile development
   npm run start
   
   # For Android
   npm run android
   
   # For iOS (macOS only)
   npm run ios
   ```

4. **Demo Access**
   - **Sender Demo**: Use `sender@demo.com` / `demo123`
   - **Traveler Demo**: Use `traveler@demo.com` / `demo123`

## 📱 App Structure

```
TumaRide/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx       # Custom button component
│   │   ├── Card.tsx         # Card container component
│   │   └── Input.tsx        # Form input component
│   ├── context/             # React Context providers
│   │   └── AuthContext.tsx  # Authentication state management
│   ├── navigation/          # Navigation configuration
│   │   └── AppNavigator.tsx # Main navigation structure
│   ├── screens/             # App screens
│   │   ├── auth/            # Authentication screens
│   │   ├── sender/          # Sender-specific screens
│   │   └── traveler/        # Traveler-specific screens
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions
│   │   ├── theme.ts         # App theme and styling
│   │   └── pricing.ts       # Pricing calculation logic
│   └── services/            # API and external services
└── App.tsx                  # Main app entry point
```

## 💰 Pricing Logic

TumaRide uses a sophisticated pricing algorithm that considers:

- **Base Price**: Starting from KES 200 for documents and small parcels
- **Distance Rates**: Tiered pricing based on distance ranges
  - 0-20km: Base price
  - 21-50km: +10 KES per km
  - 51-100km: +8 KES per km
  - 101-200km: +6 KES per km
  - 201-500km: +4 KES per km
  - 500km+: +3 KES per km
- **Weight Penalty**: +40 KES per kg above the base weight limit
- **Parcel Types**:
  - Documents (up to 1kg): KES 200 base
  - Small Box (up to 5kg): KES 200 base
  - Medium Box (up to 15kg): KES 250 base
  - Large Box (up to 30kg): KES 350 base

## 🎨 Design System

### Colors
- **Primary**: #008037 (TumaRide Green)
- **Primary Light**: #26A65B
- **Primary Dark**: #006B2F
- **Secondary**: #F39C12 (Orange accent)
- **Success**: #27AE60
- **Error**: #E74C3C
- **Warning**: #F39C12

### Typography
- **Font**: System default (iOS: San Francisco, Android: Roboto)
- **Sizes**: xs(12px), sm(14px), base(16px), lg(18px), xl(20px), 2xl(24px), 3xl(30px), 4xl(36px)
- **Weights**: normal(400), medium(500), semibold(600), bold(700)

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation 6
- **State Management**: React Context + Local State
- **Storage**: AsyncStorage
- **UI Components**: Custom components with consistent theming
- **Icons**: Expo Vector Icons (Ionicons)
- **Styling**: StyleSheet with theme utilities

## 📊 Key User Flows

### Sender Journey
1. **Registration** → Choose "Sender" role
2. **Create Parcel** → Fill details, select type, view pricing
3. **Confirmation** → Review and submit parcel request
4. **Matching** → System finds suitable travelers
5. **Tracking** → Monitor delivery progress
6. **Completion** → Confirm delivery and rate traveler

### Traveler Journey
1. **Registration** → Choose "Traveler" role
2. **Create Trip** → Register route and available space
3. **Browse Parcels** → View matching delivery requests
4. **Accept Deliveries** → Choose suitable parcels
5. **Pickup & Deliver** → Complete deliveries with proof
6. **Earnings** → Track income and get paid

## 🔮 Future Enhancements

### Phase 2 Features
- **Real-time GPS Tracking**: Live location updates
- **In-app Messaging**: Communication between senders and travelers
- **Photo Verification**: Image upload for parcel condition
- **Advanced Filtering**: Search parcels by route, size, price
- **Push Notifications**: Real-time delivery updates
- **Payment Integration**: M-Pesa, card payments, digital wallets

### Phase 3 Features
- **AI Route Optimization**: Smart route suggestions
- **Insurance Integration**: Parcel protection coverage
- **Multi-language Support**: Swahili, English, local languages
- **Offline Mode**: Complete offline functionality
- **Analytics Dashboard**: Detailed insights for users
- **Admin Panel**: Management interface for operations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌍 About TumaRide

TumaRide is building the future of logistics in Kenya by leveraging the power of community and existing travel patterns. Our mission is to make delivery services accessible, affordable, and efficient for everyone while creating earning opportunities for travelers.

**"Connecting Travelers & Senders Across Kenya"**

---

Built with ❤️ for the Kenyan logistics ecosystem