# TumaRide Development Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   # or for specific platforms:
   npm run web    # Web browser
   npm run android # Android emulator
   npm run ios    # iOS simulator (macOS only)
   ```

3. **Demo Login Credentials**
   - **Sender Demo**: `sender@demo.com` / `demo123`
   - **Traveler Demo**: `traveler@demo.com` / `demo123`

## App Architecture

### Screen Flow
```
Splash → Login/Register → Role Selection → Main App
```

### Main Navigation Structure
- **Senders**: Home → Create Parcel → Track Deliveries → Profile
- **Travelers**: Home → Create Trip → Browse Parcels → Earnings → Profile

### Key Features Implemented

#### ✅ Authentication System
- Email/phone login
- User registration with validation
- Role selection (Sender/Traveler)
- Persistent auth state with AsyncStorage

#### ✅ Sender Features
- **Parcel Creation**: Interactive form with parcel type selection
- **Smart Pricing**: Real-time price calculation with breakdown
- **Parcel Types**: Documents, Small (5kg), Medium (15kg), Large (30kg)
- **Price Calculator**: Distance + weight-based pricing
- **Recent Parcels**: List view with status tracking

#### ✅ Traveler Features
- **Trip Registration**: Route and space availability
- **Earnings Dashboard**: Income tracking and statistics
- **Available Parcels**: Browse and accept deliveries
- **Rating System**: 5-star rating display

#### ✅ UI/UX Features
- **Green Theme**: TumaRide brand color (#008037)
- **Responsive Design**: Mobile-first approach
- **Modern Components**: Cards, buttons, inputs with consistent styling
- **Navigation**: Tab navigation with role-based screens
- **Icons**: Comprehensive Ionicons integration

### Pricing Algorithm

The app uses a sophisticated pricing model:

```typescript
Base Price: KES 200-350 (depending on parcel type)
+ Distance charges (tiered rates: 0-20km free, 21-50km @10 KES/km, etc.)
+ Weight penalty (40 KES per kg above limit)
= Total competitive price
```

### Component Structure

```
src/
├── components/           # Reusable UI components
│   ├── Button.tsx       # Multi-variant button
│   ├── Card.tsx         # Container with shadows
│   └── Input.tsx        # Form input with validation
├── context/             # State management
│   └── AuthContext.tsx  # User authentication
├── navigation/          # App navigation
│   └── AppNavigator.tsx # Stack + Tab navigation
├── screens/             # All app screens
│   ├── auth/           # Login, register, role selection
│   ├── sender/         # Sender-specific screens
│   └── traveler/       # Traveler-specific screens
├── types/              # TypeScript definitions
├── utils/              # Utilities
│   ├── theme.ts        # Design system
│   └── pricing.ts      # Price calculations
└── services/           # Future API integrations
```

## Development Tips

### Adding New Screens
1. Create screen in appropriate folder (`src/screens/`)
2. Add navigation route in `AppNavigator.tsx`
3. Import and use existing components for consistency

### Styling Guidelines
- Use theme colors from `src/utils/theme.ts`
- Prefer spacing constants over hardcoded values
- Use Card component for elevated content
- Follow established font size hierarchy

### State Management
- Auth state: `useAuth()` hook from AuthContext
- Local state: React useState for component state
- Future: Consider Redux for complex state management

### Adding New Features
1. Update types in `src/types/index.ts`
2. Create utility functions in `src/utils/`
3. Build components in `src/components/`
4. Implement screens with navigation

## Testing the App

### Manual Testing Checklist
- [ ] Login with demo credentials works
- [ ] Role selection updates user interface
- [ ] Sender can create parcels with pricing
- [ ] Traveler can view earnings and create trips
- [ ] Navigation between tabs works smoothly
- [ ] Profile screen shows user information
- [ ] Logout functionality works

### Future Testing
- Unit tests with Jest
- Integration tests with React Native Testing Library
- E2E tests with Detox

## Performance Considerations

### Current Optimizations
- Lazy loading of screens
- Optimized images and icons
- Efficient re-renders with React.memo where needed

### Future Optimizations
- Image optimization and caching
- API response caching
- Background sync for offline functionality

## Build & Deployment

### Development Build
```bash
npm run build        # Create development build
```

### Production Deployment
```bash
# Android
npm run build:android

# iOS (macOS only)
npm run build:ios

# Web
npm run build:web
```

## Known Limitations & Future Work

### Current MVP Limitations
- Mock data instead of real API
- No real-time GPS tracking
- No payment integration
- No push notifications
- Limited offline functionality

### Planned Phase 2 Features
- Real-time location tracking
- M-Pesa payment integration
- In-app messaging
- Photo verification
- Advanced filtering and search
- Push notifications

### Technical Debt
- Add comprehensive error handling
- Implement proper loading states
- Add input validation
- Optimize bundle size
- Add accessibility features

## Contributing

1. Follow TypeScript strict mode
2. Use existing components when possible
3. Add proper error handling
4. Test on both iOS and Android
5. Follow the established folder structure
6. Update this guide for major changes

---

**Happy coding! 🚀**