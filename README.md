# DairyTrack 🍶🚚

DairyTrack is a full-stack web application designed to track dairy farm milk deliveries via QR code scanning. It enables delivery staff to mark attendance and log delivery details such as GPS location and timestamps, ensuring authenticity and preventing fraud.

## Features

- **QR Code Scanning**: Scan customer QR codes to record delivery attendance.
- **GPS & Timestamp Capture**: Automatically logs location and time of delivery.
- **Offline Support**: Store data locally when offline (MVP implemented).
- **Admin Dashboard**: View attendance logs and delivery reports.
- **AI-Powered Forecasting**: Predict milk delivery demand using Genkit AI.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Backend**: Firebase (Firestore, Auth)
- **State Management**: TanStack Query
- **AI**: Genkit AI

## Getting Started

1. Clone the repository.
2. Install dependencies:

   ```bash
   npm install
   ```
3. Set up environment variables:

   - Create a `.env.local` file in the root directory.
   - Add `GOOGLE_GENAI_API_KEY=your_api_key_here`.
   - Add Firebase configuration (see `.env.example`):
     - `NEXT_PUBLIC_FIREBASE_API_KEY`
     - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
     - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
     - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
     - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
     - `NEXT_PUBLIC_FIREBASE_APP_ID`
4. Run the development server:

   ```bash
   npm run dev
   ```
5. Open http://localhost:9002 with your browser.

## Project Structure

- `src/app`: Next.js App Router pages (including login/register, QR scanner, demand forecasting, admin/dashboard views).
- `src/components`: Reusable UI components and layout elements (cards, dialogs, forms, etc.).
- `src/services`: Client‑side service functions for deliveries and customers; offline persistence logic resides here.
- `src/hooks`: Custom React hooks (authentication, toast notifications, mobile detection, etc.).
- `src/lib`: Firebase initialization, authentication context, and utility helpers.
- `src/ai`: Genkit AI configuration and flows used by the demand forecasting feature.

## Authentication & Authorization

Delivery staff and administrators must authenticate with email/password before accessing protected pages (QR scanner, dashboard, forecasting). The app uses Firebase Authentication with a simple `ProtectedRoute` component to guard client routes. A registration page is provided for new accounts.

## Offline Support

Logging deliveries is designed to tolerate network outages. The `logDelivery` service attempts to persist data locally (using `localStorage`) when the network or Firebase is unavailable; these logs can later be synced to Firestore in a future enhancement. GPS coordinates and timestamps are captured from the browser API when available.

## AI‑Powered Demand Forecasting

The demand forecasting page lets users paste historical delivery data (date, customer ID, quantity) and invoke a Genkit AI flow. The flow uses the `googleai/gemini-pro` model and returns a forecast, confidence level, and optimization recommendations. A valid `GOOGLE_GENAI_API_KEY` environment variable is required.

## Usage Notes

1. **Register/Login** – create or sign in with a Firebase user before navigating to the scanner or dashboard.
2. **Scan & Log** – the scanner page simulates QR decoding; replace the placeholder logic with a real library (e.g. `jsQR` or `zxing`) for production.
3. **Delivery Reports** – the admin dashboard (future work) will read from Firestore; currently, the app only stores logs locally.
4. **Forecasting** – navigate to `/demand-forecast` to use the AI forecasting tool after logging in.

---

Feel free to expand the documentation as the project evolves, particularly when additional features such as sync, reporting, or real-time updates are implemented.
