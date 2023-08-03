from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import pickle

app = Flask(__name__)
CORS(app)

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

       #convert json_data from json format into a pandas dataframe
        data = pd.DataFrame.from_dict(formData, orient='index').T
        print(data)
        #import income.csv as panda dataframe
        df = pd.read_csv('income.csv')
        #append data to income.csv
        df = df.append(data)
        #export df to csv file
        df.to_csv('income.csv', index=False)

        # Make predictions using the model
        prediction = model.predict(data)

        # Return the prediction as a JSON response
        return jsonify({'result': prediction.tolist()})

    except Exception as e:
        # Return an error response if something went wrong
        return jsonify({'error': str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True, port=5501)
    