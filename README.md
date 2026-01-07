# Paradise Resort Website

A complete resort booking website with Diwali special offers, form validation, and CRUD operations built with Node.js and MongoDB.

## Features

- **Responsive Design**: Mobile-friendly resort website
- **Diwali Theme**: Special color scheme with gold, orange, and brown colors
- **Booking System**: Complete room booking functionality
- **Form Validation**: Client-side validation for all form fields
- **CRUD Operations**: Create, Read, Update, Delete bookings
- **Special Offers**: Diwali discount offers with attractive design
- **Modern UI**: Gradient backgrounds, animations, and smooth transitions

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Styling**: Custom CSS with Google Fonts (Playfair Display, Lato)

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start MongoDB**:
   Make sure MongoDB is running on your system (default port 27017)

3. **Run the Application**:
   ```bash
   npm start
   ```
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

4. **Access the Website**:
   Open your browser and go to `http://localhost:3000`

## API Endpoints

- `GET /` - Main website
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get specific booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Delete booking

## Form Validation Features

- Name: Required, minimum 2 characters
- Email: Required, valid email format
- Phone: Required, 10-digit number
- Check-in/Check-out: Required, valid date range
- Room Type: Required selection
- Guests: Required, 1-10 guests

## Diwali Special Features

- **Color Scheme**: Gold (#ffd700), Orange (#ff6b35), Brown (#8b4513)
- **Typography**: Elegant fonts (Playfair Display for headings)
- **Offers Section**: Three special Diwali packages with discounts
- **Animations**: Smooth transitions and hover effects
- **Festive Elements**: Diya patterns and festival-themed content

## Project Structure

```
resort-website/
├── server.js          # Main server file
├── package.json       # Dependencies
├── public/            # Static files
│   ├── index.html     # Main HTML file
│   ├── styles.css     # CSS styles
│   └── script.js      # JavaScript functionality
└── README.md          # This file
```

## Usage

1. **Browse Offers**: View Diwali special packages on the homepage
2. **Book Room**: Fill out the booking form with validation
3. **Manage Bookings**: View, edit, or delete existing bookings
4. **Responsive**: Works on desktop, tablet, and mobile devices

## Database Schema

```javascript
{
  name: String (required),
  email: String (required),
  phone: String (required),
  checkIn: Date (required),
  checkOut: Date (required),
  roomType: String (required),
  guests: Number (required),
  createdAt: Date (default: now)
}
```