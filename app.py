from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)

# Load the trained machine learning model (pkl file)
# Replace 'path_to_your_model.pkl' with the actual path to your model
with open('model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the JSON data from the request body
        json_data = request.get_json()

        # Log the received data to the console
        print('Received data:', json_data)

        # Parse the JSON data and extract the form data
        formData = json_data.get('formData', {})

        # Convert form data to a list of floats (optional)
        data = [list(map(float, [formData[key] for key in formData]))]

        # Make predictions using the model
        prediction = model.predict(data)

        # Return the prediction as a JSON response
        return jsonify({'result': prediction.tolist()})

    except Exception as e:
        # Return an error response if something went wrong
        return jsonify({'error': str(e)}), 500