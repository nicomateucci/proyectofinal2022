from flask import Flask, jsonify
import requests
import investpy
from binance.client import Client
from users import users

app = Flask(__name__)

# Todo
# ! obtener json con flask
#
# ! conectar flask con investpy
#
# conectar python con postgres
#
# agregar datos de investpy a tabla de postgres
#
# agregar angular al proyecto
#
# ver como dockerizo todo
#
# -----------------------
#
# TTADS: 3 procesos, uno de mongo en el 27017, otro de backend en 3000 y otro de angular en 4200
#     entre ellos se comunican con angular.client para el backend, este procesa peticiones con express, en caso de python sería flask
#     luego python se conecta a mongo con pymongo o

# Routes
@app.route("/", methods=["GET"])
def ping():
    return jsonify({"response": "pong!"})

@app.route("/users")
def usershandler():
    return jsonify({"users": users})

@app.route("/getTask")
def gettaskandler():
    r = requests.get("https://jsonplaceholder.typicode.com/todos/1")
    print(r.status_code)
    print(r.headers['content-type'])
    print(r.encoding)
    print(r.text)
    # print(r.json)
    return jsonify(r.json())

@app.route("/getPost")
def getpostshandler():
    r = requests.get("https://jsonplaceholder.typicode.com/posts/1")
    print(r.status_code)
    print(r.headers['content-type'])
    print(r.encoding)
    print(r.text)
    # print(r.json)
    return jsonify(r.json())

@app.route("/listUsers")
def listusershandler():
    r = requests.get("https://jsonplaceholder.typicode.com/users")
    print(r.status_code)
    print(r.headers['content-type'])
    print(r.encoding)
    print(r.text)
    # print(r.json)
    return jsonify(r.json())


@app.route("/listPhotos")
def listphotoshandler():
    r = requests.get("https://jsonplaceholder.typicode.com/photos")
    print(r.status_code)
    print(r.headers['content-type'])
    print(r.encoding)
    print(r.text)
    # print(r.json)
    return jsonify(r.json())

@app.route("/getAction")
def getactionhandler():
    df = investpy.get_stock_historical_data(stock='AAPL',
                                            country='United States',
                                            from_date='01/01/2020',
                                            to_date='10/01/2022')
    pint(df)
    return jsonify(df)

@app.route("/getBinance")
def getbinancehandler():
    # API Key and Secret nico
    key_nico = 'gAyPXqezAXVDdua8Tmnn8TQQpNyz8K9P5sPOwvPDIR097kyChI3Pi9stlIOrYP9O'
    secret_nico = 'Cz8gc8jcUrslHRqYrK0K703n6nhIPEBxLFwSf7nOLLeaz10bryayNljN3AejP9GL'
    client = Client(key_nico, secret_nico)
    info = client.get_exchange_info()
    print(info["symbols"])
    print(info["symbols"][0]["symbol"])

    return jsonify()

# Start the Server
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000, debug=True)
