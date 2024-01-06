import variables from '../styles/_variables.scss';

const USGS_SIGNIFICANT_DEFINITION = 600;

export const totalQuakes = (data) => {
    return data.features.length;
};

export const largestMagnitude = (data) => {
    let largest = null;
    data.forEach((quake) => {
        if (!largest) {
            largest = quake;
        } else if (quake.properties.mag > largest.properties.mag) {
            largest = quake;
        }
    });
    return largest;
};

export const significantQuakes = (data) => {
    let significant = [];
    data.forEach((quake) => {
        if (quake.properties.sig > USGS_SIGNIFICANT_DEFINITION) {
            significant.push(quake);
        }
    });
    return significant;
};

export const tsunamiPotential = (data) => {
    let potential = [];
    data.forEach((quake) => {
        if (quake.properties.tsunami === 1) {
            potential.push(quake);
        }
    });
    return potential;
}

export const colorSelector = (mag) => {
    if (mag < 2) {
        return variables.warningLight;
    } else if (mag < 4) {
        return variables.warningMedium;
    } else if (mag < 6) {
        return variables.warningDark;
    } else if (mag < 8) {
        return variables.errorMedium;
    } else {
        return variables.purple;
    }
}

export const popupHTML = (item) => {
    return `
        <span><b>Magnitude ${item.properties.mag}</b></span>
        <br />
        <span>${new Date(item.properties.time).toLocaleDateString()}</span>
        <br />
        <span>${new Date(item.properties.time).toLocaleTimeString()}</span>
        <br />
        <span>${item.properties.place}</span>;`
}