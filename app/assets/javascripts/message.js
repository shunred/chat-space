$(function(){

  function buildHTML(message){
    //imageがある場合、<img>タグを追加
    var image = message.image ? `<img class="lower-message__image" src=${ message.image }>` : "";

    var html = `<div class="chat-main__message">
                  <h5 class="message__user-name">
                    ${message.user_name}
                    <span class="message__date">${message.created_at}</span>
                  </h5>
                  <p class="message__text">${message.body}</p>
                  ${image}
               </div>`
    return html;
  }

  //イベント発火。Ajaxの使用。
  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax ({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    //非同期通信成功の場合
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__messages').append(html)
      $('.chat-main__input-form-box').val('')
      $('.hidden').val('')
      $('.chat-main__messages').animate({scrollTop: $('.chat-main__messages')[0].scrollHeight}, 'slow');
    })
    //非同期通信失敗の場合
    .fail(function() {
      alert('メッセージの送信に失敗しました。');
    })
    //submitを有効化
    .always(function(){
      $('.submit').prop("disabled", false);
    });
  })
});
