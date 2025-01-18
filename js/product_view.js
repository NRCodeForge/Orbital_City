// Klasse für ein einzelnes Produkt
class Product {
    constructor({ id, name, type, location, sizeInSquareMeters, priceInEuros, description, image }) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.location = location;
        this.sizeInSquareMeters = sizeInSquareMeters;
        this.priceInEuros = priceInEuros;
        this.description = description;
        this.image = image;
    }

    matchesFilter(filter) {
        if (filter.type && this.type !== filter.type){
            return false;
        }
        if (filter.minPrice && this.priceInEuros < filter.minPrice) {
            return false;
        }
        return !(filter.maxPrice && this.priceInEuros > filter.maxPrice);

    }
}

// Klasse für die Produktliste
class ProductList {
    constructor(products = []) {
        this.products = products.map(product => new Product(product));
    }

    filterProducts(filter) {
        return this.products.filter(product => product.matchesFilter(filter));
    }

    display(containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = ''; // Container leeren

        this.products.forEach(product => {
            // Erstelle ein div für jede Eigenschaft
            const propertyDiv = document.createElement('div');
            propertyDiv.className = 'property';

            const propertyDetails = document.createElement('div');
            propertyDetails.className = 'property-details';
            propertyDiv.appendChild(propertyDetails);

            const propertyImage = document.createElement('div');
            propertyImage.className = 'property-image';
            propertyDiv.appendChild(propertyImage);

            // Name
            const nameElement = document.createElement('h2');
            nameElement.textContent = product.name;
            propertyDetails.appendChild(nameElement);

            // Typ
            const typeElement = document.createElement('p');
            typeElement.textContent = `Typ: ${product.type}`;
            propertyDetails.appendChild(typeElement);

            // Standort
            const locationElement = document.createElement('p');
            locationElement.textContent = `Standort: ${product.location}`;
            propertyDetails.appendChild(locationElement);

            // Größe
            const sizeElement = document.createElement('p');
            sizeElement.textContent = `Größe: ${product.sizeInSquareMeters} m²`;
            propertyDetails.appendChild(sizeElement);

            // Preis
            const priceElement = document.createElement('p');
            priceElement.textContent = `Preis: €${product.priceInEuros.toLocaleString()}`;
            propertyDetails.appendChild(priceElement);

            // Beschreibung
            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = product.description;
            propertyDetails.appendChild(descriptionElement);

            // Bild
            const imageElement = document.createElement('img');
            imageElement.src = product.image.src;
            imageElement.alt = product.image.alt;
            propertyImage.appendChild(imageElement);

            // Füge das Div zum Container hinzu
            container.appendChild(propertyDiv);
        });
    }
}

// Filter-Menü erstellen
function createFilterMenu(productList) {
    const filterContainer = document.querySelector('.filter');

    // Dropdown für Typ
    const typeFilter = document.createElement('select');
    typeFilter.id = 'type-filter';
    const allTypesOption = document.createElement('option');
    allTypesOption.value = '';
    allTypesOption.textContent = 'Alle Typen';
    typeFilter.appendChild(allTypesOption);

    const types = [...new Set(productList.products.map(product => product.type))];
    types.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        typeFilter.appendChild(option);
    });

    filterContainer.appendChild(typeFilter);

    // Preis-Range Filter
    const priceFilterMin = document.createElement('input');
    priceFilterMin.id = 'min-price-filter';
    priceFilterMin.type = 'number';
    priceFilterMin.placeholder = 'Min Preis in EUR';

    const priceFilterMax = document.createElement('input');
    priceFilterMax.id = 'max-price-filter';
    priceFilterMax.type = 'number';
    priceFilterMax.placeholder = 'Max Preis in EUR';

    filterContainer.appendChild(priceFilterMin);
    filterContainer.appendChild(priceFilterMax);

    // Filter-Button
    const filterButton = document.createElement('button');
    filterButton.textContent = 'Filtern';
    filterButton.onclick = () => {
        const selectedType = typeFilter.value;
        const minPrice = parseFloat(priceFilterMin.value) || null;
        const maxPrice = parseFloat(priceFilterMax.value) || null;

        const filter = {
            type: selectedType,
            minPrice: minPrice,
            maxPrice: maxPrice,
        };

        const filteredProducts = new ProductList(productList.filterProducts(filter));
        filteredProducts.display('products-container');
    };

    filterContainer.appendChild(filterButton);
}

// JSON-Datei laden und Eigenschaften anzeigen
function loadProperties() {
    fetch('js/properties.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP-Fehler: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const productList = new ProductList(data.properties);
            productList.display('products-container');
            createFilterMenu(productList);
        })
        .catch(error => {
            console.error('Fehler beim Laden der JSON-Datei:', error);
        });
}

// Beim Laden der Seite die JSON-Daten laden
window.onload = () => {
    loadProperties();
};
