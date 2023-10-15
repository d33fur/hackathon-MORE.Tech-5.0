import uvicorn
from flask import Flask
from flask import render_template   
import time

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

if __name__ == "__main__":
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
    app.run(host="0.0.0.0", port=5000, debug=True)
