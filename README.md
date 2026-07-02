# 🎓 Student Database Management System — Frontend

A React single-page application for managing student records — add, edit, delete, search, sort, and filter students through a clean UI. This is the frontend half of a full-stack project; it talks to the [Student-Database-Backend](../Student-Database-Backend) REST API for all data.

## How the Project Works

1. On load, the app calls the backend to fetch the full student list, the list of departments, and the total student count.
2. Students are rendered in a table (`StudentTable`). You can:
   - **Add** a new student via a form (`StudentForm`), which `POST`s to the API.
   - **Edit** an existing student — the form pre-fills and `PUT`s the update.
   - **Delete** a student with a confirm prompt, which `DELETE`s the record.
   - **Search** by keyword using the search bar (`SearchBar`), which hits a `/search` endpoint.
   - **Sort** by clicking column headers (toggles ascending/descending).
   - **Filter** by department using a dropdown populated from the backend.
3. All API calls are centralized in `src/services/api.js`, so the UI components never talk to `axios` directly — they just call `api.getAll()`, `api.create()`, etc.
4. Success/error banners are shown briefly after each action using local component state.

## Tech Stack
 
|     Layer         |                 Technology                              |
|-------------------|---------------------------------------------------------|
| UI Library        | React 19                                                |
| Bundler / Tooling | Create React App (`react-scripts`)                      |
| HTTP Client       | Axios                                                   |
| Styling           | Plain CSS (`App.css`, `index.css`)                      |
| Testing           | Jest + React Testing Library (via `react-scripts test`) |

## Project Structure

```
src/
├── components/
│   ├── StudentForm.js     # Add/Edit form
│   ├── StudentTable.js    # Table with sort/edit/delete actions
│   └── SearchBar.js       # Keyword search input
├── services/
│   └── api.js             # All backend API calls (Axios)
├── App.js                 # Main app logic & state management
├── App.css / index.css    # Styling
└── index.js                # React entry point
```

## API Endpoints Used

The frontend expects the backend to be running and reachable at the URL configured in `src/services/api.js` (`BASE_URL`). It calls:

| Action | Method | Endpoint |
|---|---|---|
| Get all students | GET | `/api/students` |
| Get student by ID | GET | `/api/students/{id}` |
| Create student | POST | `/api/students` |
| Update student | PUT | `/api/students/{id}` |
| Delete student | DELETE | `/api/students/{id}` |
| Search students | GET | `/api/students/search?keyword=...` |
| Sort students | GET | `/api/students/sort?sortBy=...&order=...` |
| Filter by department | GET | `/api/students/filter?department=...` |
| Get department list | GET | `/api/students/departments` |
| Get total count | GET | `/api/students/count` |

> If you're running the backend locally, update `BASE_URL` in `src/services/api.js` to point at `http://localhost:8080/api/students` (or wherever your backend is hosted).

## How to Build & Run

### Prerequisites
- Node.js (v18+ recommended) and npm installed
- The backend service running and reachable (see the backend repo's README)

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/sabarichill/Student-Database-Frontend.git
cd Student-Database-Frontend

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

The app runs at [http://localhost:3000](http://localhost:3000) and will hot-reload as you edit files.

### Build for Production

```bash
npm run build
```

This creates an optimized, minified build in the `build/` folder, ready to deploy to any static host (Netlify, Vercel, GitHub Pages, etc.).

## Running Tests

```bash
npm test
```

This launches the test runner in interactive watch mode using Jest and React Testing Library. Test files live alongside components (e.g. `App.test.js`). Add new test files as `ComponentName.test.js` to test individual components or UI behavior (rendering, button clicks, form submission, etc.).

## Environment Notes

- The `.env` file can be used to override configuration such as the API base URL if you refactor `api.js` to read from `process.env` instead of a hardcoded constant.
- CORS must be enabled on the backend (it already is, via `@CrossOrigin(origins = "*")`) for this frontend to communicate with it from a different port/origin.

## Possible Improvements

- Move `BASE_URL` into an environment variable instead of hardcoding it.
- Add pagination for large student lists.
- Add form validation (email format, required fields) before submitting.
- Add loading/error states per action instead of a single global message.
