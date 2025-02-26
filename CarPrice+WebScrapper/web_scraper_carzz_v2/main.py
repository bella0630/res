import csv
import re
from bs4 import BeautifulSoup
import requests

def clean_text(text):
    return re.sub(r"\D", "", text)

def extract_car_data(ad_url):
    """Extract data from a single ad."""
    response = requests.get(ad_url)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, "html.parser")

    # Extract price
    pret = soup.find("span", {"id": "price"})
    pret = pret.get_text(strip=True).replace("eur", "").replace(" ", "").replace(".", "") if pret else "N/A"

    # Initialize variables
    marca_masina = None
    anul_fabricatiei = None
    km_parcursi = None
    tip_combustibil = None
    tip_caroserie = None
    tip_cutie_de_viteza = None

    # Locate the extra fields div
    extra_fields_div = soup.find("div", id="extra-fields")
    if extra_fields_div:
        for div in extra_fields_div.find_all("div", recursive=False):
            if marca_masina is None:
                span = div.find("span", string="Marcă")
                if span:
                    h2 = div.find("h2")
                    if h2:
                        a_tag = h2.find("a")
                        if a_tag:
                            marca_masina = a_tag.get_text(strip=True)

            if anul_fabricatiei is None:
                span = div.find("span", string="An fabricație")
                if span:
                    h6 = div.find("h6")
                    if h6:
                        a_tag = h6.find("a")
                        if a_tag:
                            anul_fabricatiei = a_tag.get_text(strip=True)
                    else:
                        h5 = div.find("h5")
                        if h5:
                            a_tag = h5.find("a")
                            if a_tag:
                                anul_fabricatiei = a_tag.get_text(strip=True)

            if km_parcursi is None:
                span = div.find("span", string="Rulaj")
                if span:
                    h6 = div.find("h6")
                    if h6:
                        text = h6.get_text(strip=True)
                        km_parcursi = clean_text(text)
                    else:
                        h5 = div.find("h5")
                        if h5:
                            text = h5.get_text(strip=True)
                            km_parcursi = clean_text(text)


            if tip_combustibil is None:
                span = div.find("span", string="Combustibil")
                if span:
                    h6 = div.find("h6")
                    if h6:
                        a_tag = h6.find("a")
                        if a_tag:
                            tip_combustibil = a_tag.get_text(strip=True)
                    else:
                        h5 = div.find("h5")
                        if h5:
                            a_tag = h5.find("a")
                            if a_tag:
                                tip_combustibil = a_tag.get_text(strip=True)

            if tip_caroserie is None:
                span = div.find("span", string="Caroserie")
                if span:
                    h5 = div.find("h5")
                    if h5:
                        a_tag = h5.find("a")
                        if a_tag:
                            tip_caroserie = a_tag.get_text(strip=True)
                    else:
                        h4 = div.find("h4")
                        if h4:
                            a_tag = h4.find("a")
                            if a_tag:
                                tip_caroserie = a_tag.get_text(strip=True)

            if tip_cutie_de_viteza is None:
                span = div.find("span", string="Cutie de viteze")
                if span:
                    h6 = div.find("h6")
                    if h6:
                        a_tag = h6.find("a")
                        if a_tag:
                            tip_cutie_de_viteza = a_tag.get_text(strip=True)
                    else:
                        h5 = div.find("h5")
                        if h5:
                            a_tag = h5.find("a")
                            if a_tag:
                                tip_cutie_de_viteza = a_tag.get_text(strip=True)

    # Check if all variables are set
    if not all([marca_masina, anul_fabricatiei, pret, km_parcursi, tip_combustibil, tip_caroserie, tip_cutie_de_viteza]):
        return None

    # Return extracted data
    return [
        marca_masina,
        anul_fabricatiei,
        pret,
        km_parcursi,
        tip_combustibil,
        tip_caroserie,
        tip_cutie_de_viteza,
    ]

def scrape_ads(base_url, csv_file):
    """Scrape all ads starting from the base URL and save to CSV."""
    # Write header
    with open(csv_file, mode="w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        header = [
            "marca_masina",
            "anul_fabricatiei",
            "pretul",
            "km_parcursi",
            "tip_combustibil",
            "tip_caroserie",
            "tip_cutie_de_viteza",
        ]
        writer.writerow(header)

    current_url = base_url
    while current_url:
        response = requests.get(current_url)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")

        # Find the div with id 'list_cart_holder'
        list_cart_holder = soup.find("div", id="list_cart_holder")
        if not list_cart_holder:
            print("No ads found on this page.")
            break

        # Iterate through all ads
        for a_tag in list_cart_holder.find_all("a", href=True):
            ad_url = a_tag["href"]
            try:
                car_data = extract_car_data(ad_url)
                if car_data:
                    # Append to CSV
                    with open(csv_file, mode="a", newline="", encoding="utf-8") as file:
                        writer = csv.writer(file)
                        writer.writerow(car_data)
                        print(f"Data saved for ad: {ad_url}")
                else:
                    print(f"!!! return None: {ad_url}")
            except Exception as e:
                print(f"Error scraping ad {ad_url}: {e}")

        # Find the next page link
        pagination = soup.find("div", class_="pagination fixed_width")
        if pagination:
            next_page = pagination.find("li", class_="next_page")
            if next_page:
                next_page_link = next_page.find("a", href=True)
                if next_page_link:
                    current_url = next_page_link["href"]
                    print(f"Moving to next page: {current_url}")
                    continue

        # If no next page is found, exit the loop
        current_url = None
        print("No more pages to scrape.")

# Base URL
base_url = "https://carzz.ro/autoturisme_pret-de-la-1300-eur.html?yf=2007"
csv_file = "car_ads_data.csv"

# Start scraping
scrape_ads(base_url, csv_file)
print(f"Data scraping completed. Saved to {csv_file}")
