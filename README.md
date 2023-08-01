# income-prediction
For this project we use the "American Citizens Annual Income" dataset from Kaggle by AmirHossein Mirzaei.

This dataset contains different demographic, occupation, and education information as well as whether that group of individuals makes more or less than 50K annually. The dataset contans over 23,000 rows of data and 15 columns.

As a first step, we removed any columns that did not seem relevent to annual income using a Spark SQL request. Then, we cleaned the data in pandas to drop any rows with NA data. 

We then used OneHotEncoder to encode the non-numerical data, and StandardScaler to scale all of the data once it was all numerical. 

We used the NN Keras model to train the data, using 3 layers. We trained with 100 epochs and the results were a model with 77.8% accuracy for predicting annnual income. 
