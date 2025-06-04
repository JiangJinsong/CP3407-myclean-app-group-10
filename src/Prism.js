-- USERS TABLE
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('customer', 'cleaner', 'admin') NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE
);

-- CLEANER PROFILES
CREATE TABLE cleaner_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    description TEXT,
    services TEXT,
    hourly_rate DECIMAL(10,2),
    is_eco_friendly BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- AVAILABILITY SLOTS
CREATE TABLE availability_slots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cleaner_id INT NOT NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    FOREIGN KEY (cleaner_id) REFERENCES cleaner_profiles(id) ON DELETE CASCADE
);

-- BOOKINGS TABLE
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    cleaner_id INT NOT NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    amount DECIMAL(10,2),
    status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
    FOREIGN KEY (customer_id) REFERENCES users(id),
    FOREIGN KEY (cleaner_id) REFERENCES cleaner_profiles(id)
);

-- PAYMENTS TABLE
CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    transaction_date DATETIME NOT NULL,
    amount DECIMAL(10,2),
    status ENUM('success', 'failed') DEFAULT 'success',
    payment_method VARCHAR(50),
    FOREIGN KEY (booking_id) REFERENCES bookings(id)
);

-- REVIEWS TABLE
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    review_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id)
);

-- MESSAGES TABLE
CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    content TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id),
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (receiver_id) REFERENCES users(id)
);

-- ADMIN ACTIONS TABLE
CREATE TABLE admin_actions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NOT NULL,
    action_type VARCHAR(100),
    target_user_id INT,
    action_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES users(id),
    FOREIGN KEY (target_user_id) REFERENCES users(id)
);

-- EARNINGS VIEW
CREATE VIEW earnings AS
SELECT 
    cp.id AS cleaner_profile_id,
    u.name AS cleaner_name,
    COUNT(b.id) AS total_bookings,
    SUM(p.amount) AS total_earnings
FROM cleaner_profiles cp
JOIN users u ON cp.user_id = u.id
LEFT JOIN bookings b ON b.cleaner_id = cp.id AND b.status = 'completed'
LEFT JOIN payments p ON p.booking_id = b.id AND p.status = 'success'
GROUP BY cp.id, u.name;
