$(function(){

  function buildHTML(message){

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
      $('.hidden').val('')
      $('.new_message').prop('disabled', false);
    })
    .fail(function() {
      alert('error');
    });
  })
});
