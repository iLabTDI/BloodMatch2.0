from sklearn.tree import DecisionTreeClassifier
import mysql.connector
import numpy as np
from matplotlib import pyplot as plt

def capa_1(message):
    
    # Connect to the database
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        passwd="root",
        database="datos_prueba_DB"
    )
    myCursor = db.cursor()

    print("Ingrese el ID de su paciente para conocer su estado")
    pacienteID = int(message)
    # ctrl = 0
    # Fetch MAX and MIN heart rate data for the patient
    myCursor.execute(f"SELECT heart_rate FROM Person WHERE personID= {pacienteID}")
    patient_data = myCursor.fetchone()
    if patient_data is None:
            return "No patient data found"

    target_hr = patient_data[0]
    # ctrl = patient_data[1]

    # Fetch heart rate data for all patients
    X = []
    Y = []
    # min_hr = 0
    # min_hr = row[1]

    myCursor.execute("SELECT heart_rate FROM Person")
    for row in myCursor:
        pacients_hr = row[0]
        

        X.append([pacients_hr])

        if pacients_hr > 100:
            Y.append(2)  # High Heart Rate
        elif pacients_hr >= 60 and pacients_hr <= 100:
            Y.append(1)  # Normal Heart Rate
        else:
            Y.append(0)  # Low Heart Rate
    print(X)
    print(Y)

    # Split the data into training and testing sets
    X_train, Y_train = (X, Y)

    # Create and fit the decision tree classifier
    arbol = DecisionTreeClassifier()
    arbol.fit(X_train, Y_train)

    # Make predictions on the patient's data
    data_entry = np.array([[target_hr]])
    predictions = arbol.predict(data_entry)

    return predictions[0]