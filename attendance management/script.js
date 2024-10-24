const users = JSON.parse(localStorage.getItem('users')) || [];
const attendance = JSON.parse(localStorage.getItem('attendance')) || {};

function register() {
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;
    const registerMessage = document.getElementById("registerMessage");

    if (users.find(user => user.username === username)) {
        registerMessage.textContent = "Username already exists.";
        return;
    }

    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users)); // Save to local storage
    registerMessage.textContent = "User registered successfully.";
    document.getElementById("registerUsername").value = "";
    document.getElementById("registerPassword").value = "";
}

function login() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    const loginMessage = document.getElementById("loginMessage");

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        markAttendance(username);
        localStorage.setItem('currentUser', username); // Store the current user
        window.location.href = 'attendance.html'; // Redirect to attendance page
    } else {
        loginMessage.textContent = "Invalid username or password.";
    }
}

function markAttendance(username) {
    attendance[username] = attendance[username] || [];
    attendance[username].push(new Date().toLocaleString()); // Record attendance with timestamp
    localStorage.setItem('attendance', JSON.stringify(attendance)); // Save to local storage
}

function logout() {
    localStorage.removeItem('currentUser'); // Clear current user
    window.location.href = 'index.html'; // Redirect to login page
}

// On attendance.html load, display the attendance
if (window.location.pathname.includes('attendance.html')) {
    displayAttendance(); // Display attendance
}
// ... existing code ...

function displayAttendance() {
    const userAttendance = document.getElementById("userAttendance");
    const username = localStorage.getItem('currentUser'); // Get the current user from localStorage

    userAttendance.innerHTML = `<h2>${username}'s Attendance</h2>`;
    const table = document.createElement("table");
    const headerRow = document.createElement("tr");
    headerRow.innerHTML = "<th>Timestamp</th>";
    table.appendChild(headerRow);

    if (attendance[username]) {
        attendance[username].forEach(time => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${time}</td>`;
            table.appendChild(row);
        });
        userAttendance.appendChild(table);
    } else {
        userAttendance.innerHTML += "<p>No attendance recorded.</p>";
    }
}


function sendRequest(event) {
    event.preventDefault(); // Prevent the default form submission
    
    const requestMessage = document.getElementById("correctionRequest").value;
    const username = localStorage.getItem('currentUser');

    // Validate input
    if (requestMessage.trim() === "") {
        document.getElementById("requestMessage").textContent = "Please enter a message.";
        return;
    }

    // Simulate sending request (in a real application, this would involve an API call)
    console.log(`Request from ${username}: ${requestMessage}`);
    document.getElementById("requestMessage").textContent = "Request sent to admin successfully!";
    
    // After a short delay, redirect back to attendance page
    setTimeout(() => {
        window.location.href = 'attendance.html';
    }, 1000); // Redirect after 1 second
}

function goBack() {
    window.location.href = 'attendance.html'; // Go back to the attendance page
}

