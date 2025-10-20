// Task Manager JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Filter functionality
    const statusFilter = document.getElementById('status_filter');
    const priorityFilter = document.getElementById('priority_filter');
    const searchInput = document.getElementById('search');

    if (statusFilter) {
        statusFilter.addEventListener('change', filterTasks);
    }
    if (priorityFilter) {
        priorityFilter.addEventListener('change', filterTasks);
    }
    if (searchInput) {
        searchInput.addEventListener('input', filterTasks);
    }

    // Set today's date as minimum for due date inputs
    const today = new Date().toISOString().split('T')[0];
    const dueDateInputs = document.querySelectorAll('input[type="date"]');
    dueDateInputs.forEach(input => {
        input.setAttribute('min', today);
    });
});

// Filter tasks based on status, priority, and search
function filterTasks() {
    const statusFilter = document.getElementById('status_filter');
    const priorityFilter = document.getElementById('priority_filter');
    const searchInput = document.getElementById('search');
    
    const status = statusFilter ? statusFilter.value : '';
    const priority = priorityFilter ? priorityFilter.value : '';
    const search = searchInput ? searchInput.value.toLowerCase() : '';
    
    // Build query parameters
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (priority) params.append('priority', priority);
    
    // Make AJAX request to filter tasks
    fetch(`/filter_tasks?${params.toString()}`)
        .then(response => response.text())
        .then(html => {
            const taskList = document.getElementById('task-list');
            if (taskList) {
                taskList.innerHTML = html;
                
                // Apply search filter on client side
                if (search) {
                    const rows = taskList.querySelectorAll('tbody tr');
                    rows.forEach(row => {
                        const title = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
                        const description = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
                        
                        if (title.includes(search) || description.includes(search)) {
                            row.style.display = '';
                        } else {
                            row.style.display = 'none';
                        }
                    });
                }
            }
        })
        .catch(error => {
            console.error('Error filtering tasks:', error);
        });
}

// Helper to read CSRF token from meta
function getCsrfToken() {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta ? meta.getAttribute('content') : '';
}

// Toggle task completion status
function toggleTask(e, taskId) {
    const button = e.target.closest('button');
    const originalContent = button.innerHTML;
    
    // Show loading state
    button.innerHTML = '<span class="loading"></span>';
    button.disabled = true;
    
    fetch(`/toggle_task/${taskId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCsrfToken(),
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
            button.innerHTML = originalContent;
            button.disabled = false;
            return;
        }
        
        // Update button appearance
        if (data.status === 'Completed') {
            button.className = 'btn btn-sm btn-success';
            button.innerHTML = '<i class="fas fa-check-circle"></i>';
        } else {
            button.className = 'btn btn-sm btn-outline-secondary';
            button.innerHTML = '<i class="fas fa-circle"></i>';
        }
        
        // Reload the page to update the table
        setTimeout(() => {
            location.reload();
        }, 500);
    })
    .catch(error => {
        console.error('Error:', error);
        button.innerHTML = originalContent;
        button.disabled = false;
        alert('An error occurred while updating the task.');
    });
}

// Edit task
function editTask(e) {
    const button = e.currentTarget;
    const payload = button.getAttribute('data-task');
    const task = payload ? JSON.parse(payload) : null;
    if (!task) return;

    // Populate the edit form
    document.getElementById('edit_title').value = task.title || '';
    document.getElementById('edit_description').value = task.description || '';
    document.getElementById('edit_priority').value = task.priority || 'Medium';
    document.getElementById('edit_status').value = task.status || 'Pending';
    document.getElementById('edit_due_date').value = task.due_date || '';
    
    // Set the form action
    const form = document.getElementById('editTaskForm');
    form.action = `/update_task/${task.id}`;
    
    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('editTaskModal'));
    modal.show();
}

// Delete task with confirmation
function deleteTask(e, taskId) {
    if (confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
        // Show loading state
        const button = e.target.closest('button');
        const originalContent = button.innerHTML;
        button.innerHTML = '<span class="loading"></span>';
        button.disabled = true;
        
        fetch(`/delete_task/${taskId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCsrfToken(),
            }
        })
        .then(response => {
            if (response.ok) {
                // Remove the row from the table
                const row = button.closest('tr');
                if (row) {
                    row.style.opacity = '0.5';
                    row.style.transition = 'opacity 0.3s ease';
                    setTimeout(() => {
                        row.remove();
                    }, 300);
                }
            } else {
                throw new Error('Failed to delete task');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            button.innerHTML = originalContent;
            button.disabled = false;
            alert('An error occurred while deleting the task.');
        });
    }
}

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        }
    });
    
    return isValid;
}

// Add form validation to all forms
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
    });
});

// Auto-hide alerts after 5 seconds
document.addEventListener('DOMContentLoaded', function() {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }, 5000);
    });
});

// Smooth scrolling for anchor links
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

// Add loading state to buttons on form submission
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitButton = this.querySelector('button[type="submit"]');
            if (submitButton) {
                const originalText = submitButton.innerHTML;
                submitButton.innerHTML = '<span class="loading"></span> Processing...';
                submitButton.disabled = true;
                
                // Re-enable button after 3 seconds as fallback
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }, 3000);
            }
        });
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('search');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => {
            const bsModal = bootstrap.Modal.getInstance(modal);
            if (bsModal) {
                bsModal.hide();
            }
        });
    }
});

// Add today's date to new task form
document.addEventListener('DOMContentLoaded', function() {
    const dueDateInput = document.getElementById('due_date');
    if (dueDateInput && !dueDateInput.value) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        dueDateInput.value = tomorrow.toISOString().split('T')[0];
    }
});



