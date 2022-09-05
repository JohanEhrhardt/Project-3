import sqlalchemy
import numpy as np
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify
import  configparser

config = configparser.ConfigParser()
config.read('../../ini_file.ini')

config.sections()
DBPass = config.get('postgres', 'password')

# flask setup

connection_string = f"postgres:{DBPass}@localhost:5432/project_3_db"
engine = create_engine(f'postgresql://{connection_string}')


# reflect an existing database into a new model
base = automap_base()
# reflect the tables
base.prepare(engine, reflect=True)

australia_healthsites = base.classes.australia_healthsites

app = Flask(__name__)

# flask routes
@app.route("/")
def homepage():
    session = Session(engine)
    results = session.query(australia_healthsites.osm_id).all()
    session.close()
    loc_amenity = list(np.ravel(results))
    return jsonify(loc_amenity)

if __name__ == '__main__':
    app.run(debug=True)