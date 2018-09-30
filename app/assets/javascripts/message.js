$(function(){

  function scroll(){
    $('.chat-main__messages').animate({scrollTop: $('.chat-main__messages')[0].scrollHeight}, 'slow');
  }

  function buildHTML(message){
    //imageがある場合、<img>タグを追加
    var image = message.image ? `<img class="lower-message__image" src=${ message.image }>` : "";

    var html = `<div class="chat-main__message" data-message-id="${message.id}"}
  %h5.message__user-name>
                  <h5 class="message__user-name">
                    ${message.user_name}
                    <span class="message__date">${message.datetime}</span>
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
    //非同期通信成功https://www.google.co.jp/の場合
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__messages').append(html)
      $('.chat-main__input-form-box').val('')
      $('.hidden').val('')
      scroll();
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

  $(function(){
      setInterval(update, 3000);
  });

  //自動更新機能
  function update(){
    if(window.location.href.match(/\/groups\/\d+\/messages/)) {
      var last_id = $('.chat-main__message:last').data('messageId');
      $.ajax({
        url: location.href,
        type: 'GET',
        data: {
          message: { id: last_id}
        },
        dataType: 'json'
      })
      .done(function(messages){
        var insertHTML = '';
        messages.forEach(function(message){
          console.log(message);
          insertHTML += buildHTML(message);
          $('.chat-main__messages').append(insertHTML);
        });
        scroll();
      })
      .fail(function(messages) {
        alert('自動更新に失敗しました');
      });
   } else {
    clearInterval(setInterval);
   }
  }

});
