$(document).ready(function() {
    $('#signup-form').submit(function(event) {
      event.preventDefault();
  
      const username = $('#username').val();
      const email = $('#email').val();
      const password = $('#password').val();
  
      if (username.trim() === '' || password.trim() === '' || email.trim() === '') {
        $('#message').text('Please enter username and password');
        return;
      }
      $.ajax({
        type: 'POST',
        url: 'https://upgraded-spork-xg5q7775gp9hpx9p-3000.app.github.dev/api/v1/signup',
        contentType: 'application/json',
        data: JSON.stringify({ email, username, password }),
        success: function(data) {
            $('#message').text(data.message);
        },
        error: function(xhr, status, error) {
          $('#message').text('abc: ' + error);
        }
      });
    });
  });
  