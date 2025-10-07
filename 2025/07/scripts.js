import ready from "../../shared/js/ready.js";
import randomFromArray from "../../shared/js/randomFromArray.js";

ready(async () => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiZm91cnRvbmZpc2giLCJhIjoiY21nZmxjdzhmMDczMjJrb3BzMHh3aG54MSJ9.xzo_6wrdC4gKwwa_rdhx5g";

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const mapStyle = prefersDark
    ? "mapbox://styles/mapbox/dark-v11"
    : "mapbox://styles/mapbox/light-v11";

  const map = new mapboxgl.Map({
    container: "map",
    style: mapStyle,
    center: [-74.006, 40.7128],
    zoom: 13,
  });

  map
    .getCanvas()
    .setAttribute(
      "aria-label",
      "A map of NYC showing a random selection of 100 B and C-grade restaurants."
    );

  map.on("load", async () => {
    const resp = await fetch("/shared/data/nyc-restaurant-data/bc-grades.json");
    const respJSON = await resp.json();
    const restaurants = randomFromArray(respJSON, 100);

    let markers = [];

    restaurants.forEach((restaurant, index) => {
      const lat = parseFloat(restaurant.lat);
      const lng = parseFloat(restaurant.long);
      const grade = restaurant.grade.toUpperCase();
      const gradeLower = grade.toLowerCase();

      const el = document.createElement("div");
      el.className = "custom-marker";
      el.style.backgroundImage = `url(images/nyc-sanitary-inspection-grade-${gradeLower}.png)`;
      el.style.width = "50px";
      el.style.height = "50px";
      el.style.backgroundSize = "contain";
      el.style.backgroundRepeat = "no-repeat";
      el.style.cursor = "pointer";

      el.setAttribute("role", "button");
      el.setAttribute("tabindex", "0");
      el.setAttribute(
        "aria-label",
        `Restaurant with grade ${grade}${
          restaurant.name ? ": " + restaurant.name : ""
        }`
      );

      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          el.click();
        }
      });

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([lng, lat])
        .addTo(map);

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div style="margin-top: 18px;">
            <strong>Grade ${grade}</strong>
          </div>
        `);

      marker.setPopup(popup);

      el.addEventListener("click", () => {
        popup.addTo(map);
      });

      markers.push(marker);
    });
  });
});
