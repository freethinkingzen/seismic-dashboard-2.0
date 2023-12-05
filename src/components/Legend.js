import { useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import variables from "../styles/_variables.scss";

export default function Legend() {
    const map = useMap();
  
    useEffect(() => {
        if (map) {
            const legend = L.control({ position: "bottomright" });

            legend.onAdd = () => {
                const div = L.DomUtil.create("div", "legend");
                div.innerHTML = `
                    <div>
                        <span class="legendBox" style="background-color: ${variables.warningLight}; height: '2em'; width: '2em';"></span>
                        <span class="legendText">0 - 2</b></span>
                    </div>
                    <div>
                        <span class="legendBox" style="background-color: ${variables.warningMedium};"></span>
                        <span class="legendText">2 - 4</span>
                    </div>
                    <div>
                        <span class="legendBox" style="background-color: ${variables.warningDark};"></span>
                        <span class="legendText">4 - 6</span>
                    </div>
                    <div>
                        <span class="legendBox" style="background-color: ${variables.errorMedium};"></span>
                        <span class="legendText">6 - 8</span>
                    </div>
                    <div>
                        <span class="legendBox" style="background-color: ${variables.purple};"></span>
                        <span class="legendText">8+</span>
                    </div>
                `;
                return div;
            };

            legend.addTo(map);
        }
    }, [map]);
  return null;
}