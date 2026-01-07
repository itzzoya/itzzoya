const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/resort_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Booking Schema
const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  checkIn: Date,
  checkOut: Date,
  roomType: String,
  guests: Number,
  createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', bookingSchema);

async function checkDatabase() {
  try {
    console.log('Connected to MongoDB');
    
    // Count total bookings
    const count = await Booking.countDocuments();
    console.log(`Total bookings: ${count}`);
    
    // Get all bookings
    const bookings = await Booking.find().sort({ createdAt: -1 });
    
    if (bookings.length > 0) {
      console.log('\nBookings:');
      bookings.forEach((booking, index) => {
        console.log(`${index + 1}. ${booking.name} - ${booking.email} - ${booking.roomType}`);
      });
    } else {
      console.log('No bookings found');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

checkDatabase();