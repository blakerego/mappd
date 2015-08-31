Rails.application.config.middleware.use OmniAuth::Builder do 
  provider :foursquare, ENV['MAPPD_FSQ_CLIENT_ID'], ENV['MAPPD_FSQ_CLIENT_SECRET']
  provider :google_oauth2, ENV['MAPPD_GOOG_CLIENT_ID'], ENV['MAPPD_GOOG_CLIENT_SECRET']
end