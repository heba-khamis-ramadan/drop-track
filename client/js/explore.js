  let map;
  let defaultMarker = null;
  let userMarker = null;
  const defaultLat = 30.0444; // Cairo
  const defaultLng = 31.2357;

  function initMap(lat, lng, isDefault = true) {
    if (map) {
      map.setView([lat, lng], 13);

      if (!isDefault) {
        if (defaultMarker) {
          map.removeLayer(defaultMarker);
          defaultMarker = null;
        }
        if (userMarker) {
          map.removeLayer(userMarker);
        }
        userMarker = L.marker([lat, lng])
          .addTo(map)
          .bindPopup("📍 You are here")
          .openPopup();
      }
      return;
    }

    // Create map
    map = L.map('map').setView([lat, lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    if (isDefault) {
      defaultMarker = L.marker([lat, lng])
        .addTo(map)
        .bindPopup("📍 Default Location")
        .openPopup();
    } else {
      userMarker = L.marker([lat, lng])
        .addTo(map)
        .bindPopup("📍 You are here")
        .openPopup();
    }

    // Pin logic
    map.on('click', (e) => {
      document.getElementById("dropLat").value = e.latlng.lat.toFixed(6);
      document.getElementById("dropLng").value = e.latlng.lng.toFixed(6);

      const pinModal = new bootstrap.Modal(document.getElementById("pinModal"));
      pinModal.show();
    });

    // Load existing drops
    fetch(`${API_URL}/drops`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch drops');
        return res.json();
      })
      .then(response => {
        const drops = response.data;
        drops.forEach((drop) => {
          const lat = drop.location.coordinates[1];
          const lng = drop.location.coordinates[0];
          const marker = L.marker([lat, lng]).addTo(map);

          marker.bindPopup(`
            <strong>${drop.dropName || 'Unnamed drop'}</strong><br/>
            ${drop.address || 'No address provided'}<br/>
            <button class="btn btn-sm btn-danger mt-2 delete-drop" data-id="${drop._id}">
              Delete
            </button>
          `);

          marker.on("popupopen", () => {
            const popupEl = marker.getPopup().getElement();
            const btn = popupEl.querySelector(".delete-drop");
            if (btn) {
              btn.addEventListener("click", () => {
                if (confirm("Are you sure you want to delete this drop?")) {
                  fetch(`${API_URL}/drops/${drop._id}`, { method: "DELETE" })
                    .then(res => {
                      if (!res.ok) throw new Error("Failed to delete drop");
                      map.removeLayer(marker);
                      alert("Drop deleted successfully!");
                    })
                    .catch(err => {
                      console.error("Error deleting drop:", err);
                      alert("Could not delete drop.");
                    });
                }
              });
            }
          });
        });
      })
      .catch((error) => {
        console.error('Error loading drops:', error);
      });
  }

  // document.addEventListener("DOMContentLoaded", () => {

  //   initMap(defaultLat, defaultLng, true);

  //   const locationModal = new bootstrap.Modal(document.getElementById("locationModal"));
  //   locationModal.show();

  //   document.getElementById("allowLocationBtn").addEventListener("click", () => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           initMap(position.coords.latitude, position.coords.longitude, false);
  //           locationModal.hide();
  //         },
  //         (error) => {
  //           console.warn("Geolocation denied or failed:", error);
  //           alert("Could not access your location, staying at Cairo.");
  //           locationModal.hide();
  //         },
  //         { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  //       );
  //     } else {
  //       alert("Geolocation not supported, staying at Cairo.");
  //       locationModal.hide();
  //     }
  //   });
  // });

  document.addEventListener("DOMContentLoaded", () => {
  initMap(defaultLat, defaultLng, true);

  const locationModal = new bootstrap.Modal(document.getElementById("locationModal"));
  locationModal.show();

  document.getElementById("allowLocationBtn").addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          initMap(position.coords.latitude, position.coords.longitude, false);
          locationModal.hide();
        },
        (error) => {
          console.warn("Geolocation denied or failed:", error);
          alert("Could not access your location, staying at Cairo.");
          locationModal.hide();
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      alert("Geolocation not supported, staying at Cairo.");
      locationModal.hide();
    }
  });

  // Handle new drop creation
  document.getElementById("pinForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const dropName = document.getElementById("dropTitle").value;
    const address = document.getElementById("dropAddress").value;
    const lat = parseFloat(document.getElementById("dropLat").value);
    const lng = parseFloat(document.getElementById("dropLng").value);

    try {
      const token = localStorage.getItem("token"); // user must be logged in
      // alert(token);

      const response = await fetch(`${API_URL}/drops/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `access ${token}`, // send JWT
        },
        body: JSON.stringify({
          dropName,
          address,
          location: {
            type: "Point",
            coordinates: [lng, lat],
          },
          imageUrls: [], // optional
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Add marker immediately
        const marker = L.marker([lat, lng]).addTo(map);
        marker.bindPopup(`
          <strong>${dropName}</strong><br/>
          ${address || "No address provided"}<br/>
          <button class="btn btn-sm btn-danger mt-2 delete-drop" data-id="${data.data._id}">
            Delete
          </button>
        `);

        marker.on("popupopen", () => {
          const popupEl = marker.getPopup().getElement();
          const btn = popupEl.querySelector(".delete-drop");
          if (btn) {
            btn.addEventListener("click", () => {
              if (confirm("Are you sure you want to delete this drop?")) {
                fetch(`${API_URL}/drops/${data.data._id}`, {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
                  .then((res) => {
                    if (!res.ok) throw new Error("Failed to delete drop");
                    map.removeLayer(marker);
                    alert("Drop deleted successfully!");
                  })
                  .catch((err) => {
                    console.error("Error deleting drop:", err);
                    alert("Could not delete drop.");
                  });
              }
            });
          }
        });

        // Close modal
        const pinModal = bootstrap.Modal.getInstance(document.getElementById("pinModal"));
        pinModal.hide();
        e.target.reset();
      } else {
        alert(data.message || "Failed to create drop");
      }
    } catch (err) {
      console.error("Error creating drop:", err);
      alert("Could not create drop");
    }
  });
});
