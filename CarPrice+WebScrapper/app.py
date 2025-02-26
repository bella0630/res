# -*- coding: utf-8 -*-
import streamlit as st
import pandas as pd
import pickle as pk


model = pk.load(open('C:/Personal projects/CarPrice+WebScrapper/machine_learning.pkl', 'rb'))



car_names = {
    'Mazda':0, 'Audi':1, 'Peugeot':2, 'Opel':3, 'Dacia':4, 'Ford':5,
       'Jeep':6, 'Kia':7, 'BMW':8, 'Skoda':9, 'Skoda':10, 'Mercedes-Benz':11,
       'Renault':12, 'SsangYong':13, 'Citroen':14, 'Toyota':15, 'Nissan':16, 'Hyundai':17,
       'Jaguar':18, 'Land Rover':19, 'Suzuki':20, 'Porsche':21, 'Volvo':22, 'Alfa Romeo':23,
       'Seat':24, 'Fiat':25, 'Dodge':26, 'Chevrolet':27, 'Mitsubishi':28, 'Mini':29, 'Bentley':30, 'Alta':31, 'Infiniti':32, 'Honda':33, 'Lexus':34, 'Daewoo':35, 'Tesla':36,'Volkswagen':37
}
years = [i for i in range(2007, 2025)]


st.title("Predicție Preț Mașină")


st.subheader("Completează detaliile mașinii")


car_name = st.selectbox("Nume Mașină:", list(car_names.keys()))
car_name_numeric = car_names[car_name]


year = st.selectbox("An:", years)


km_driven = st.slider("Km Parcurși:", 0, 300000, 10000)


fuel = st.radio("Tip Combustibil:", options=["Diesel", "Benzin?", "Electric", "Hibrid", "GPL"])
fuel_options = {'Diesel':0,'Benzin?':1,'Electric':2,'Hibrid':3,'GPL':4}
fuel_numeric = fuel_options[fuel]


caroserie_type = st.radio("Tip Caroserie:", options=["SUV","Hatchback","Berlin?","Break", "Monovolum","Coupe","Microbuz","Limuzin?","Autovehicul mic","Cabrio","Pick-up"])
caroserie_type_options = {'SUV':0,'Hatchback':1,'Berlin?':2,'Break':3,'Monovolum':4,'Coupe':5,'Microbuz':6,'Limuzin?':7,'Autovehicul mic':8,'Cabrio':9,'Pick-up':10}
caroserie_type_numeric = caroserie_type_options[caroserie_type]


transmission = st.radio("Tip Transmisie:", options=["Manual?", "Automat?","Automat? (CVT)","Automat? (dublu ambreiaj)","Semi-automat?"])
transmission_options = {'Automat?':0,'Manual?':1,'Automat? (CVT)':2,'Automat? (dublu ambreiaj)':3,'Semi-automat?':4}
transmission_numeric = transmission_options[transmission]

def predict_price():

    input_data = pd.DataFrame(
        [[car_name_numeric, year, km_driven, fuel_numeric, caroserie_type_numeric, transmission_numeric]],
        columns=['marca_masina', 'anul_fabricatiei', 'km_parcursi', 'tip_combustibil', 'tip_caroserie', 'tip_cutie_de_viteza'])


    predicted_price = model.predict(input_data)
    real_price=predicted_price
    return real_price[0]



if st.button("Predicție Preț"):
    predicted_price = predict_price()
    st.success(f"Prețul estimat: {predicted_price:.2f} Euro")

