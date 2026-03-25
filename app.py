from flask import Flask, render_template, jsonify
from questions import questions

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/get-questions")
def get_questions():
    return jsonify(questions)

if __name__ == "__main__":
    app.run(debug=True)