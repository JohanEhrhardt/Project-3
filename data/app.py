import sqlalchemy
import numpy as np
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import pandas as pd

from flask import Flask, jsonify, render_template
import  configparser

config = configparser.ConfigParser()
config.read('../../my_config.ini')

config.sections()
DBPass = config.get('postgres', 'password')

# flask setup

connection_string = f"postgres:{DBPass}@localhost:5432/Project3"
engine = create_engine(f'postgresql://{connection_string}')
conn = engine.connect()

# reflect an existing database into a new model
base = automap_base()
# reflect the tables
base.prepare(engine, reflect=True)

australia_healthsites = base.classes.australia_healthsites

app = Flask(__name__)

# flask routes
@app.route("/")
def homepage():
    return render_template("index.html")


# @app.route("/api/healthcareloc")
# def healthcareloc():
#     session = Session(engine)
#     results = session.query(australia_healthsites.osm_id).all()
#     session.close()
#     loc_amenity = list(np.ravel(results))
#     return jsonify(loc_amenity)

# @app.route("/api/readsql")
# def readsql():
#     data = pd.read_sql("SELECT osm_id FROM australia_healthsites", conn)
#     loc_amenity = list(np.ravel(data))
#     return jsonify(loc_amenity)

@app.route("/api/healthcaretypes")
def healthcaretypes():
    healthcaretype = pd.read_sql("SELECT DISTINCT meta_healthcare FROM australia_healthsites", conn)
    print(type(healthcaretype))
    return healthcaretype.to_json()




if __name__ == '__main__':
    app.run(debug=True)