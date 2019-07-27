import icon from "leaflet";
import marker from "./marker.png";
import mine from "./mine.png";
import theirs from "./theirs.png";

export const loc = icon.icon({
    iconUrl: marker,
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41]
})
export const myCont = icon.icon({
    iconUrl: mine,
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41]
})
export const theirCont = icon.icon({
    iconUrl: theirs ,
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41]
})
