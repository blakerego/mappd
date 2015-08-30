class SessionsController < ApplicationController
  def create
    binding.pry
    @user = User.find_or_create_from_auth_hash(auth_hash)
    self.current_user = @user
    redirect_to '/'
  end

  def foursquare
    code = params[:code]
    state = params[:state]
    binding.pry
    auth_url = URI.parse('https://foursquare.com/oauth2/access_token' +
      '?client_id=' + ENV['MAPPD_FSQ_CLIENT_ID'] +
      '&client_secret=' + ENV['MAPPD_FSQ_CLIENT_SECRET'] +
      '&grant_type=authorization_code&redirect_uri=' + 'http://localhost:3000/auth' +
      '&code=' + code)
    req = Net::HTTP.new(auth_url.host, auth_url.port)
    req.use_ssl = true

    res = req.request(Net::HTTP::Get.new(auth_url.request_uri))
    response_json = JSON.parse(res.body)
    access_token = response_json["access_token"]

    user_url = URI.parse('https://api.foursquare.com/v2/users/self?oauth_token=' + access_token + '&v=20140806')
    req2 = Net::HTTP.new(user_url.host, user_url.port)
    req2.use_ssl = true
    user_data = req2.request(Net::HTTP::Get.new(user_url.request_uri))
    user_response = JSON.parse(user_data.body)

    email = user_response['response']['user']['contact']['email']
    firstname = user_response['response']['user']['firstName']
    lastname = user_response['response']['user']['lastName']
    
    user = User.find_or_create_by(:email => email)
    user.foursquare_token = access_token
    user.save

    @user = user

    puts auth_hash
    # self.current_user = @user

    render 'create'
  end

  protected

  def auth_hash
    request.env['omniauth.auth']
  end
end