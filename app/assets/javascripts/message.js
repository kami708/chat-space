$(document).on('turbolinks:load',function(){
  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var image = ""
    if (message.image !== null) {
      image = `<img src="${message.image}">`
    }
    var html = `<div class="message-side__contents__box" data-message-id='${message.id}'>
                  <div class="message-side__contents__box__user">
                    <div class="message-side__contents__box__user__name ">
                    ${ message.user_name }
                    </div>
                    <div class="message-side__contents__box__user__create-at">
                      ${ message.date }
                    </div>
                  </div>
                  <div class="message-side__contents__box__text">
                    <p class="lower-message__content">
                      ${content }
                    </p>
                    <div class="lower-message__image">
                      ${image}
                    </div>
                  </div>
                </div>`
    return html;
  }
  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message-side__contents__box:last').data("message-id");
      $.ajax({
        url: 'api/messages#index {:format=>"json"}',
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function (message) {
          insertHTML = buildHTML(message); 
          $('.message-side__contents').append(insertHTML);
          $('.message-side__contents').animate({scrollTop: $('.message-side__contents')[0].scrollHeight}, 'fast');
        })
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 5000);
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action")
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
      $('.message-side__contents').append(html)
      $('#new_message')[0].reset();
      $('.message-side__contents').animate({ scrollTop: $('.message-side__contents')[0].scrollHeight});
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(data){
      $('.form__submit').prop('disabled', false);　
    })
  })
});