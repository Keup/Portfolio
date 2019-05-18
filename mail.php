<?php
// PHP mailer initialisation
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

$mail = new PHPMailer(true);

// Char string sanitizing
$firstname = filter_input(INPUT_POST, 'firstname', FILTER_SANITIZE_STRING);
$lastname = filter_input(INPUT_POST, 'lastname', FILTER_SANITIZE_STRING);
$phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_NUMBER_INT);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);
$token = filter_input(INPUT_POST, 'token', FILTER_SANITIZE_STRING);

// Captcha verification
if(!$token){
    exit;
} else {
    $recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
    $recaptcha_secret = getenv('CAPTCHA');
    $recaptcha_response = $token;

    $recaptcha = file_get_contents($recaptcha_url . '?secret=' . $recaptcha_secret . '&response=' . $recaptcha_response);
    $recaptcha = json_decode($recaptcha);

    if ($recaptcha->score >= 0.5) {
            try {
        // PHPMailer configuration
        //Server settings
        $mail->SMTPDebug = 0;                                       // Enable verbose debug output
        $mail->isSMTP();                                            // Set mailer to use SMTP
        $mail->Host       = 'ssl0.ovh.net';                       // Specify main and backup SMTP servers
        $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
        $mail->Username   = getenv('CONTACT_LOGIN');                     // SMTP username                 
        $mail->Password   = getenv('CONTACT_PASSWORD');                               // SMTP password                             
        $mail->SMTPSecure = 'tls';                                  // Enable TLS encryption, `ssl` also accepted
        $mail->Port       = 587;                                    // TCP port to connect to
        $mail->setLanguage('fr', '/optional/path/to/language/directory/');
        $mail->CharSet    = 'UTF-8';

        //Recipients
        $mail->setFrom('contact@julien-villard.tech', $firstname . ' ' . $lastname);
        $mail->addAddress('contact@julien-villard.tech', 'Julien Villard');     

        // Content
        $mail->isHTML(true);                                  // Set email format to HTML
        $mail->Subject = 'Contact Portfolio';
        $mail->Body    = '<h2>Nom : </h2> <p>' . $firstname . ' ' . $lastname . '</p> <h2>Mail : </h2><p>' . $email . '</p> <h2>Téléphone : </h2><p>' . $phone . '</p> <h2>Message : </h2><p>' . $message . '</p>';
        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

        $mail->send();
        echo 'Success';
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    } else {
        echo "Robot";
    }
};
?>