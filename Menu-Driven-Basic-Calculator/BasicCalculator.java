import java.util.Scanner;

public class BasicCalculator {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        boolean continueCalculating = true;

        while (continueCalculating) {
            // Display menu options
            System.out.println("\nSimple Calculator Menu:");
            System.out.println("1. Addition");
            System.out.println("2. Subtraction");
            System.out.println("3. Multiplication");
            System.out.println("4. Division");
            System.out.println("5. Modulo");
            System.out.println("6. Exit");
            System.out.print("Choose an option (1-6): ");

            // Read user choice
            int choice = sc.nextInt();

            if (choice == 6) {
                // Exit the loop if the user chooses to exit
                continueCalculating = false;
                System.out.println("Exiting the calculator. Goodbye!");
            } else {
                // Perform calculations based on user choice
                System.out.print("Enter the first number: ");
                double num1 = sc.nextDouble();

                System.out.print("Enter the second number: ");
                double num2 = sc.nextDouble();

                double result = 0;
                boolean validOperation = true;

                switch (choice) {
                    case 1:
                        // Addition
                        result = num1 + num2;
                        System.out.println("Result: " + num1 + " + " + num2 + " = " + result);
                        break;
                    case 2:
                        // Subtraction
                        result = num1 - num2;
                        System.out.println("Result: " + num1 + " - " + num2 + " = " + result);
                        break;
                    case 3:
                        // Multiplication
                        result = num1 * num2;
                        System.out.println("Result: " + num1 + " * " + num2 + " = " + result);
                        break;
                    case 4:
                        // Division
                        if (num2 != 0) {
                            result = num1 / num2;
                            System.out.println("Result: " + num1 + " / " + num2 + " = " + result);
                        } else {
                            System.out.println("Error: Division by zero is not allowed.");
                            validOperation = false;
                        }
                        break;
                    case 5:
                        // Modulo
                        if (num2 != 0) {
                            result = num1 % num2;
                            System.out.println("Result: " + num1 + " % " + num2 + " = " + result);
                        } else {
                            System.out.println("Error: Modulo by zero is not allowed.");
                            validOperation = false;
                        }
                        break;
                    default:
                        // Invalid option handling
                        System.out.println("Invalid option. Please choose a number between 1 and 6.");
                        validOperation = false;
                        break;
                }

                if (validOperation) {
                    System.out.println("Calculation complete. Result: " + result);
                }
            }
        }
        System.out.println("\n****************** Happy Coding! ******************");
        sc.close();
    }
}
