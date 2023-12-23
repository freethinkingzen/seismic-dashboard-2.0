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