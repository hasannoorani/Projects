import java.util.Scanner;

public class StudentScoreManager {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Define the number of students
        int numberOfStudents = 5;
        double[] scores = new double[numberOfStudents];

        System.out.println("********** Welcome To The Student Score Management System **********\n");

        // Input scores using a loop
        System.out.println("Enter the scores for " + numberOfStudents + " students:");
        for (int i = 0; i < numberOfStudents; i++) {
            System.out.print("Score for student " + (i + 1) + ": ");
            scores[i] = scanner.nextDouble();
        }

        // Calculate the average score
        double total = 0;
        for (int i = 0; i < numberOfStudents; i++) {
            total += scores[i];
        }
        double averageScore = total / numberOfStudents;

        // Find the highest and lowest scores
        double highestScore = scores[0];
        double lowestScore = scores[0];
        for (int i = 1; i < numberOfStudents; i++) {
            if (scores[i] > highestScore) {
                highestScore = scores[i];
            }
            if (scores[i] < lowestScore) {
                lowestScore = scores[i];
            }
        }

        // Display all scores
        System.out.println("\nAll entered scores:");
        for (int i = 0; i < numberOfStudents; i++) {
            System.out.println("Student " + (i + 1) + ": " + scores[i]);
        }

        // Display the average, highest, and lowest scores
        System.out.println("\nAverage Score: " + averageScore);
        System.out.println("Highest Score: " + highestScore);
        System.out.println("Lowest Score: " + lowestScore);

        System.out.println("\nThank you for using the Student Score Manager. Goodbye!");

        System.out.println("\n****************** Happy Coding! ******************");

        scanner.close();
    }
}
