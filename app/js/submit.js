
$(function() {

      // var myDataRef = new Firebase('https://anton23.firebaseio.com/');
      // $('#messageInput').keypress(function (e) {
      //   if (e.keyCode == 13) {
      //       // get values from FORM
      //       var name = $("input#name").val();
      //       var email = $("input#email").val();
      //       var phone = $("input#phone").val();
      //       var message = $("textarea#message").val();
      //       var firstName = name; // For Success/Failure Message
      //       // Check for white space in name for Success/Fail message
      //       if (firstName.indexOf(' ') >= 0) {
      //           firstName = name.split(' ').slice(0, -1).join(' ');
      //       }

      //     myDataRef.push({name: name, email: email, phone: phone, message: message});
      //     $('#messageInput').val('');
      //   }
      // });
      // myDataRef.on('child_added', function(snapshot) {
      //   var message = snapshot.val();
      //   displayChatMessage(message.name, message.text);
      // });
      // function displayChatMessage(name, text) {
      //   $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
      //   $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
      // };



    var myDataRef = new Firebase('https://anton23form.firebaseio.com/');
    var usersRef = myDataRef.child("users");


    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            // Prevent spam click and default submit behaviour
            $("#btnSubmit").attr("disabled", true);
            event.preventDefault();
            
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }

          // $('#messageInput').keypress(function (e) {
          //   if (e.keyCode == 13) {
                // get values from FORM
                var name = $("input#name").val();
                var email = $("input#email").val();
                var phone = $("input#phone").val();
                var message = $("textarea#message").val();
                var firstName = name; // For Success/Failure Message
                // Check for white space in name for Success/Fail message
                if (firstName.indexOf(' ') >= 0) {
                    firstName = name.split(' ').slice(0, -1).join(' ');
                }

              usersRef.push({name: name, email: email, phone: phone, message: message});
              // usersRef.set({
              //   name: {
              //     date_of_birth: "June 23, 1912",
              //     full_name: "Alan Turing"
              //   }
              // });
              // $('#messageInput').val('');


          //   }
          // });
          myDataRef.on('child_added', function(snapshot) {
            // var message = snapshot.val();
            // displayChatMessage(message.name, message.text);

                   $("#btnSubmit").attr("disabled", false);
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
          });
          function displayChatMessage(name, text) {
            $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
            $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
          };


            // $.ajax({
            //     url: "././mail/contact_me.php",
            //     type: "POST",
            //     data: {
            //         name: name,
            //         phone: phone,
            //         email: email,
            //         message: message
            //     },
            //     cache: false,
            //     success: function() {
            //         // Enable button & show success message
            //         $("#btnSubmit").attr("disabled", false);
            //         $('#success').html("<div class='alert alert-success'>");
            //         $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            //             .append("</button>");
            //         $('#success > .alert-success')
            //             .append("<strong>Your message has been sent. </strong>");
            //         $('#success > .alert-success')
            //             .append('</div>');

            //         //clear all fields
            //         $('#contactForm').trigger("reset");
            //     },
            //     error: function() {
            //         // Fail message
            //         $('#success').html("<div class='alert alert-danger'>");
            //         $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            //             .append("</button>");
            //         $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
            //         $('#success > .alert-danger').append('</div>');
            //         //clear all fields
            //         $('#contactForm').trigger("reset");
            //     },
            // })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

// When clicking on Full hide fail/success boxes
$('#name').focus(function() {
    $('#success').html('');
});



    // <div id='messagesDiv'></div>
    // <input type='text' id='nameInput' placeholder='Name'>
    // <input type='text' id='messageInput' placeholder='Message'>
    // <script>

      // myDataRef.on('child_added', function(snapshot) {
      //   var message = snapshot.val();
      //   displayChatMessage(message.name, message.text);
      // });
      // function displayChatMessage(name, text) {
      //   $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
      //   $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
      // };
    // </script>