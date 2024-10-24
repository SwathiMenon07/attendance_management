import java.util.HashMap;
import java.util.Map;

public class AttendanceDisplay {
    private Map<String, Boolean> attendance = new HashMap<>();

    public void markAttendance(String username) {
        attendance.put(username, true);
    }

    public void displayAttendance() {
        System.out.println("Attendance:");
        for (Map.Entry<String, Boolean> entry : attendance.entrySet()) {
            System.out.println(entry.getKey() + ": " + (entry.getValue() ? "Present" : "Absent"));
        }
    }
}

