import uvicorn
from flask import Flask
from flask import render_template   


app: Flask = Flask(
    __name__,
    static_url_path='',
    static_folder='dist',
    template_folder='dist/templates'
)
wsgi_app = app.wsgi_app

print(app.static_folder)

@app.route('/')
def hello_world():
    return render_template("index.html")

