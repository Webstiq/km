<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Pobieranie danych z formularza
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = trim($_POST['msg']); // Nie używamy htmlspecialchars, aby można było filtrować lepiej później

    $errors = [];

    // Walidacja imienia i nazwiska
    if (empty($name) || str_word_count($name) < 2) {
        $errors[] = "Proszę podać pełne imię i nazwisko.";
    }

    // Walidacja adresu e-mail (z użyciem wyrażenia regularnego)
    $emailPattern = '/^[^\s@]+@[^\s@]+\.[^\s@]+$/';
    if (empty($email)) {
        $errors[] = "Adres e-mail nie może być pusty.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL) || !preg_match($emailPattern, $email)) {
        $errors[] = "Proszę podać poprawny adres e-mail.";
    }

    // Walidacja treści wiadomości
    if (empty($message) || strlen($message) < 10) {
        $errors[] = "Treść wiadomości musi zawierać co najmniej 10 znaków.";
    } else {
        // Usuwanie potencjalnie złośliwych skryptów i tagów
        $message = strip_tags($message); // Usunięcie wszystkich znaczników HTML i JS
        $blacklist = [
            '<script', '<?php', '?>', '<%', '%>', 'onerror', 'onload', 'javascript:',  // HTML/JS/PHP
            'import ', 'exec(', 'eval(', 'os.system', 'subprocess',                  // Python
            '#include', 'int main', 'std::', 'printf(', 'scanf(', 'cout', 'cin',    // C/C++
            'public static void main', 'System.out.println',                        // Java
            'SELECT * FROM', 'DROP TABLE', 'INSERT INTO', 'DELETE FROM',            // SQL Injection
            '$(', 'rm -rf', 'chmod ', 'curl ', 'wget ',                             // Linux/bash
            'PowerShell', 'New-Object', 'Invoke-Command'                            // PowerShell
        ];
        foreach ($blacklist as $term) {
            if (stripos($message, $term) !== false) {
                $errors[] = "Treść wiadomości zawiera niedozwolone elementy: \"$term\".";
                break;
            }
        }
    }

    // Jeśli są błędy, zwróć je
    if (!empty($errors)) {
        echo "<ul>";
        foreach ($errors as $error) {
            echo "<li style='color: red;'>$error</li>";
        }
        echo "</ul>";
        exit;
    }

    // Jeśli brak błędów, wyślij wiadomość
    $to = "kontakt@firma.com";
    $subject = "Nowa wiadomość od $name";
    $headers = "From: $email\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8";
    $body = "Imię i nazwisko: $name\nE-mail: $email\n\nTreść wiadomości:\n$message";

    if (mail($to, $subject, $body, $headers)) {
        echo "<p style='color: green;'>Wiadomość została wysłana pomyślnie.</p>";
    } else {
        echo "<p style='color: red;'>Wystąpił błąd podczas wysyłania wiadomości.</p>";
    }
} else {
    echo "<p style='color: red;'>Nieprawidłowe żądanie.</p>";
}