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

