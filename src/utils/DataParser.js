const USGS_SIGNIFICANT_DEFINITION = 600;

export const totalQuakes = (data) => {
  return data.features.length;
};

export const largestMagnitude = (data) => {
    console.log(data);
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