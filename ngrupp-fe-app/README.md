# Ngrupp FE Angular Application

## Overview
This is an Angular front-end application for event management and booking, and user authentication.
It supports role-based access, event listing, booking management, and integration with a backend API.

## Project strategy
The development strategy is as follows:
1. Implement basic functionality for event listing, adding event and booking a seat at event.
2. Deploy to Azure.
3. Implement user authentication and role management. 
4. Apply UI styling.
5. Implement error handling and logging concepts.

Currently, steps 1,2 are implemented.

## Features
- Event listing and details
- Add new events
- Book seats for events
- View and manage bookings
- API server configuration via environment files

## Technologies
- Angular 15+
- TypeScript
- Angular Material
- Angular Router
- HttpClient for API communication

## Setup & Installation
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Development server:**
   ```bash
   npm start
   ```
   The app will run at `http://localhost:4200/` by default.

3. **Build for production:**
   ```bash
   npm run build --configuration=production
   ```
   The production build will use the API URL from `src/environments/environment.prod.ts`.

4. **Build destination:**
   The build output will be in the `dist/ngrupp-fe-app/` directory.
   For Azure deployment pipeline location of deliverable is `ngrupp-fe-app\dist\ngrupp-fe-app\browser`.

## Environment Configuration
- API server URL is set in `src/environments/environment.ts` (development) and `src/environments/environment.prod.ts` (production).
- To change the API endpoint, edit the `apiUrl` property in the respective environment file.

## Routing
- `/` - Event List
- `/add-event` - Add Event
- `/booking-details/:eventId` - Booking Details for an Event

## Azure Deployment
- Application is deployed to Azure Static Web Apps.
- Default pipeline is modified to build production configuration:
  ```yaml
    env:
      #...
      NODE_VERSION: '20.x'                # set this to the node version to use
      #...
    - name: Build And Deploy
      #...
      app_build_command: "npm run build -- --configuration=production"
      #...
        
  ```
- Set the production API URL in `environment.prod.ts` to match your backend endpoint.
