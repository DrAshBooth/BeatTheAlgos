# -*- coding: utf-8 -*-

from google.appengine.ext.webapp.util import run_wsgi_app

import webapp2
import os
import jinja2

template_dir = os.path.join(os.path.dirname(__file__), 'templates')
jinja_env = jinja2.Environment(loader=jinja2.FileSystemLoader(template_dir),
                               autoescape=True)

class BaseHandler(webapp2.RequestHandler):
    def render_str(self, template, **params):
        t = jinja_env.get_template(template)
        return t.render(params)
    
    def render(self, template, **kw):
        self.response.out.write(self.render_str(template, **kw))

    def write(self, *a, **kw):
        self.response.out.write(*a, **kw)


class MainPage(BaseHandler):
    
    def render_front(self, title="", art="", error=""):
        self.render("front.html")
        
    def get(self):
        self.render_front()

app = webapp2.WSGIApplication([('/', MainPage)], debug=True)
 
def main():
    run_wsgi_app(app)
 
if __name__ == "__main__":
    main()