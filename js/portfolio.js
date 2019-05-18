$(document).ready(function () {
  $('.sidenav').sidenav();
  $('.parallax').parallax();
  $('textarea#message').characterCounter();
  $('.scrollspy').scrollSpy();
  $('.modal').modal();
  $('.carousel.carousel-slider').carousel({
    fullWidth: true,
    indicators: true,
  });
  var autoplay = true;
  setInterval(function () { if (autoplay) $('.carousel.carousel-slider').carousel('next'); }, 4500);
  $('.carousel.carousel-slider').hover(function () { autoplay = false; }, function () { autoplay = true; });
});

grecaptcha.ready(function () {
  grecaptcha.execute('6Leh15cUAAAAAHcB7V4eZTnx65eTs109EuM2z9aH', { action: 'homepage' }).then(function (token) {
    $('#token').val(token);
  });
});

$('#contactForm').submit(function () {
  event.preventDefault();
  // // var data = $('#contactForm').serialize();
  // var firstname = $('#firstname').val();
  // var lastname = $('#lastname').val();
  // var phone = $('#phone').val();
  // var email = $('#email').val();
  // var message = $('#message').val();
  // var token = $('#token').val();

  $.ajax({
    type: "POST",
    url: "mail.php",
    data: $('#contactForm').serialize(),
  }).done(function (result) {
    console.log(result);
    if (result == 'Success') {
      alert('Votre message a bien été envoyé.');
    } else {
      alert("Erreur lors de l'envoi du message.");
    };
  }).fail(function () {
    alert("Erreur, merci de contacter l'administrateur.")
  }).always(function () {
    $('#contactForm')[0].reset();
    grecaptcha.execute('6Leh15cUAAAAAHcB7V4eZTnx65eTs109EuM2z9aH', { action: 'homepage' }).then(function (token) {
      $('#token').val(token);
    });
  });
});


    // grecaptcha.ready(function(){
    //   grecaptcha.execute('6Leh15cUAAAAAHcB7V4eZTnx65eTs109EuM2z9aH', {action: 'homepage'}).then(function(token){
    //     $('#contactForm').prepend('<input type="hidden" id="token" name="token" value="' + token + '">');
    //     $.post("mail.php",{firstname: firstname, lastname: lastname, phone: phone, email: email, message: message, token: token}),
    //     function(result){
    //       console.log(result);
    //       if(result.success){
    //         alert('Votre mail à bien été envoyé.')
    //       } else {
    //         alert('Spam')
    //       }
    //     }
    //   });
    // })