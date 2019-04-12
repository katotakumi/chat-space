$(function() {


function appendName(user) {
   var html = `<div class="chat-group-user clearfix">
               <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name=${user.name}>追加</a>
              </div>`
   $("#user-search-result").append(html);
 }

 function deleteName(id,name){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='${id}'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    $(".chat-group-users").append(html);
 }

 function appendErrMsgToHTML(msg) {
    var html = `<li>
                  <div class='listview__element--right-icon'>${ msg }</div>
                </li>`
    $("#user-search-result").append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $(".user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
        appendName(user);
        })
      }
      else {
        appendErrMsgToHTML("一致する名前はありません");
      }
    })
    .fail(function() {
      alert('検索に失敗しました');
    });
  });

  $(document).on("click",".user-search-remove",function(){
    $(this).parent().remove();
  });
  $("#user-search-result").on("click",".user-search-add",function(){
    var user_id = $('.user-search-add').data('user-id');
    var user_name = $('.user-search-add').data('user-name');
    deleteName(user_id,user_name);
    $(this).parent().remove();
  });
});

