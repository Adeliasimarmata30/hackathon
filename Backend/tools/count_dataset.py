import pandas as pd

wisata = pd.read_excel("dataset/wisata.xlsx")
hotel = pd.read_excel("dataset/hotel.xlsx")
resto = pd.read_excel("dataset/resto.xlsx")

print("Wisata :", len(wisata))
print("Hotel :", len(hotel))
print("Restoran :", len(resto))