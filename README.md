# DairyTrack

DairyTrack is a full-stack web application designed to track dairy farm milk deliveries via QR code scanning. It enables delivery staff to mark attendance and log delivery details such as GPS location and timestamps, ensuring authenticity and preventing fraud.

## Features

- **QR Code Scanning**: Scan customer QR codes to record delivery attendance.
- **GPS & Timestamp Capture**: Automatically logs location and time of delivery.
- **Offline Support**: (Planned) Store data locally when offline and sync when online.
- **Admin Dashboard**: View attendance logs and delivery reports.
- **AI-Powered Forecasting**: (Planned) Predict milk delivery demand.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Backend**: Firebase (Firestore, Auth)
- **State Management**: TanStack Query
- **AI**: Genkit AI

## Getting Started

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

- `src/app`: Next.js App Router pages.
- `src/components`: Reusable UI components.
- `src/services`: API and service functions.
- `src/hooks`: Custom React hooks.
