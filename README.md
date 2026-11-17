# BookNest — AI-Assisted Feature Development

## Scenario
You have joined the BookNest team as a full-stack developer. The existing library application works, but members cannot reserve books or join a waitlist.

Your task is to explore the existing codebase and implement the **Book Reservation & Waitlist** feature.

## Existing functionality
- Browse books
- Search by title or author
- Filter by category
- View book details
- See total and available copies

## Feature to implement
1. A member can reserve a book if a copy is available.
2. If no copies are available, a member can join the waitlist.
3. A member can view their reservations and waitlist entries.
4. A member can cancel an active reservation or waitlist entry.
5. When a copy becomes available, the next waiting member should be promoted to a reservation and the status should be updated.

## Important constraints
- This is a starter project. The feature above is intentionally NOT implemented.
- Do not replace the app or rewrite the existing catalog.
- Keep changes focused and integrate with the existing structure.
- Data is in memory. Restarting the backend resets data.
- Authentication is simulated with a fixed demo member ID: `member-101`.
- No real email/SMS service is required. A status update in the member's reservation list counts as the notification for this exercise.
- Handle duplicate active reservations/waitlist entries for the same member and book.
- Validate invalid book IDs and cancellation of already-cancelled entries.

## Run the application

### Backend
```bash
cd backend
npm install
npm run dev
```
Backend: http://localhost:4000

### Frontend (new terminal)
```bash
cd frontend
npm install
npm run dev
```
Frontend: http://localhost:5173

## Suggested candidate workflow
1. Run the app and explore the existing code.
2. Explain the current frontend/backend architecture.
3. Break the feature into UI, API, and data-handling tasks.
4. Ask AI to inspect the codebase and propose an implementation plan.
5. Implement one small part at a time.
6. Review every diff; do not blindly accept generated code.
7. Test available-copy, no-copy, duplicate, cancellation, and waitlist-promotion scenarios.
8. Explain design decisions and limitations.

## Evaluation focus
- Understanding an unfamiliar codebase
- Feature decomposition and API design
- Correct frontend/backend integration
- Data consistency and edge-case handling
- Effective AI prompting and code review
- Testing and communication
