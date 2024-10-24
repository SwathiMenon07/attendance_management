import java.util.Scanner;

public class Main {
    private static UserManager userManager = new UserManager();
    private static AttendanceDisplay attendanceDisplay = new AttendanceDisplay();

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int choice;

        do {
            System.out.println("1. Login");
            System.out.println("2. New User");
            System.out.println("3. Exit");
            System.out.print("Choose an option: ");
            choice = scanner.nextInt();
            scanner.nextLine(); // Consume newline

            switch (choice) {
                case 1:
                    login(scanner);
                    break;
                case 2:
                    registerNewUser(scanner);
                    break;
                case 3:
                    System.out.println("Exiting...");
                    break;
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        } while (choice != 3);
    }

    private static void login(Scanner scanner) {
        System.out.print("Enter username: ");
        String username = scanner.nextLine();
        System.out.print("Enter password: ");
        String password = scanner.nextLine();

        User user = userManager.findUser(username, password);
        if (user != null) {
            System.out.println("Login successful! Marking attendance...");
            attendanceDisplay.markAttendance(username);
            attendanceDisplay.displayAttendance();
        } else {
            System.out.println("Invalid username or password.");
        }
    }

    private static void registerNewUser(Scanner scanner) {
        System.out.print("Enter a new username: ");
        String username = scanner.nextLine();
        if (userManager.userExists(username)) {
            System.out.println("Username already exists. Please try a different one.");
            return;
        }

        System.out.print("Enter a password: ");
        String password = scanner.nextLine();
        userManager.addUser(username, password);
        System.out.println("User registered successfully.");
    }
}
