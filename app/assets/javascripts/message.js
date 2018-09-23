$(function(){

  function buildHTML(message){

    if (!message.image) {

    var html = `<div class="chat-main__message">
                  <h5 class="message__user-name">
                    ${message.user_name}
                    <span class="message__date">${message.created_at}</span>
                  </h5>
                  <p class="message__text">${message.body}</p>
                  <img class="lower-message__image" src="/uploads/message/image/${ message.id }/${message.image}">
               </div>`
    return html;
   }else {
    var html = `<div class="chat-main__message">
                 <h5 class="message__user-name">
                  ${message.user_name}
                  <span class="message__date">${message.created_at}</span>
                 </h5>
                 <p class="message__text">${message.body}</p>
               </div>`
      return html;
   }

  }

  $('.new_message').on('submit', function(e){
    e.preventDefault();
    // console.log(this);
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
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__messages').append(html)
      $('.chat-main__input-form-box').val('')
    })
    .fail(function() {
      alert('error');
    });
  })
});
