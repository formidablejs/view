# We'll load the axios HTTP library which allows us to easily issue requests
# to our Formidable back-end. This library automatically handles sending the
# CSRF token as a header based on the value of the "XSRF" token cookie.

window.axios = require 'axios'
