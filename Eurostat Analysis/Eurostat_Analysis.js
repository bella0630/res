const BASE_URL = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/";
const countrySelect = document.getElementById("countries");
const indicatorSelect = document.getElementById("indicator");
const displayChartButton = document.getElementById("displayChart");
const chartContainer = document.getElementById("chart");

async function fetchData(country, indicator) {
    const BASE_URL = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/";
    const url = `${BASE_URL}${indicator}&geo=${country}&time=2000&time=2001&time=2002&time=2003&time=2004&time=2005&time=2006&time=2007&time=2008&time=2009&time=2010&time=2011&time=2012&time=2013&time=2014&time=2015&time=2016&time=2017&time=2018`;
    console.log("URL generat pentru API:", url);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Eroare la fetch: ${response.status}`);
        }
        const data = await response.json();
        console.log(`Structura completă a datelor pentru ${indicator}:`, data);
        return data;
    } catch (error) {
        console.error("Eroare la fetchData:", error);
        return null;
    }
}

function processChartData(data) {
    try {
        const years = Object.keys(data.dimension.time.category.index).map(key => key);
        console.log("Ani extrași:", years);
        const values = Object.values(data.value);
        console.log("Valori extrase:", values);
        return { years, values };
    } catch (error) {
        console.error("Eroare la procesarea datelor:", error);
        return null;
    }
}

function generateChart(years, values) {
    chartContainer.innerHTML = "";
    const width = 600;
    const height = 400;
    const barWidth = width / years.length;
    const maxVal = Math.max(...values);
    console.log("Valoarea maximă pentru scalare:", maxVal);
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", width + 50);
    svg.setAttribute("height", height + 50);
    values.forEach((value, index) => {
        const barHeight = (value / maxVal) * height;
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", index * barWidth + 25);
        rect.setAttribute("y", height);
        rect.setAttribute("width", barWidth - 5);
        rect.setAttribute("height", 0);
        rect.setAttribute("fill", "green");
        setTimeout(() => {
            rect.setAttribute("height", barHeight);
            rect.setAttribute("y", height - barHeight);
        }, index * 100); 
        rect.addEventListener("mouseover", () => {
            rect.setAttribute("fill", "red");
            const year = years[index];
            console.log(`Tooltip - An: ${year}, Valoare: ${value}`);
            showTooltip(`An: ${year}, Valoare: ${value}`);
        });
        rect.addEventListener("mouseout", () => {
            rect.setAttribute("fill", "green");
            hideTooltip();
        });
        svg.appendChild(rect);
    });
    years.forEach((year, index) => {
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", index * barWidth + barWidth / 2 + 25);
        text.setAttribute("y", height + 20);
        text.setAttribute("text-anchor", "middle");
        text.textContent = year;
        text.setAttribute("style", "font-size: 12px; fill: #333;");
        svg.appendChild(text);
    });

    chartContainer.appendChild(svg);
}

function showTooltip(content) {
    let tooltip = document.getElementById("tooltip");
    if (!tooltip) {
        tooltip = document.createElement("div");
        tooltip.setAttribute("id", "tooltip");
        tooltip.setAttribute("style", "position: absolute; padding: 10px; background: rgba(0, 0, 0, 0.7); color: #fff; font-size: 14px; pointer-events: none; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);");
        document.body.appendChild(tooltip);
    }
    tooltip.innerHTML = content;
    document.addEventListener("mousemove", positionTooltip);
}

function positionTooltip(event) {
    const tooltip = document.getElementById("tooltip");
    if (tooltip) { 
        tooltip.style.left = `${event.pageX + 10}px`;
        tooltip.style.top = `${event.pageY + 10}px`;
    }
}

function hideTooltip() {
    const tooltip = document.getElementById("tooltip");
    if (tooltip) {
        tooltip.remove();
    }
}

displayChartButton.addEventListener("click", async () => {
    const selectedCountry = countrySelect.value;
    const selectedIndicator = indicatorSelect.value;
    if (!selectedCountry || !selectedIndicator) {
        alert("Select a country");
        return;
    }
    console.log("Țară selectată:", selectedCountry);
    console.log("Indicator selectat:", selectedIndicator);
    const data = await fetchData(selectedCountry, selectedIndicator);
    if (data && data.value) {
        const chartData = processChartData(data);
        if (chartData) {
            generateChart(chartData.years, chartData.values);
        }
    } else {
        console.error("Datele din API sunt incomplete sau lipsesc:", data);
        alert("No data!");
    }
});

async function fetchAndCombineData(selectedYear) {
    const indicators = {
        PIB: "sdg_08_10?na_item=B1GQ&unit=CLV10_EUR_HAB",
        SperantaViata: "demo_mlexpec?sex=T&age=Y1",
        Populatie: "demo_pjan?sex=T&age=TOTAL"
    };
    const countries = [
        "BE", "BG", "CZ", "DK", "DE", "EE", "IE", "EL", "ES", "FR", "HR", "IT", "CY", "LV", "LT",
        "LU", "HU", "MT", "NL", "AT", "PL", "PT", "RO", "SI", "SK", "FI", "SE"
    ];
    try {
        const [pibData, lifeData, popData] = await Promise.all(
            Object.values(indicators).map(indicator => {
                const geoParam = countries.map(country => `geo=${country}`).join("&");
                const url = `https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/${indicator}&${geoParam}&time=${selectedYear}`;
                console.log("URL generat:", url);
                return fetchDataFromUrl(url);
            })
        );
        if (!pibData || !lifeData || !popData) {
            throw new Error("Eroare la preluarea datelor.");
        }

        const combinedData = countries.map(country => ({
            tara: country,
            an: selectedYear,
            PIB: extractValue(pibData, country, selectedYear),
            SperantaViata: extractValue(lifeData, country, selectedYear),
            Populatie: extractValue(popData, country, selectedYear)
        }));

        return combinedData;
    } catch (error) {
        console.error("Eroare la combinarea datelor:", error);
        alert("Check console");
        return null;
    }
}

async function fetchDataFromUrl(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Eroare la fetch:", error);
        return null;
    }
}

function extractValue(data, country, year) {
    try {
        const countryIndex = data.dimension.geo.category.index[country];
        const yearIndex = data.dimension.time.category.index[year];
        const valueIndex = countryIndex * Object.keys(data.dimension.time.category.index).length + yearIndex;

        return data.value[valueIndex] || 0;
    } catch (error) {
        console.error(`Eroare la extragerea valorii pentru ${country} în ${year}:`, error);
        return 0;
    }
}

const yearSelect = document.getElementById("ani");
const displayBubbleChartButton = document.getElementById("displayBubbleChart");

displayBubbleChartButton.addEventListener("click", async () => {
    const selectedYear = yearSelect.value;
    if (!selectedYear) {
        alert("Select a year");
        return;
    }
    console.log("An selectat:", selectedYear);
    const data = await fetchAndCombineData(selectedYear);
    if (data && data.length > 0) {
        generateStaticBubbleChart(data, `Bubble Chart - An ${selectedYear}`);
    } else {
        alert("No data!");
    }
});

function generateStaticBubbleChart(data, title, maxPib = null, maxSperantaViata = null, maxPopulatie = null) {
    const canvas = document.getElementById("bubbleChartCanvas");
    const ctx = canvas.getContext("2d");
    const margin = 100;
    const chartWidth = canvas.width - 2 * margin;
    const chartHeight = canvas.height - 2 * margin;
    if (!maxPib) maxPib = Math.max(...data.map(item => item.PIB));
    if (!maxSperantaViata) maxSperantaViata = Math.max(...data.map(item => item.SperantaViata));
    if (!maxPopulatie) maxPopulatie = Math.max(...data.map(item => item.Populatie));

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(margin, canvas.height - margin);
    ctx.lineTo(margin, margin);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(margin, canvas.height - margin); 
    ctx.lineTo(canvas.width - margin, canvas.height - margin);
    ctx.stroke();

    for (let i = 0; i <= 5; i++) {
        const valuePib = (i * maxPib) / 5;
        const x = margin + (valuePib / maxPib) * chartWidth;
        ctx.fillStyle = "#000";
        ctx.fillText(valuePib.toFixed(0), x, canvas.height - margin + 20);
        ctx.beginPath();
        ctx.moveTo(x, canvas.height - margin);
        ctx.lineTo(x, canvas.height - margin - 5);
        ctx.stroke();
    }

    for (let i = 0; i <= 5; i++) {
        const valueLife = (i * maxSperantaViata) / 5;
        const y = canvas.height - margin - (valueLife / maxSperantaViata) * chartHeight;
        ctx.fillStyle = "#000";
        ctx.fillText(valueLife.toFixed(0), margin - 30, y + 5);
        ctx.beginPath();
        ctx.moveTo(margin, y);
        ctx.lineTo(margin + 5, y);
        ctx.stroke();
    }

    data.forEach(country => {
        const x = margin + (country.PIB / maxPib) * chartWidth; 
        const y = canvas.height - margin - (country.SperantaViata / maxSperantaViata) * chartHeight; 
        const r = (country.Populatie / maxPopulatie) * 100;
        ctx.fillStyle = getCountryColor(country.tara);
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fill();
    });
	
	let legendX = canvas.width - 50;
    let legendY = margin;

    ctx.font = "12px Arial";
    Object.keys(getCountryColorMap()).forEach((countryCode, index) => {
        ctx.fillStyle = getCountryColor(countryCode);
        ctx.fillRect(legendX, legendY + index * 20, 10, 10);
        ctx.fillStyle = "#000";
        ctx.fillText(countryCode, legendX + 15, legendY + 10 + index * 20);
    });
	
    ctx.fillStyle = "#000";
    ctx.font = "14px Arial";
    ctx.fillText("PIB (per capita)", canvas.width / 2, canvas.height - margin + 50);
    ctx.save();
    ctx.translate(margin - 50, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Speranța de viață (ani)", 0, 0);
    ctx.restore();
    ctx.fillStyle = "#000";
    ctx.font = "16px Arial";
    ctx.fillText(title, canvas.width / 2 - 50, margin / 2);
    ctx.fillStyle = "#000";
    ctx.font = "16px Arial";
    ctx.fillText(title, canvas.width / 2 - 50, margin / 2);
}

function getCountryColor(countryCode) {
    const colors = {
        BE: "#FF0000", BG: "#00FF00", CZ: "#0000FF", DK: "#FFFF00", DE: "#FF00FF",
        EE: "#00FFFF", IE: "#800000", EL: "#808000", ES: "#008080", FR: "#800080",
        HR: "#C0C0C0", IT: "#FF4500", CY: "#2E8B57", LV: "#4682B4", LT: "#A52A2A",
        LU: "#5F9EA0", HU: "#7FFF00", MT: "#DC143C", NL: "#8A2BE2", AT: "#A9A9A9",
        PL: "#8B0000", PT: "#20B2AA", RO: "#FFD700", SI: "#D2691E", SK: "#4B0082",
        FI: "#6A5ACD", SE: "#FF6347"
    };
    return colors[countryCode] || "#000";
}

function getCountryColorMap() {
    return {
        BE: "#FF0000", BG: "#00FF00", CZ: "#0000FF", DK: "#FFFF00", DE: "#FF00FF",
        EE: "#00FFFF", IE: "#800000", EL: "#808000", ES: "#008080", FR: "#800080",
        HR: "#C0C0C0", IT: "#FF4500", CY: "#2E8B57", LV: "#4682B4", LT: "#A52A2A",
        LU: "#5F9EA0", HU: "#7FFF00", MT: "#DC143C", NL: "#8A2BE2", AT: "#A9A9A9",
        PL: "#8B0000", PT: "#20B2AA", RO: "#FFD700", SI: "#D2691E", SK: "#4B0082",
        FI: "#6A5ACD", SE: "#FF6347"
    };
}

async function animateBubbleChartCSSLike() {
    const indicators = {
        PIB: "sdg_08_10?na_item=B1GQ&unit=CLV10_EUR_HAB",
        SperantaViata: "demo_mlexpec?sex=T&age=Y1",
        Populatie: "demo_pjan?sex=T&age=TOTAL"
    };

    const years = [2000, 2018];
    const countries = [
        "BE", "BG", "CZ", "DK", "DE", "EE", "IE", "EL", "ES", "FR", "HR", "IT", "CY", "LV", "LT",
        "LU", "HU", "MT", "NL", "AT", "PL", "PT", "RO", "SI", "SK", "FI", "SE"
    ];

    try {
        const [data2000, data2018] = await Promise.all(
            years.map(year => Promise.all(
                Object.values(indicators).map(indicator => {
                    const geoParam = countries.map(country => `geo=${country}`).join("&");
                    const url = `https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/${indicator}&${geoParam}&time=${year}`;
                    return fetchDataFromUrl(url);
                })
            ))
        );

        const combinedData = countries.map(country => ({
            tara: country,
            xStart: extractValue(data2000[0], country, 2000),
            xEnd: extractValue(data2018[0], country, 2018),
            yStart: extractValue(data2000[1], country, 2000),
            yEnd: extractValue(data2018[1], country, 2018),
            rStart: extractValue(data2000[2], country, 2000),
            rEnd: extractValue(data2018[2], country, 2018)
        }));

        const maxPib = Math.max(
            ...combinedData.map(country => Math.max(country.xStart, country.xEnd))
        );
        const maxSperantaViata = Math.max(
            ...combinedData.map(country => Math.max(country.yStart, country.yEnd))
        );
        const maxPopulatie = Math.max(
            ...combinedData.map(country => Math.max(country.rStart, country.rEnd))
        );

        let t = 0;
        const duration = 2000;
        const startTime = Date.now();

        function animate() {
            const elapsed = Date.now() - startTime;
            t = Math.min(elapsed / duration, 1);

            const interpolatedData = combinedData.map(country => ({
                tara: country.tara,
                PIB: country.xStart + (country.xEnd - country.xStart) * t,
                SperantaViata: country.yStart + (country.yEnd - country.yStart) * t,
                Populatie: country.rStart + (country.rEnd - country.rStart) * t
            }));

            generateStaticBubbleChart(interpolatedData, `An: ${(2000 + t * (2018 - 2000)).toFixed(0)}`, maxPib, maxSperantaViata, maxPopulatie);

            if (t < 1) {
                requestAnimationFrame(animate);
            }
        }

        requestAnimationFrame(animate);
    } catch (error) {
        console.error("Eroare la animarea bubble chart:", error);
        alert("Eroare la preluarea datelor pentru animație.");
    }
}

document.getElementById("animateBubbleChartCSSLike").addEventListener("click", animateBubbleChartCSSLike);

const countryNames = {
    BE: "Belgia",
    BG: "Bulgaria",
    CZ: "Cehia",
    DK: "Danemarca",
    DE: "Germania",
    EE: "Estonia",
    IE: "Irlanda",
    EL: "Grecia",
    ES: "Spania",
    FR: "Franța",
    HR: "Croația",
    IT: "Italia",
    CY: "Cipru",
    LV: "Letonia",
    LT: "Lituania",
    LU: "Luxemburg",
    HU: "Ungaria",
    MT: "Malta",
    NL: "Țările de Jos",
    AT: "Austria",
    PL: "Polonia",
    PT: "Portugalia",
    RO: "România",
    SI: "Slovenia",
    SK: "Slovacia",
    FI: "Finlanda",
    SE: "Suedia"
};

async function generateTableForYear(year) {
    const data = await fetchAndCombineData(year);
    if (!data || data.length === 0) {
        alert("No data!");
        return;
    }
    const tableContainer = document.getElementById("tableContainer");
    tableContainer.innerHTML = "";
    const avgPib = data.reduce((sum, item) => sum + item.PIB, 0) / data.length;
    const avgSperantaViata = data.reduce((sum, item) => sum + item.SperantaViata, 0) / data.length;
    const avgPopulatie = data.reduce((sum, item) => sum + item.Populatie, 0) / data.length;
    const table = document.createElement("table");
    table.classList.add("data-table");
    const headerRow = document.createElement("tr");
    ["Țară", "PIB per capita", "Speranța de Viață", "Populație"].forEach(headerText => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
    data.forEach(country => {
        const row = document.createElement("tr");
        const countryCell = document.createElement("td");
        countryCell.textContent = countryNames[country.tara] || country.tara;
        row.appendChild(countryCell);
        const pibCell = document.createElement("td");
        pibCell.textContent = country.PIB.toFixed(2);
        pibCell.style.backgroundColor = getColorForValue(country.PIB, avgPib);
        row.appendChild(pibCell);
        const lifeCell = document.createElement("td");
        lifeCell.textContent = country.SperantaViata.toFixed(2);
        lifeCell.style.backgroundColor = getColorForLifeExpectancy(country.SperantaViata, avgSperantaViata);
        row.appendChild(lifeCell);
        const popCell = document.createElement("td");
        popCell.textContent = country.Populatie.toFixed(2);
        popCell.style.backgroundColor = getColorForValue(country.Populatie, avgPopulatie);
        row.appendChild(popCell);
        table.appendChild(row);
    });
    tableContainer.appendChild(table);
}

function getColorForValue(value, avg) {
    const ratio = (value - avg) / avg;
    const normalizedRatio = Math.max(-1, Math.min(1, ratio)); 
    const red = normalizedRatio < 0 ? 255 : Math.floor(255 * (1 - normalizedRatio)); 
    const green = normalizedRatio > 0 ? 255 : Math.floor(255 * (1 + normalizedRatio)); 

    return `rgb(${red}, ${green}, 0)`; 
}

function getColorForLifeExpectancy(value, avg) {
    const ratio = (value - avg) / 3;
    const normalizedRatio = Math.max(-1, Math.min(1, ratio));
    const red = normalizedRatio < 0 ? 255 : Math.floor(255 * (1 - normalizedRatio));
    const green = normalizedRatio > 0 ? 255 : Math.floor(255 * (1 + normalizedRatio));

    return `rgb(${red}, ${green}, 0)`; 
}

document.getElementById("displayTable").addEventListener("click", async () => {
    const yearSelect = document.getElementById("aniTabel");
	
    if (!yearSelect) {
        console.error("Elementul <select> nu a fost găsit.");
        return;
    }

    const selectedYear = yearSelect.value;
    console.log("Valoare extrasă din select:", selectedYear);

    if (!selectedYear) {
        alert("Selectați un an.");
        return;
    }

    console.log("An selectat:", selectedYear);
	await generateTableForYear(selectedYear);
});

document.querySelectorAll('.info-button').forEach(button => {
    button.addEventListener('click', () => {
        const infoId = button.getAttribute('data-info');
        const infoBox = document.getElementById(infoId);

        if (infoBox.style.display === 'none' || !infoBox.style.display) {
            infoBox.style.display = 'block';
        } else {
            infoBox.style.display = 'none';
        }
    });
});



