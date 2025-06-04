# cp3407-project-v2025 (MyClean App)

## Topic
A Booking and Management Platform for Cleaning Services

## Project Overview
MyClean is a one-stop home cleaning service booking platform.  
Customers can register, browse available services, place orders, and manage their bookings;  
Administrators can manage service offerings and orders.

## Purpose
Provide users to book an online room cleaning services instead of doing it themselves for convenience.

## Goals
- Secure email/password registration and login  
- Browse and book cleaning services  
- Booking reminders and post-service ratings  

## Team
- **Jiang Jinsong** (Project Leader)  
- **Juninho Chandra** (Frontend Developer)  
- **Asmita Sharma** (Backend Developer)  
- **Saung Hnin Phyu** (QA & DevOps)  

## Project Planning BEFORE Iteration-1
- Use the supplied GitHub template  
- Ensure initial commits are timestamped BEFORE Iteration-1 start  
- Draft user stories per INVEST criteria  
- Create more stories than fit into Iterations 1 & 2  

### Initial Backlog Ideas
See [initial_backlog_ideas.md](./initial_backlog_ideas.md)  


## 1. Justification for the Project

### Why a New ICT Solution Is Required
1. **Inefficient, Fragmented Booking Methods**  
   Many independent cleaners and small cleaning companies still rely on phone calls, spreadsheets, or paper calendars. Customers spend time calling back and forth to confirm availability, leading to double-bookings, missed appointments, and payment confusion.

2. **Lack of Unified Platform**  
   There is no single, affordable platform tailored specifically to smaller cleaning businesses. General-purpose booking or marketplace solutions can be overly complex or costly and often lack cleaning-specific features (e.g., recurring visits, supply tracking).

3. **Demand for Digital Convenience**  
   Modern consumers expect to compare service providers online, check availability instantly, book with a click, and pay electronically. Cleaners need a similarly simple way to manage schedules, receive notifications, and track income without juggling multiple apps.

4. **Scalability and Growth Potential**  
   A dedicated digital platform for booking and managing cleaning services helps small providers expand their customer base, reduce no-shows, and boost revenue. Launching an MVP now paves the way for future enhancements and broader marketplace integration.

---

## 2. Market & ICT Technology Research

### Cleaning Services Market Trends
- The residential and commercial cleaning market is growing as busy professionals, dual-income households, and property managers seek on-demand services.
- “Gig economy” platforms (e.g., TaskRabbit, Handy) show that consumers prefer booking specialized home services via mobile/web apps.
- Many suburban and smaller markets remain underserved by existing digital solutions tailored for local cleaning providers.

### ICT Technology Landscape
- **Front-end Frameworks:** React or Vue.js allow responsive, component-based interfaces suitable for web and progressive web apps.
- **Back-end Platforms:** Node.js/Express (JavaScript) or Django (Python) offer lightweight RESTful APIs, ensuring easy future integration with third-party services.
- **Database:** MySQL or PostgreSQL provide reliable relational storage for user profiles, bookings, availability, and transaction records.
- **Cloud Services:** AWS (EC2, RDS, S3, Cognito, SNS) or Azure/AWS Lambda can host the application, store static assets, handle authentication, and deliver notifications.
- **Third-Party Integrations:** Stripe (or mock payment for MVP) and Twilio (SMS reminders) are common choices to enhance user experience.
- **Charting Libraries:** Chart.js or Recharts can visualize earnings data on the front end.

---

## 3. Project Goals

1. **User & Cleaner Profile Management**  
   - Cleaners register, create detailed profiles (name, photo, services, hourly rate, eco-friendly option), and update their information.  
   - Customers register with basic contact details for streamlined bookings.

2. **Real-Time Availability & Scheduling**  
   - Cleaners set and modify availability time slots via a calendar widget.  
   - Customers see only open slots when booking, preventing conflicts and double-bookings.

3. **End-to-End Booking Workflow**  
   - Customers browse Cleaner profiles (filterable by rating, price, eco-friendly) and choose date/time.  
   - Capture booking details (customer info, chosen Cleaner, service details, amount).  
   - Send immediate confirmation to the customer and a notification to the Cleaner for acceptance.

4. **Mock Payment Integration (MVP)**  
   - Simulated payment page where customers enter card details.  
   - Record payment status in the database (always “success” for MVP).  
   - Log transaction details (bookingId, timestamp, amount) for future real-payment integration.

