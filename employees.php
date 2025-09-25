 <?php
include 'config.php';
header('Content-Type: application/json');

$action = $_GET['action'] ?? '';

if ($action == 'list') {
    $page = isset($_GET['page']) ? intval($_GET['page']) : 1;
    $limit = 5;
    $offset = ($page - 1) * $limit;
    $name = $_GET['name'] ?? '';
    $department = $_GET['department'] ?? '';

    $sql = "SELECT * FROM employees WHERE 1=1";
    $params = [];
    $types = "";

    if ($name != '') {
        $sql .= " AND name LIKE ?";
        $params[] = "%$name%";
        $types .= "s";
    }
    if ($department != '') {
        $sql .= " AND department = ?";
        $params[] = $department;
        $types .= "s";
    }

    $count_sql = $sql;
    $stmt = $conn->prepare($count_sql);
    if ($types != "") {
        $stmt->bind_param($types, ...$params);
    }
    $stmt->execute();
    $result = $stmt->get_result();
    $total = $result->num_rows;

    $sql .= " LIMIT ? OFFSET ?";
    $params[] = $limit;
    $params[] = $offset;
    $types .= "ii";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param($types, ...$params);
    $stmt->execute();
    $employees = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

    echo json_encode(["employees" => $employees, "total" => $total]);
}

elseif ($action == 'add') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!empty($data['name']) && !empty($data['email']) && !empty($data['department']) && !empty($data['position'])) {
        $stmt = $conn->prepare("INSERT INTO employees (name, email, department, position) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $data['name'], $data['email'], $data['department'], $data['position']);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "✅ Employee added successfully!"]);
        } else {
            echo json_encode(["status" => "error", "message" => "❌ Database error: " . $conn->error]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "⚠️ All fields are required."]);
    }
}


elseif ($action == 'update') {
    $data = json_decode(file_get_contents("php://input"), true);
    $stmt = $conn->prepare("UPDATE employees SET name=?, email=?, department=?, position=? WHERE id=?");
    $stmt->bind_param("ssssi", $data['name'], $data['email'], $data['department'], $data['position'], $data['id']);
    $stmt->execute();
    echo json_encode(["success" => true]);
}

elseif ($action == 'delete') {
    $id = $_GET['id'];
    $stmt = $conn->prepare("DELETE FROM employees WHERE id=?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    echo json_encode(["success" => true]);
}

?>





