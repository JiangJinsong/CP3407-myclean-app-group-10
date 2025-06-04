# Project Planning Phase (Before Iteration 1)

*(Chapters 1–3: Requirements, Planning, User Stories)*

All content below must be committed on or before **20 May 2025**, prior to starting Iteration 1 on **21 May 2025**.

---

## 1. GitHub Setup

- **Repository Creation**  
  - Created from the supplied GitHub template (zipped).  
- **Initial Commits**  
  1. `README.md` – Contains project overview, goals, and team roles.  
  2. `project-plan.md` – This planning document.  
  3. `initial_backlog_ideas.md` – Full backlog of user stories.  
- **Timestamp Requirement**  
  - Ensure all three files are committed **before** 21 May 2025.

---

## 2. INVEST & MoSCoW Criteria

- **INVEST (p. 39)**:  
  - **Independent**: Each user story stands alone.  
  - **Negotiable**: Stories can be split or merged.  
  - **Valuable**: Each story delivers clear user or business value.  
  - **Estimable**: Effort can be estimated in days.  
  - **Small**: Fits within a single iteration (≤ 5 days).  
  - **Testable**: Acceptance criteria are clear or implied.  

- **MoSCoW Prioritization**:  
  - **Must-have**: Critical for MVP.  
  - **Should-have**: Important but can slip to later.  
  - **Could-have**: Optional; can be dropped if necessary.  
  - **Won’t-have**: Out of scope for this release.

---

## 3. Full Backlog Summary

See `initial_backlog_ideas.md` for the full list of 14 user stories.  
**Summary Totals:**  
- Must-have (Stories 1–5): **19 days**  
- Should-have (Stories 6–8): **7 days**  
- Could-have/Won’t-have: **20 days**  

Combined Must + Should = **26 days**, which fits within the first two iterations.

---

## 4. Iteration Templates

### 4.1 Iteration 1 (21 May – 10 June 2025)

- **Branch:** `iteration-1`  
- **Goals & Stories:** Defined in `iteration_1.md` (total estimate: 17 days)  
- **Deliverables:**  
  1. UI wireframes → `docs/wireframes/`  
  2. ER diagram → `docs/db/schema.png`  
  3. Profile & booking stubs → `src/`  
  4. Mock payment page → `src/`  
  5. Unit tests → `tests/`  
  6. UAT plan → `docs/uat_plan.md`  

### 4.2 Iteration 2 (11 June – 1 July 2025)

- **Branch:** `iteration-2`  
- **Goals & Stories:** Defined in `iteration_2.md` (total estimate: 11 days)  
- **Deliverables:**  
  1. Rating & review feature → `src/`  
  2. Earnings dashboard → `src/`  
  3. Messaging feature → `src/`  
  4. Admin verification stub → `src/`  
  5. UAT results → `docs/uat_results_iteration2.md`  

---

## 5. Handling Scope Constraints

If capacity is limited, deprioritize/cut the following stories:

### Deprioritized Stories (Scope Cut)

- [ ] **Customer Messaging to Cleaner**  
  Priority: Could-have | Estimate: 2 days

- [ ] **Admin/Staff Cleaner Verification**  
  Priority: Could-have | Estimate: 4 days

- [ ] **SMS Reminder for Upcoming Bookings**  
  Priority: Won’t-have | Estimate: 3 days

- [ ] **Subscription Model for Regular Bookings**  
  Priority: Won’t-have | Estimate: 5 days

**Total Cut:** 14 days
