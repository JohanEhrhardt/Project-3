import sqlalchemy
import numpy as np

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import pandas as pd

from flask import Flask, jsonify, render_template
import  configparser
from flask import Response


from geopy.geocoders import Nominatim
from psycopg2        import Error

import psycopg2

# INITIALIZATION OF DB CONNECTION

config = configparser.ConfigParser()
config.read('../../my_config.ini')

config.sections()
DBPass = config.get('postgres', 'password')

connection_string = f"postgres:{DBPass}@localhost:5432/Project3"
engine = create_engine(f'postgresql://{connection_string}')
conn = engine.connect()


# reflect an existing database into a new model
base = automap_base()
# reflect the tables
base.prepare(engine, reflect=True)

australia_healthsites = base.classes.australia_healthsites


# READING DATA FROM DATABASE AND STORE IN DATAFRAME

# FOR TESTING PLEASE LIMIT THE ROWCOUNT
df = pd.read_sql("SELECT osm_id, lat, lon FROM australia_healthsites where lat is not null and lon is not null LIMIT 5", conn)


# initialize Nominatim API
geolocator = Nominatim(user_agent="geoapiExercises")


for index, row in df.iterrows():

   

    l_osmid = int(row.osm_id)
    
    lat = row.lon
    lon = row.lat


    slat = str(lat)
    slon = str(lon)


    location = geolocator.reverse(slat+","+slon)
    #getting address from the latitude and longtitude
    
    address = location.raw['address']

   
    state           = address.get('state', '')
    country         = address.get('country', '')
    code            = address.get('country_code', '')
    zipcode         = address.get('postcode', '')
    amenity         = address.get('amenity', '')
    house_number    = address.get('house_number', '')
    road            = address.get('road', '')
    suburb          = address.get('suburb', '')
    city_district   = address.get('city_district', '')
    district        = address.get('district', '')
    isocode         = address.get('ISO3166-2-lvl4', '')




    #Inserting data to osm_addresses table

    try:
        connection = psycopg2.connect(user="postgres",
                                    password=DBPass,
                                    host="127.0.0.1",
                                    port="5432",
                                    database="Project3")
        cursor = connection.cursor()

        postgres_insert_query = """ INSERT INTO osm_addresses_test (osm_id, amenity, house_number, road, suburb, city_district, district, state, postcode, country, ISO3166) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"""
        record_to_insert = (l_osmid, amenity, house_number, road, suburb, city_district, district, state, zipcode, country, isocode  )
        cursor.execute(postgres_insert_query, record_to_insert)

        connection.commit()
        count = cursor.rowcount
        print(count, "Record inserted successfully into mobile table")

    except (Exception, psycopg2.Error) as error:
        print("Failed to insert record into mobile table", error)

    finally:
        # closing database connection.
        if connection:
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")
    