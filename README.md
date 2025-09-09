# IntellaClick Instructor Portal

Web-based instructor management portal for IntellaClick classroom response system.

## Overview

This portal provides instructors with tools to:
- Create and manage classes
- Handle student enrollment and rosters
- View class analytics and performance
- Generate join codes for students

## Deployment

This is a static site designed to be deployed on Coolify or any static hosting service.

### API Configuration

The portal communicates with the IntellaClick API at:
- Production: `https://api.intellaclick.com`

### Pages

- `/` - Redirects to classes page
- `/classes.html` - Main class management dashboard
- `/roster.html` - Student roster management
- `/analytics.html` - Class performance analytics

## Development

To run locally:
1. Use a local web server (e.g., Live Server in VS Code)
2. Ensure CORS is configured on the API to accept requests from localhost

## Related Repositories

- Backend API: [mhegazy1/intellaclick-cloud-backend](https://github.com/mhegazy1/intellaclick-cloud-backend)
- Student Portal: [mhegazy1/intellaquiz](https://github.com/mhegazy1/intellaquiz)