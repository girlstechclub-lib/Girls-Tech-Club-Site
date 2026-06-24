# Girls Tech Club Website

A static website for Girls Tech Club, a Liberia-based youth organization that empowers girls and young women through technology education, mentorship, and community outreach.

## Overview

- Responsive static HTML site built with Bootstrap
- Contact page integrated with Google Apps Script + Google Sheets
- Donation request page integrated with Google Apps Script + Google Sheets
- Navigation and footer components reused across pages
- Easy to host on GitHub Pages or any static site host

## Files

- `index.html` — home page
- `about.html` — organization overview
- `programs.html` — programs and learning tracks
- `events.html` — upcoming events and workshops
- `donate.html` — donation support request form
- `contact.html` — contact form and organization info
- `assets/` — CSS, images, and JavaScript assets
- `components/` — shared HTML components for navbar and footer

## Deployment

This project can be hosted on GitHub Pages by enabling Pages in the repository settings and setting the source to the root branch.

## Notes

The contact and donate forms submit to Google Apps Script endpoints that save form responses into Google Sheets. Ensure the Apps Script deployments are configured with "Execute as: Me" and "Who has access: Anyone" if you want the forms to work publicly.