5. **Real-Time Notifications**  
   - On booking submission, notify the Cleaner (via console log or WebSocket).  
   - Plan for email or in-app push notifications in later iterations.

6. **Rating & Review System**  
   - After service completion, customers rate (1–5 stars) and leave text reviews.  
   - Display aggregate ratings on each Cleaner’s profile for transparency.

7. **Cleaner Earnings Dashboard**  
   - Provide Cleaners a dashboard summarizing total bookings, total earned (mock payments), and upcoming appointments.  
   - Visualize weekly or monthly earnings using charts.

8. **Customer Messaging to Cleaner**  
   - Enable customers to send in-app messages to their chosen Cleaner (e.g., clarify instructions).  
   - Allow Cleaners to view and respond to those messages.

9. **Admin & Verification Tools**  
   - Admin dashboard to review new Cleaner sign-ups and mark them “verified.”  
   - Log administrative actions for audit trails.

10. **Eco-Friendly Service Filter**  
    - Tag certain Cleaners as “eco-friendly” based on products/practices.  
    - Let customers filter search results to show only eco-friendly Cleaners.

---

## 4. Database Usage (MySQL)

MyClean uses MySQL for reliable storage and data relationships:

1. **users**  
   - Columns: `id`, `name`, `email`, `password_hash`, `role` (customer|cleaner|admin), `is_verified` (BOOLEAN)  
   - Stores authentication and role information.

2. **cleaner_profiles**  
   - Columns: `id` (PK), `user_id` (FK→users.id), `description`, `services` (TEXT), `hourly_rate` (DECIMAL), `is_eco_friendly` (BOOLEAN)  
   - Contains additional Cleaner details.

3. **availability_slots**  
   - Columns: `id` (PK), `cleaner_id` (FK→cleaner_profiles.id), `date` (DATE), `start_time` (TIME), `end_time` (TIME)  
   - Tracks each Cleaner’s available time blocks.

4. **bookings**  
   - Columns: `id` (PK), `customer_id` (FK→users.id), `cleaner_id` (FK→cleaner_profiles.id), `date` (DATE), `start_time` (TIME), `end_time` (TIME), `amount` (DECIMAL), `status` (ENUM: pending|confirmed|completed|cancelled)  
   - Records booking requests and statuses.

5. **payments**  
   - Columns: `id` (PK), `booking_id` (FK→bookings.id), `transaction_date` (DATETIME), `amount` (DECIMAL), `status` (ENUM: success|failed), `payment_method` (VARCHAR)  
   - Stores mock payment transaction details.

6. **reviews**  
   - Columns: `id` (PK), `booking_id` (FK→bookings.id), `rating` (INT), `comment` (TEXT), `review_date` (DATETIME)  
   - Captures customer ratings and comments.

7. **messages**  
   - Columns: `id` (PK), `booking_id` (FK→bookings.id), `sender_id` (FK→users.id), `receiver_id` (FK→users.id), `content` (TEXT), `timestamp` (DATETIME)  
   - Enables in-app messaging tied to specific bookings.

8. **admin_actions**  
   - Columns: `id` (PK), `admin_id` (FK→users.id), `action_type` (VARCHAR), `target_user_id` (FK→users.id), `action_date` (DATETIME)  
   - Logs administrative events (e.g., verifying a Cleaner).

9. **earnings** (VIEW)  
   - A computed view that aggregates each Cleaner’s total earnings and number of bookings over a period, based on `bookings` and `payments`.

---

## Project Plan
Detailed planning artifacts:  
- **Backlog & INVEST-compliant stories** → [project-plan.md#user-stories-backlog](./project-plan.md#user-stories-backlog)  
- **Iteration 1 Goals**               → [iteration_1.md#iteration-1-goals](./iteration_1.md#iteration-1-goals)  
- **Iteration 2 Goals**               → [iteration_2.md#iteration-2-goals](./iteration_2.md#iteration-2-goals)  

## Iteration 1 [Duration: 3–4 weeks]
Start: 2025-06-02  
End:   2025-06-23  

## Iteration 2 [Duration: 3–4 weeks]
Start: 2025-06-24  
End:   2025-07-15  

## Actual Iterations
- [Iteration 1 Board](./iteration_1.md)  
- [Iteration 2 Board](./iteration_2.md)  

## License
[MIT](./LICENSE.txt)

