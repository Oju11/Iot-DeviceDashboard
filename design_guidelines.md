# IoT Device Management Dashboard - Design Guidelines

## Design Approach
**Reference-Based Approach**: Modern dashboard UI inspired by contemporary data visualization platforms (Vercel Analytics, Linear, Grafana) with a distinctive glassmorphism aesthetic.

---

## Core Design Elements

### Typography
- **Font Family**: Inter (Google Fonts)
- **Hierarchy**:
  - Page Titles: Inter 32px/700 (bold)
  - Card Headers: Inter 20px/600 (semibold)
  - Body Text: Inter 16px/400 (regular)
  - Labels/Captions: Inter 14px/500 (medium)

### Layout System
- **Spacing Units**: Tailwind units of 4, 6, 8, and 12
- **Container**: max-w-7xl centered with px-6
- **Grid**: Dashboard uses responsive grid layout for cards
- **Card Spacing**: p-6 for card padding, gap-6 between cards

### Background Treatment
- **Primary Gradient**: Deep purple to dark slate (#7C3AED → #0F172A)
- **Gradient Direction**: Diagonal top-left to bottom-right
- **Spotlight Effects**: Soft radial gradients with opacity overlays creating ambient lighting
- **Layering**: Multiple gradient layers for depth

---

## Component Library

### Glassmorphism Cards
- Semi-transparent background with backdrop blur
- Border: 1px solid white with 10-20% opacity
- Shadow: Large, soft shadows for elevation
- Border Radius: Rounded-lg to rounded-2xl
- Padding: p-6 to p-8

### Send Telemetry Form
- Card-based container with glassmorphism treatment
- Input fields with subtle borders and focus states
- Labels above inputs with Inter medium weight
- Submit button: Primary gradient button with smooth hover transition
- Form fields: Device ID dropdown/input, Telemetry Value input

### Live Telemetry Chart
- Full-width glassmorphism card
- Chart header with title and real-time indicator
- Line graph using Recharts with gradient fill under the line
- Smooth animations on data updates
- Gridlines: Subtle, low-opacity
- Axis labels: Small Inter font

### Device Table
- Glassmorphism card container
- Header row with column labels
- Status indicators: Color-coded badges (green for active, gray for inactive)
- Row hover states with subtle background change
- Columns: Device ID, Status, Last Reading, Timestamp

### Buttons
- Primary: Gradient background matching theme (#7C3AED to vibrant purple)
- Rounded corners (rounded-lg)
- Padding: px-6 py-3
- Font: Inter 16px/600
- Smooth hover scale and brightness transitions
- If placed on images/gradient backgrounds: Add backdrop-blur

---

## Layout Structure

### Dashboard Grid
- Three main sections arranged in responsive grid:
  - Top Row: Send Telemetry Form (left) + Device Summary Card (right)
  - Middle Row: Live Telemetry Chart (full-width)
  - Bottom Row: Device Table (full-width)
- Mobile: Stack vertically with full-width cards
- Desktop: 2-column grid for top row, full-width for chart and table

---

## Animations
- **Card Entry**: Subtle fade-in with slight upward motion on load
- **Chart Updates**: Smooth line transitions when new data arrives
- **Button Interactions**: Scale on hover (1.02x), brightness increase
- **Status Indicators**: Gentle pulse animation for active devices

---

## Visual Effects
- **Backdrop Blur**: Applied to all glassmorphism cards
- **Shadows**: Layered shadows creating depth (small inner shadow + larger outer glow)
- **Gradients**: Used in backgrounds, buttons, and chart fills
- **Spotlight**: Radial gradient overlays positioned strategically for atmospheric lighting

---

## Images
**No hero images required** - This is a dashboard application where data visualization and functionality take precedence over marketing imagery. The gradient background provides sufficient visual impact.