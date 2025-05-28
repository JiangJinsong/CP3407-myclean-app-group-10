# Database Schema (ER Diagram)

The following Mermaid diagram shows the main entities and their relationships. Paste into a Mermaid-enabled renderer or export via GenMyModel and save as `db/schema.png`.

```mermaid
erDiagram
    Cleaner {
        int     id PK
        string  name
        string  email
        text    description
        decimal price_per_hour
    }
    Customer {
        int    id PK
        string name
        string email
    }
    Booking {
        int     id PK
        date    booking_date
        time    start_time
        time    end_time
        decimal amount
        string  status
        int     cleaner_id FK
        int     customer_id FK
    }
    Availability {
        int  id PK
        date available_date
        time start_time
        time end_time
        int  cleaner_id FK
    }

    Cleaner ||--o{ Booking      : fulfills
    Customer ||--o{ Booking     : makes
    Cleaner ||--o{ Availability : owns
