====================================================
EMPLOYEE DIRECTORY SYSTEM
====================================================

Author: Mahammad Shahad  
Project: Employee Directory System (Interview Task)  
Technologies: HTML, CSS, JavaScript, PHP, MySQL  

----------------------------------------------------
📌 1. PROJECT OVERVIEW
----------------------------------------------------
This is a web-based Employee Directory System that allows managing employee records with full 
CRUD operations (Create, Read, Update, Delete).  
The system supports filtering by name/department and pagination for better usability.

----------------------------------------------------
📌 2. FEATURES
----------------------------------------------------
- View a list of employees with pagination (5 per page).
- Add a new employee via a form.
- Edit employee details.
- Delete an employee with confirmation.
- Filter employees by name or department.
- Success and error messages for all operations.

----------------------------------------------------
📌 3. TECHNOLOGIES USED
----------------------------------------------------
- Frontend: HTML, CSS, JavaScript .
- Backend: PHP .
- Database: MySQL (accessed via XAMPP).
- Server: Apache (via XAMPP).

----------------------------------------------------
📌 4. FILE / FOLDER STRUCTURE
----------------------------------------------------
/employee-directory-system-Mahammad-Shahad
  ├─ index.html         -> Main UI page (employee list, form, filters, pagination)
  ├─ employees.php      -> Backend PHP file (handles CRUD, filter, pagination)
  ├─ config.php         -> Database connection file
  ├─ db.sql             -> SQL script to create and populate the database
  ├─ README.txt         -> Setup + documentation (this file)
  └─ style.css          -> All styles for layout, table, forms, messages
  └─ script.js          -> Frontend logic (fetch API calls, DOM updates, messages)

----------------------------------------------------
📌 5. SETUP INSTRUCTIONS (XAMPP)
----------------------------------------------------
1. Install XAMPP (https://www.apachefriends.org/).
2. Start "Apache" and "MySQL" from the XAMPP Control Panel.
3. Place the project folder inside:
   C:\xampp\htdocs\employee-directory-system
4. Create a database in phpMyAdmin:
   - Open http://localhost/phpmyadmin
   - Create a new database named: employee_directory
   - Import the provided `db.sql` file into this database.
5. Update `config.php` if needed (default user is root with no password).
6. Run the project in browser:
   http://localhost/employee-directory/index.html

----------------------------------------------------
📌 6. HOW FEATURES ARE IMPLEMENTED
----------------------------------------------------
- Database (db.sql):
  Table `employees` stores employee details (id, name, email, department, position).

- Backend (employees.php):
  - Uses `action` query parameter (?action=add, ?action=edit, ?action=delete, ?action=list).
  - Handles CRUD operations with prepared statements.
  - Returns JSON responses with {status, message}.
  - Implements server-side filtering and pagination.

- Frontend (index.html + script.js):
  - Displays employee table and forms.
  - Uses JavaScript `fetch` API to call `employees.php`.
  - Dynamically updates DOM with employee data.
  - Shows success/error messages in a message box.
  - Pagination controls ("Previous", "Next") are handled via JS.

- Styling (style.css):
  - Clean table design with alternating row colors.
  - Styled forms for Add/Edit employee.
  - Success/error message boxes .

----------------------------------------------------
📌 7. SAMPLE USAGE FLOW
----------------------------------------------------
1. Open the app in browser → Employee list loads (paginated).
2. Add Employee → Fill form → "Add Employee" → Success message.
3. Edit Employee → Click "Edit" → Modify details → Save → Success message.
4. Delete Employee → Click "Delete" → Confirm → Record removed.
5. Filter → Enter name or department → Click filter → Results update.
6. Pagination → Use "Previous" / "Next" → Navigate through employees.

----------------------------------------------------
📌 8. SCREENSHOTS (to add by user)
----------------------------------------------------
[ ] Employee list with pagination  
[ ] Add Employee form  
[ ] Edit Employee modal/form  
[ ] Delete confirmation  
[ ] Filtering in action 


====================================================
END OF DOCUMENT
====================================================
