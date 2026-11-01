# Velocity — Car Collection Website

A premium, responsive automotive collection website built with React, Vite, Tailwind CSS, Framer Motion, and Lucide icons.

## Features
- Cinematic hero section, animated marquee, scroll-friendly navigation
- Responsive car gallery with category, brand, search, and sort filters
- Vehicle details modal with specifications and pricing
- Wishlist / saved vehicles
- Compare up to three vehicles side by side
- Test-drive / private viewing booking form with validation and success state
- Contact enquiry form
- FAQ accordion, brand tiles, concierge services, footer
- Light and dark themes
- Motion transitions, hover effects, mobile navigation

## Run locally
1. Install Node.js (18+ recommended).
2. Open this folder in your terminal.
3. Run `npm install`
4. Run `npm run dev`
5. Open the local URL shown by Vite.

## Production build
Run `npm run build`. The generated website is placed in `dist/`.

## Notes
- Vehicle data is in `src/App.jsx` in the `cars` array. Update it to change listings, prices, specifications, or image URLs.
- Vehicle images use remote Unsplash image URLs and require an internet connection.
- This is a frontend demo. Booking and contact forms show a local confirmation; connect an API or backend to deliver enquiries.
- Prices and specifications are illustrative demo content and should be verified before publishing.
