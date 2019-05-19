// Materialize Jquery functionnality

$(document).ready(function () {
  $('.sidenav').sidenav();
  $('.parallax').parallax();
  $('textarea#message').characterCounter();
  $('.scrollspy').scrollSpy();
  $('.modal').modal();
});

// Captcha initialization

grecaptcha.ready(function () {
  grecaptcha.execute('6Leh15cUAAAAAHcB7V4eZTnx65eTs109EuM2z9aH', { action: 'homepage' }).then(function (token) {
    $('#token').val(token);
  });
});

// Form submit and treatment with feedback to the user

$('#contactForm').submit(function () {
  event.preventDefault();
  $.ajax({
    type: "POST",
    url: "mail.php",
    data: $('#contactForm').serialize(),
  }).done(function (result) {
    console.log(result);
    if (result == 'Success') {
      alert('Votre message a bien été envoyé.');
      $('#contactForm')[0].reset();
    } else {
      alert("Erreur lors de l'envoi du message.");
    };
  }).fail(function () {
    alert("Erreur, merci de contacter l'administrateur.")
  }).always(function () {
    // $('#contactForm')[0].reset();
    grecaptcha.execute('6Leh15cUAAAAAHcB7V4eZTnx65eTs109EuM2z9aH', { action: 'homepage' }).then(function (token) {
      $('#token').val(token);
    });
  });
});
