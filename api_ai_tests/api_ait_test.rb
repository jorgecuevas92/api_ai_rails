require 'api-ai-ruby'

client = ApiAiRuby::Client.new(
    :client_access_token => '8f45d1a8362a4010927af306d312ae26'
)

response = client.text_request "nueva alarma"

puts response
