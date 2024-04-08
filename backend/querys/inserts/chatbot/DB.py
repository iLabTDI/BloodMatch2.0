from sklearn.tree import DecisionTreeClassifier
from IPython.display import clear_output
import time
from sklearn import tree
import mysql.connector
import numpy as np


#Conección a la DB en LOCAL
db = mysql.connector.connect(
    host = "localhost",
    user = "root",
    passwd = "root",
    database = "datos_prueba_DB"
)
myCursor = db.cursor()
############################################################################################################################################
            #Query to crate database##
#myCursor.execute("CREATE DATABASE datos_prueba_DB")

#myCursor.execute("CREATE TABLE Person (personID int PRIMARY KEY AUTO_INCREMENT, name VARCHAR(50), age smallint UNSIGNED, heart_rate int UNSIGNED)")

#.execute("DROP TABLE Person")
# myCursor.execute("DESCRIBE Person")
# for x in myCursor:
#     print(x)
            
############################################################################################################################################

################ Querys para ingresar datos a la DB ################################

# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Diego", 23, 90))
# db.commit()
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Alvaro", 26, 52))
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Frans", 24, 82))
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Juan", 32, 62))
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Manuel", 29, 52))
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Andrea", 19, 120))
# db.commit()
# myCursor.execute("SELECT * FROM Person")
# for x in myCursor:
#     print(x)
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Dalia", 20, 77))
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Facundo", 45, 113))
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Alan", 35, 62))
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Karla", 21, 75))
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Dante", 16, 58))
# db.commit()
# myCursor.execute("SELECT * FROM Person")
# for x in myCursor:
#     print(x)
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Alejandra", 19, 89))
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Fernando", 40, 97))
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Andres", 27, 103))
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Leo", 26, 76))
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Ana", 35, 66))
# db.commit()
# myCursor.execute("SELECT * FROM Person")
# for x in myCursor:
#     print(x)
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Eric", 32, 97))
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Enzo", 22, 101))
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Eva", 67, 58))
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Hugo", 23, 82))
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Laura", 90, 112))
# db.commit()
# myCursor.execute("SELECT * FROM Person")
# for x in myCursor:
#     print(x)
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Ivan", 25, 77))
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Mar", 47, 55))
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Sara", 18, 74))
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Hector", 62, 90))
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Raul", 58, 100))
# db.commit()
# myCursor.execute("SELECT * FROM Person")
# for x in myCursor:
#     print(x)
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Isis", 20, 69))
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Penelope", 85, 97))
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Ulises", 17, 77))
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Alba", 26, 62))
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Mariana", 37, 76))
# db.commit()
# myCursor.execute("SELECT * FROM Person")
# for x in myCursor:
#     print(x)
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Paulina", 22, 99))
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Gabriel", 38, 58))
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Bernardo", 27, 92))
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Jaime", 59, 85))
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Jorge", 33, 101))
# db.commit()
# myCursor.execute("SELECT * FROM Person")
# for x in myCursor:
#     print(x)
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Isabel", 26, 82))
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Marta", 72, 68))
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Samuel", 29, 114))
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Enrique", 31, 55))
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Milton", 23, 104))
# myCursor.execute("INSERT INTO Person (name, age, heart_rate) VALUES (%s, %s, %s)", ("Gustavo", 71, 58))
# db.commit()
myCursor.execute("SELECT * FROM Person")
for x in myCursor:
    print(x)


# myCursor.execute("SELECT * FROM Person")
# for x in myCursor:
#     print(x)