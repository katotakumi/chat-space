$(function(){
  function buildHTML(message){
    console.log(message.image)
    var message_image = message.image ? message.image : ''
    var html =  `<div class="message">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                        ${message.created_at}
                      </div>
                      <p>
                      <div class="lower-message__content">
                        ${message.content}
                      </div>
                      </p>
                      <div class="lower-meesage">
                        <img src = "${message_image}" class = 'lower-message__image'>
                      </div>
                    </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    var formData = new FormData(this);
    e.preventDefault();
    var formData = new FormData(this);
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
      $('.messages').append(html)
      $('.form__message').val('')
      $('.form__submit').prop('disabled', false);
    })
  });
});
