// Form validation and CRUD operations
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    const bookingsList = document.getElementById('bookingsList');
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('checkIn').min = today;
    document.getElementById('checkOut').min = today;
    
    // Update checkout minimum date when checkin changes
    document.getElementById('checkIn').addEventListener('change', function() {
        const checkInDate = this.value;
        document.getElementById('checkOut').min = checkInDate;
    });
    
    // Form validation
    function validateForm() {
        let isValid = true;
        
        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(error => error.textContent = '');
        
        // Name validation
        const name = document.getElementById('name').value.trim();
        if (!name) {
            showError('nameError', 'Name is required');
            isValid = false;
        } else if (name.length < 2) {
            showError('nameError', 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // Email validation
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            showError('emailError', 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showError('emailError', 'Please enter a valid email');
            isValid = false;
        }
        
        // Phone validation
        const phone = document.getElementById('phone').value.trim();
        const phoneRegex = /^[0-9]{10}$/;
        if (!phone) {
            showError('phoneError', 'Phone number is required');
            isValid = false;
        } else if (!phoneRegex.test(phone)) {
            showError('phoneError', 'Please enter a valid 10-digit phone number');
            isValid = false;
        }
        
        // Date validation
        const checkIn = document.getElementById('checkIn').value;
        const checkOut = document.getElementById('checkOut').value;
        
        if (!checkIn) {
            showError('checkInError', 'Check-in date is required');
            isValid = false;
        }
        
        if (!checkOut) {
            showError('checkOutError', 'Check-out date is required');
            isValid = false;
        }
        
        if (checkIn && checkOut) {
            const checkInDate = new Date(checkIn);
            const checkOutDate = new Date(checkOut);
            
            if (checkOutDate <= checkInDate) {
                showError('checkOutError', 'Check-out date must be after check-in date');
                isValid = false;
            }
        }
        
        // Room type validation
        const roomType = document.getElementById('roomType').value;
        if (!roomType) {
            showError('roomTypeError', 'Please select a room type');
            isValid = false;
        }
        
        // Guests validation
        const guests = document.getElementById('guests').value;
        if (!guests || guests < 1) {
            showError('guestsError', 'Number of guests must be at least 1');
            isValid = false;
        } else if (guests > 10) {
            showError('guestsError', 'Maximum 10 guests allowed');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showError(elementId, message) {
        document.getElementById(elementId).textContent = message;
    }
    
    // Form submission
    bookingForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        const formData = new FormData(bookingForm);
        const bookingData = Object.fromEntries(formData);
        
        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData)
            });
            
            const result = await response.json();
            
            if (result.success) {
                alert('Booking successful! Your reservation has been confirmed.');
                bookingForm.reset();
                loadBookings();
            } else {
                alert('Booking failed: ' + result.error);
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });
    
    // Load bookings
    async function loadBookings() {
        try {
            const response = await fetch('/api/bookings');
            const result = await response.json();
            
            if (result.success) {
                displayBookings(result.bookings);
            }
        } catch (error) {
            console.error('Error loading bookings:', error);
        }
    }
    
    // Display bookings
    function displayBookings(bookings) {
        if (bookings.length === 0) {
            bookingsList.innerHTML = '<p>No bookings found.</p>';
            return;
        }
        
        bookingsList.innerHTML = bookings.map(booking => `
            <div class="booking-item" data-id="${booking._id}">
                <h3>${booking.name}</h3>
                <p><strong>Email:</strong> ${booking.email}</p>
                <p><strong>Phone:</strong> ${booking.phone}</p>
                <p><strong>Check-in:</strong> ${new Date(booking.checkIn).toLocaleDateString()}</p>
                <p><strong>Check-out:</strong> ${new Date(booking.checkOut).toLocaleDateString()}</p>
                <p><strong>Room Type:</strong> ${booking.roomType}</p>
                <p><strong>Guests:</strong> ${booking.guests}</p>
                <p><strong>Booked on:</strong> ${new Date(booking.createdAt).toLocaleDateString()}</p>
                <div class="booking-actions">
                    <button class="edit-btn" onclick="editBooking('${booking._id}')">Edit</button>
                    <button class="delete-btn" onclick="deleteBooking('${booking._id}')">Delete</button>
                </div>
            </div>
        `).join('');
    }
    
    // Edit booking
    window.editBooking = async function(id) {
        try {
            const response = await fetch(`/api/bookings/${id}`);
            const result = await response.json();
            
            if (result.success) {
                const booking = result.booking;
                
                // Fill form with booking data
                document.getElementById('name').value = booking.name;
                document.getElementById('email').value = booking.email;
                document.getElementById('phone').value = booking.phone;
                document.getElementById('checkIn').value = booking.checkIn.split('T')[0];
                document.getElementById('checkOut').value = booking.checkOut.split('T')[0];
                document.getElementById('roomType').value = booking.roomType;
                document.getElementById('guests').value = booking.guests;
                
                // Change form to update mode
                bookingForm.dataset.editId = id;
                document.querySelector('.submit-button').textContent = 'Update Booking';
                
                // Scroll to form
                document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
            }
        } catch (error) {
            alert('Error loading booking: ' + error.message);
        }
    };
    
    // Delete booking
    window.deleteBooking = async function(id) {
        if (!confirm('Are you sure you want to delete this booking?')) {
            return;
        }
        
        try {
            const response = await fetch(`/api/bookings/${id}`, {
                method: 'DELETE'
            });
            
            const result = await response.json();
            
            if (result.success) {
                alert('Booking deleted successfully');
                loadBookings();
            } else {
                alert('Error deleting booking: ' + result.error);
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };
    
    // Update form submission for edit mode
    bookingForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        const formData = new FormData(bookingForm);
        const bookingData = Object.fromEntries(formData);
        const editId = bookingForm.dataset.editId;
        
        try {
            const url = editId ? `/api/bookings/${editId}` : '/api/bookings';
            const method = editId ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData)
            });
            
            const result = await response.json();
            
            if (result.success) {
                alert(editId ? 'Booking updated successfully!' : 'Booking successful! Your reservation has been confirmed.');
                bookingForm.reset();
                delete bookingForm.dataset.editId;
                document.querySelector('.submit-button').textContent = 'Book Now';
                loadBookings();
            } else {
                alert('Operation failed: ' + result.error);
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Load bookings on page load
    loadBookings();
});