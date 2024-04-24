const inputEl = document.getElementById("input");
const fromUnitEl = document.getElementById("fromUnit");
const toUnitEl = document.getElementById("toUnit");
const errorEl = document.getElementById("error");
const resultEl = document.getElementById("result");
const exchangeButton = document.getElementById("exchangeButton");
const convertButton = document.getElementById("convertButton");
let errorTime;
let resultTime;

function convertWeight(weight, fromUnit, toUnit) {
    if (fromUnit === "lb" && toUnit === "kg") {
        return (weight / 2.2).toFixed(2);
    } else if (fromUnit === "kg" && toUnit === "lb") {
        return (weight * 2.2).toFixed(2);
    } else if (fromUnit === "g" && toUnit === "kg") {
        return (weight / 1000).toFixed(2);
    } else if (fromUnit === "kg" && toUnit === "g") {
        return (weight * 1000).toFixed(2);
    } else if (fromUnit === "g" && toUnit === "lb") {
        return (weight / 453.592).toFixed(2);
    } else if (fromUnit === "lb" && toUnit === "g") {
        return (weight * 453.592).toFixed(2);
    } else {
        return "Invalid conversion";
    }
}

function updateResults() {
    const weight = parseFloat(inputEl.value);
    const fromUnit = fromUnitEl.value;
    const toUnit = toUnitEl.value;

    if (isNaN(weight) || weight <= 0) {
        errorEl.innerText = "Please enter a valid number!";
        clearTimeout(errorTime);
        errorTime = setTimeout(() => {
            errorEl.innerText = "";
            inputEl.value = "";
        }, 2000);
    } else {
        const convertedWeight = convertWeight(weight, fromUnit, toUnit);
        if (convertedWeight !== "Invalid conversion") {
            resultEl.innerText = `${convertedWeight} ${toUnit}`;
            clearTimeout(resultTime);
            resultTime = setTimeout(() => {
                resultEl.innerText = "";
                inputEl.value = "";
            }, 10000);
        } else {
            errorEl.innerText = "Invalid conversion";
            clearTimeout(errorTime);
            errorTime = setTimeout(() => {
                errorEl.innerText = "";
                inputEl.value = "";
            }, 2000);
        }
    }
}

function exchangeUnitsAndUpdateResults() {
    const tempUnit = fromUnitEl.value;
    fromUnitEl.value = toUnitEl.value;
    toUnitEl.value = tempUnit;
    updateResults();
}

function handleEnterKey(event) {
    if (event.key === "Enter") {
        updateResults();
    }
}

convertButton.addEventListener("click", updateResults);
exchangeButton.addEventListener("click", exchangeUnitsAndUpdateResults);
inputEl.addEventListener("keydown", handleEnterKey);
fromUnitEl.addEventListener("change", updateResults);
toUnitEl.addEventListener("change", updateResults);
