$(document).ready(function() {
    $('#login-form').submit(function(event) {
      event.preventDefault();
  
      const email = $('#email').val();
      const password = $('#password').val();
      
      $.ajax({
        type: 'POST',
        url: 'https://upgraded-spork-xg5q7775gp9hpx9p-3000.app.github.dev/api/v1/login',
        contentType: 'application/json',
        data: JSON.stringify({ email, password }),
        success: function(data) {
          $('#message').text(data.message);
          if (data.message === 'Login successful') {
            $('#message').text(data.message);
          }
        },
        error: function(xhr, status, error) {
          $('#message').text('Error: ' + error);
        }
      });
    });
  });
  