# Task Management Web Application

A comprehensive task management system built with Flask, featuring user authentication, task CRUD operations, filtering, and a responsive design.

## Features

### 🔐 User Authentication
- Secure user registration and login
- Password hashing for security
- Session management with Flask-Login

### 📝 Task Management
- Create, read, update, and delete tasks
- Set task priorities (Low, Medium, High)
- Add due dates and descriptions
- Mark tasks as complete/incomplete

### 🔍 Filtering & Search
- Filter tasks by status (Pending/Completed)
- Filter by priority level
- Search tasks by title or description
- Real-time filtering with AJAX

### 📊 Dashboard
- Task statistics overview
- Visual cards showing total, completed, pending, and overdue tasks
- Color-coded priority indicators
- Overdue task highlighting

### 📱 Responsive Design
- Mobile-first design approach
- Bootstrap 5 for responsive layout
- Font Awesome icons
- Custom CSS for enhanced styling

## Tech Stack

- **Backend**: Flask (Python)
- **Database**: SQLite
- **Frontend**: HTML5, CSS3, JavaScript, Bootstrap 5
- **Authentication**: Flask-Login, Werkzeug
- **Icons**: Font Awesome 6

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-management
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set your secret key:
   ```
   SECRET_KEY=your-secret-key-here
   ```

5. **Run the application**
   ```bash
   python app.py
   ```

6. **Access the application**
   Open your browser and navigate to `http://localhost:5000`

## Usage

### Getting Started
1. Register a new account or login with existing credentials
2. Access the dashboard to view your task statistics
3. Add new tasks using the form at the top of the dashboard
4. Use filters and search to find specific tasks
5. Click the status button to mark tasks as complete/incomplete
6. Use the edit button to modify task details
7. Delete tasks using the delete button (with confirmation)

### Task Management
- **Add Task**: Fill out the form with title, description, priority, and due date
- **Edit Task**: Click the edit button to modify any task details
- **Complete Task**: Click the status button to toggle completion
- **Delete Task**: Click the delete button and confirm the action

### Filtering Options
- **Status Filter**: Show all, pending, or completed tasks
- **Priority Filter**: Filter by Low, Medium, or High priority
- **Search**: Type in the search box to find tasks by title or description

## Project Structure

```
task-management/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── README.md             # Project documentation
├── .env.example          # Environment variables template
├── templates/            # HTML templates
│   ├── base.html         # Base template
│   ├── index.html        # Home page
│   ├── login.html        # Login page
│   ├── register.html     # Registration page
│   ├── dashboard.html    # Main dashboard
│   └── task_list.html    # Task list partial
└── static/               # Static files
    ├── style.css         # Custom CSS
    └── script.js         # JavaScript functionality
```

## Database Schema

### Users Table
- `id`: Primary key
- `username`: Unique username
- `email`: Unique email address
- `password_hash`: Hashed password
- `created_at`: Account creation timestamp

### Tasks Table
- `id`: Primary key
- `title`: Task title
- `description`: Task description
- `priority`: Task priority (Low/Medium/High)
- `status`: Task status (Pending/Completed)
- `due_date`: Task due date
- `created_at`: Task creation timestamp
- `updated_at`: Last update timestamp
- `user_id`: Foreign key to users table

## API Endpoints

- `GET /` - Home page
- `GET /register` - Registration page
- `POST /register` - Process registration
- `GET /login` - Login page
- `POST /login` - Process login
- `GET /logout` - Logout user
- `GET /dashboard` - Main dashboard
- `POST /add_task` - Add new task
- `POST /update_task/<id>` - Update existing task
- `GET /delete_task/<id>` - Delete task
- `GET /toggle_task/<id>` - Toggle task completion
- `GET /filter_tasks` - Filter tasks (AJAX)

## Security Features

- Password hashing with Werkzeug
- User session management
- CSRF protection with Flask-WTF
- Input validation and sanitization
- Secure authentication flow

## Deployment

### Local Development
The application runs on `http://localhost:5000` by default.

### Production Deployment
For production deployment, consider:

1. **Environment Variables**
   - Set `SECRET_KEY` to a secure random string
   - Configure database URL for production database
   - Set `FLASK_ENV=production`

2. **Database**
   - Use PostgreSQL or MySQL for production
   - Update `SQLALCHEMY_DATABASE_URI` in app.py

3. **Web Server**
   - Use Gunicorn or uWSGI with Nginx
   - Configure SSL certificates
   - Set up proper logging

4. **Platform Options**
   - **Render**: Easy deployment with automatic builds
   - **Heroku**: Popular platform with good Flask support
   - **PythonAnywhere**: Python-focused hosting
   - **DigitalOcean**: VPS with full control

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support or questions, please open an issue in the repository or contact the development team.

---

**Built with ❤️ using Flask and Bootstrap**






