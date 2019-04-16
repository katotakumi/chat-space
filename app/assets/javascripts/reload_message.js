$(function(){
  function buildHTML(message){
    var message_image = message.image ? message.image : ''
    var html =  `<div class="message" data-message-id= "${message.id}">
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

  var reloadMessages = function() {
    last_message_id = $('.message:last').data('message-id');
    $.ajax({
      url: location.href,
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      messages.forEach(function(message){
        var html = buildHTML(message);
        $(".messages").append(html);
        $('.messages').animate({scrollTop: $('.messages').get(0).scrollHeight}, 'fast');
        $('.messages').animate({scrollTop :topHeight}, 'fast');
      });
    })
    .fail(function() {
      alart('error');
    });
  };
    setInterval(reloadMessages, 1000);
});
