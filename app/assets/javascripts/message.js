$(function(){
  function buildHTML(message){
    var message_image = message.image ? message.image : ''
    var html =  `<div class="message">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-meesage">
                      ${message.content}
                    </div>
                    <div class="lower-message__content">
                      <img src = "${message_image}" class = 'lower-message__image'>
                    </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    var formData = new FormData(this);
    e.preventDefault();
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('form')[0].reset();
      $('input').prop('disabled', false);
    })
    .fail(function() {
      alert('Something wrong occurred.');
    });
  });
});
