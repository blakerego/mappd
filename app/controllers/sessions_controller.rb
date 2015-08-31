class SessionsController < ApplicationController
  def create
    email = auth_hash['info']['email']
    user = User.find_or_create_by(:email => email)

    authentication = user.authentications.find_by_provider_and_uid(auth_hash['provider'], auth_hash['uid']);

    if !authentication
      authentication = Authentication.create(:provider => auth_hash['provider'], :uid => auth_hash['uid'])
    end

    authentication.user = user
    authentication.save

    access_token = auth_hash['credentials']['token']
    if (auth_hash['provider'] == 'foursquare' && user.foursquare_token != access_token)
      user.foursquare_token = access_token
      user.save
    end

    sign_in_and_redirect(:user, user)
  end

  protected

  def auth_hash
    request.env['omniauth.auth']
  end
end