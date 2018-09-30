json.messages @messages.each do |message|
  json.body  message.body
  json.user_name  message.user.name
  json.image  message.image.url
  json.datetime  message.created_at.to_s(:datetime)
  json.id  message.id
end
