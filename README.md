# Paradise Resort Website - Render Deployment

A complete resort booking website with Diwali special offers, form validation, and CRUD operations built with Node.js and MongoDB.

## 🚀 Live Demo
Deployed on Render: [Your Render URL will be here]

## 🌟 Features

- **Responsive Design**: Mobile-friendly resort website
- **Diwali Theme**: Special color scheme with gold, orange, and brown colors
- **Booking System**: Complete room booking functionality
- **Form Validation**: Client-side validation for all form fields
- **CRUD Operations**: Create, Read, Update, Delete bookings
- **Special Offers**: Diwali discount offers with attractive design
- **Modern UI**: Gradient backgrounds, animations, and smooth transitions

## 🛠 Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Styling**: Custom CSS with Google Fonts (Playfair Display, Lato)
- **Hosting**: Render (Web Service)

## 📋 Render Deployment Steps

### 1. **Create MongoDB Atlas Database**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create free cluster
   - Get connection string

### 2. **Deploy on Render**
   - Go to [Render.com](https://render.com)
   - Connect your GitHub repository
   - Create new Web Service
   - Use these settings:
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Environment Variables**:
       - `MONGODB_URI`: Your MongoDB Atlas connection string
       - `NODE_ENV`: `production`

### 3. **Environment Variables**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/resort_db
   NODE_ENV=production
   ```

## 🏃‍♂️ Local Development

1. **Clone Repository**:
   ```bash
   git clone https://github.com/itzzoya/itzzoya.git
   cd itzzoya
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Environment Variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB connection
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```

5. **Access Website**:
   Open `http://localhost:3001`

## 📡 API Endpoints

- `GET /` - Main website
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get specific booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Delete booking
- `GET /admin.html` - Admin panel for viewing bookings

## ✅ Form Validation Features

- **Name**: Required, minimum 2 characters
- **Email**: Required, valid email format
- **Phone**: Required, 10-digit number
- **Check-in/Check-out**: Required, valid date range
- **Room Type**: Required selection
- **Guests**: Required, 1-10 guests

## 🎨 Diwali Special Features

- **Color Scheme**: Gold (#ffd700), Orange (#ff6b35), Brown (#8b4513)
- **Typography**: Elegant fonts (Playfair Display for headings)
- **Offers Section**: Three special Diwali packages with discounts
- **Animations**: Smooth transitions and hover effects
- **Festive Elements**: Diya patterns and festival-themed content

## 📁 Project Structure

```
resort-website/
├── server.js              # Main server file
├── package.json           # Dependencies
├── render.yaml           # Render deployment config
├── .env.example          # Environment variables template
├── public/               # Static files
│   ├── index.html        # Main HTML file
│   ├── styles.css        # CSS styles
│   ├── script.js         # JavaScript functionality
│   └── admin.html        # Admin panel
├── check-db.js           # Database checker
└── README.md             # This file
```

## 🎯 Usage

1. **Browse Offers**: View Diwali special packages on homepage
2. **Book Room**: Fill out booking form with validation
3. **Manage Bookings**: View, edit, or delete existing bookings
4. **Admin Panel**: Access `/admin.html` to view all bookings
5. **Responsive**: Works on desktop, tablet, and mobile devices

## 🗄️ Database Schema

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

## 🔧 Troubleshooting

- **MongoDB Connection**: Ensure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- **Environment Variables**: Double-check MONGODB_URI format
- **Port Issues**: Render automatically assigns PORT environment variable

## 📞 Support

For issues or questions, please create an issue in the GitHub repository.