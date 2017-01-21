class TestsController < ApplicationController

  def home

  end

  def send_message
    client = ApiAiRuby::Client.new(
        :client_access_token => '8f45d1a8362a4010927af306d312ae26'
    )

    response = client.text_request "#{params[:transcript]}"
    result = response[:result]
    fulfillment = result[:fulfillment]
    @verbal_response = fulfillment[:speech]
    Rails.logger.debug("Respuesta: #{@verbal_response}")
    Rails.logger.debug("#{request.format}")
    Rails.logger.debug("#{@response}")
    @response = response.to_json
    Rails.logger.debug(@json)
    respond_to do |format|
      format.html {redirect_to root_path}
      format.js {}
    end
  end
end
