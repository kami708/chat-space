json.array! @products do |product|
  json.id user.id
  json.name user.name
  json.email user.email
end