# -*- coding: utf-8 -*-

from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext import db
import webapp2

class MainPage(webapp2.RequestHandler):
 
    def get(self):
        self.response.headers['Content-Type'] = 'text/plain'
        self.response.out.write('Hello, webapp World!')
 
app = webapp2.WSGIApplication([('/', MainPage)], debug=True)
 
def main():
    run_wsgi_app(app)
 
if __name__ == "__main__":
    main()