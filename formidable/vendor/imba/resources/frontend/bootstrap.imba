# We'll load the axios HTTP library which allows us to easily issue requests
# to our Formidable back-end. This library automatically handles sending the
# CSRF token as a header based on the value of the "XSRF" token cookie.

import axios from 'axios'

globalThis.axios = axios

# Imba's hot-module-reload feature doesn't work as expected in the Formidable
# Framework. We'll disable it to avoid running into issues.
# If you wish to use it, you can comment out or remove line 13.

globalThis.imba_devtools.socket.close! if globalThis.imba_devtools
