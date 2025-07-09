# app.py
from flask import Flask, request, jsonify
from word_ladder import load_dictionary, find_ladder
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route("/api/ladder", methods=["POST"])
def get_word_ladder():
    data = request.get_json()
    start = data.get("start", "").lower()
    end = data.get("end", "").lower()

    if not start or not end or len(start) != len(end):
        return jsonify({"error": "Start and end words must be the same length."}), 400

    dictionary = load_dictionary(len(start))

    if start not in dictionary or end not in dictionary:
        return jsonify({"error": "One or both words not in dictionary."}), 400

    ladder = find_ladder(start, end, dictionary)

    if ladder:
        return jsonify({"ladder": ladder})
    else:
        return jsonify({"error": "No ladder found."}), 404

@app.route("/api/validate", methods=["POST"])
def validate_move():
    data = request.get_json()
    prev = data.get("prev", "").lower()
    current = data.get("current", "").lower()
    dictionary = load_dictionary(len(prev))

    # Conditions:
    if len(prev) != len(current):
        return jsonify({"valid": False, "reason": "Length mismatch."})

    if current not in dictionary:
        return jsonify({"valid": False, "reason": "Word not in dictionary."})

    diff = sum(1 for a, b in zip(prev, current) if a != b)
    if diff != 1:
        return jsonify({"valid": False, "reason": "Words must differ by one letter."})

    return jsonify({"valid": True})

@app.route("/api/generate", methods=["GET"])
def generate_fixed_ladder():
    dictionary = load_dictionary(4)
    words = list(dictionary)
    attempts = 1000

    for _ in range(attempts):
        start = random.choice(words)
        end = random.choice(words)
        if start == end:
            continue

        ladder = find_ladder(start, end, dictionary)
        if ladder and len(ladder) == 4:
            return jsonify({
                "start": start,
                "end": end,
                "ladder": ladder  # Keep intermediate words hidden on frontend
            })

    return jsonify({"error": "Could not generate ladder."}), 500


@app.route("/")
def hello():
    return "Welcome to the Word Ladder"


if __name__ == "__main__":
    app.run(debug=True)
