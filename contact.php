<?php
    include "validation.php";

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;

    require 'vendor/autoload.php';

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $recaptcha_secret = "6LeHK-ApAAAAAJ4Sj3zw0ADmaBuvNN_96dw_cvMy";
        $recaptcha_response = $_POST['token'];
        $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$recaptcha_secret}&response={$recaptcha_response}");
        $response_keys = json_decode($response, true);

        if ($response_keys["success"]) {
            $subject = clean_input($_POST["subject"]);
            $name = clean_input($_POST["name"]);
            $email = clean_input($_POST["email"]);
            $message = clean_input($_POST["message"]);
        
            if (validate($subject, $name, $email, $message)) {
                sendMail($subject, $name, $email, $message);
                echo "Success";
            } else {
                echo "Validation failed";
            }
        } else {
            echo "reCAPTCHA verification failed";
        }
    } else {
        echo "Invalid request method";
    }

    function validate($subject, $name, $email, $message){
        $errors = array();

        if (empty($subject)) {
            $errors[0] = "Subject is required";
        } else if(!is_valid_alphabetic($subject)){
            $errors[0] = "Subject should only contain alphabetic characters";
        } 

        if (empty($name)) {
            $errors[1] = "Name is required";
        } else if(!is_valid_name($name)){
            $errors[1] = "Name should only contain alphabetic characters";
        }

        if (empty($email)) {
            $errors[2] = "Email is required";
        } else if (!is_valid_email_input($email)) {
            $errors[2] = "Please enter a valid email address";
        }

        if (empty($message)) {
            $errors[3] = "Message is required";
        } 

        if(empty($errors)){
            return true;
        } else{
            return false;
        }
    }

    function sendMail($subject, $name, $email, $message){
        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'vallealijah.test@gmail.com';
        $mail->Password   = 'ycebcegdxlhwneug';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587; 

        $mail->addAddress('vallealijah.test@gmail.com');
        $body = "Name: $name\n";
        $body .= "Email: $email\n";
        $body .= "Message:\n$message";

        $mail->Subject = $subject;
        $mail->Body = "$body";

        $mail->send();
    }
?>
