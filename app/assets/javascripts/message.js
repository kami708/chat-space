$(document).on('turbolinks:load',function(){
  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var image = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message-side__contents__box">
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
                          ${image }
                        </div>
                  </div>
                </div>`
    return html;
  }
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
      $('.form__message').val('');
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