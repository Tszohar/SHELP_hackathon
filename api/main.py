from flask import Flask, json, request

app = Flask(__name__)


@app.route("/tracker", methods=["POST"])
def get_recording():
    data = request.files['file']
    print(type(data))
    print(data)
    return True
    # return app.response_class(response=json.dumps(data), status=200, mimetype='application/json')


if __name__ == "__main__":
    app.run()

