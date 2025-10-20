#!/usr/bin/env python3
"""
Startup script for the Task Manager application.
This script ensures all dependencies are installed and starts the Flask app.
"""

import subprocess
import sys
import os

def check_dependencies():
    """Check if required packages are installed."""
    try:
        import flask
        import flask_sqlalchemy
        import flask_login
        import werkzeug
        print("[OK] All required packages are installed")
        return True
    except ImportError as e:
        print(f"[ERROR] Missing package: {e}")
        print("Installing required packages...")
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
            print("[OK] Packages installed successfully")
            return True
        except subprocess.CalledProcessError:
            print("[ERROR] Failed to install packages")
            return False

def start_application():
    """Start the Flask application."""
    print("Starting Task Manager Application...")
    print("=" * 40)
    
    if not check_dependencies():
        print("Please install dependencies manually:")
        print("pip install -r requirements.txt")
        return False
    
    print("\nApplication will be available at:")
    print("http://localhost:5000")
    print("\nPress Ctrl+C to stop the application")
    print("=" * 40)
    
    try:
        # Import and run the Flask app
        from app import app
        app.run(debug=True, host='0.0.0.0', port=5000)
    except KeyboardInterrupt:
        print("\n\nApplication stopped by user")
        return True
    except Exception as e:
        print(f"\n[ERROR] Failed to start application: {e}")
        return False

if __name__ == "__main__":
    print("Task Manager - Startup Script")
    print("=" * 30)
    
    success = start_application()
    
    if not success:
        print("\n[FAIL] Failed to start the application")
        sys.exit(1)
    else:
        print("\n[SUCCESS] Application stopped gracefully")
        sys.exit(0)



