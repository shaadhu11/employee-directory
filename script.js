let currentPage = 1;

document.getElementById("employeeForm").addEventListener("submit", saveEmployee);


function loadEmployees(page = 1) {
  currentPage = page;
  const name = document.getElementById("filterName").value;
  const dept = document.getElementById("filterDepartment").value;

  fetch(`employees.php?action=list&page=${page}&name=${name}&department=${dept}`)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector("#employeeTable tbody");
      tbody.innerHTML = "";
      data.employees.forEach(emp => {
        tbody.innerHTML += `
          <tr>
            <td>${emp.name}</td>
            <td>${emp.email}</td>
            <td>${emp.department}</td>
            <td>${emp.position}</td>
            <td class="actions">
              <button class="edit" onclick="editEmployee(${emp.id}, '${emp.name}', '${emp.email}', '${emp.department}', '${emp.position}')">Edit</button>
              <button class="delete" onclick="deleteEmployee(${emp.id})">Delete</button>
            </td>
          </tr>
        `;
      });

      renderPagination(data.total, page);
    });
}

function renderPagination(total, current) {
  const perPage = 5;
  const totalPages = Math.ceil(total / perPage);
  let html = "";

  if (current > 1) {
    html += `<button onclick="loadEmployees(${current - 1})">Prev</button>`;
  }

  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="${i === current ? 'active' : ''}" onclick="loadEmployees(${i})">${i}</button>`;
  }

  if (current < totalPages) {
    html += `<button onclick="loadEmployees(${current + 1})">Next</button>`;
  }

  document.getElementById("pagination").innerHTML = html;
}


function showMessage(type, text) {
  const messageDiv = document.getElementById("message");
  messageDiv.innerText = text;
  messageDiv.className = type; // "success" or "error"

  setTimeout(() => {
    messageDiv.innerText = "";
    messageDiv.className = "";
  }, 3000); // auto-hide after 3s
}
function saveEmployee(e) {
  e.preventDefault();
  const id = document.getElementById("employeeId").value;
  const data = {
    id,
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    department: document.getElementById("department").value,
    position: document.getElementById("position").value
  };

  const action = id ? "update" : "add";

  fetch(`employees.php?action=${action}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(response => {
    if (response.status === "success" || response.success) {
      showMessage("success", response.message || "✅ Employee saved successfully!");
      document.getElementById("employeeForm").reset();
      document.getElementById("formTitle").innerText = "Add Employee";
      loadEmployees(currentPage);
    } else {
      showMessage("error", response.message || "❌ Something went wrong!");
    }
  })
  .catch(() => showMessage("error", "⚠️ Network error, try again later."));
}

function deleteEmployee(id) {
  if (confirm("Are you sure you want to delete this employee?")) {
    fetch(`employees.php?action=delete&id=${id}`)
      .then(res => res.json())
      .then(response => {
        if (response.success) {
          showMessage("success", "✅ Employee deleted successfully!");
          loadEmployees(currentPage);
        } else {
          showMessage("error", "❌ Failed to delete employee!");
        }
      })
      .catch(() => showMessage("error", "⚠️ Network error, try again later."));
  }
}

function editEmployee(id, name, email, dept, pos) {
  document.getElementById("employeeId").value = id;
  document.getElementById("name").value = name;
  document.getElementById("email").value = email;
  document.getElementById("department").value = dept;
  document.getElementById("position").value = pos;
  document.getElementById("formTitle").innerText = "Edit Employee";
}
window.onload = () => loadEmployees();
