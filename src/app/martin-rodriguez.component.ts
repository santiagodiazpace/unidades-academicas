import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

declare const L: any;

@Component({
  selector: 'app-martin-rodriguez',
  imports: [RouterLink],
  templateUrl: './martin-rodriguez.component.html',
})
export class MartinRodriguezComponent implements AfterViewInit, OnDestroy {
  @ViewChild('campusMap') campusMap?: ElementRef<HTMLElement>;

  private map?: any;
  private readonly initializeOnLoad = () => this.initializeMap();

  ngAfterViewInit(): void {
    if (typeof L === 'undefined') {
      window.addEventListener('load', this.initializeOnLoad, { once: true });
      return;
    }

    this.initializeMap();
  }

  ngOnDestroy(): void {
    window.removeEventListener('load', this.initializeOnLoad);
    this.map?.remove();
  }

  private initializeMap(): void {
    if (this.map || !this.campusMap || typeof L === 'undefined') {
      return;
    }

    const locations = [
      {
        name: 'Jardín Santa Cecilia',
        address: 'Av. Balbín 980',
        coordinates: [-37.3151257, -59.1216158],
      },
      {
        name: 'Instituto Brig. Gral. M. Rodríguez',
        address: 'Av. Balbín 910',
        coordinates: [-37.3158111, -59.1211903],
      },
      {
        name: 'Escuela Brig. Gral. M. Rodríguez',
        address: 'Av. Marconi 1760',
        coordinates: [-37.3161931, -59.1216627],
      },
    ];

    this.map = L.map(this.campusMap.nativeElement, {
      scrollWheelZoom: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(this.map);

    const pin = L.divIcon({
      className: 'school-map-marker',
      html: '<span class="school-map-pin" aria-hidden="true"></span>',
      iconAnchor: [15, 32],
      iconSize: [30, 32],
      popupAnchor: [0, -31],
    });

    const bounds = locations.map((location) => location.coordinates);
    locations.forEach((location) => {
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${location.address}, Tandil, Buenos Aires`,
      )}`;

      L.marker(location.coordinates, { icon: pin })
        .addTo(this.map)
        .bindPopup(
          `<strong>${location.name}</strong><br>${location.address} - Tandil<br>` +
            `<a href="${googleMapsUrl}" target="_blank" rel="noopener noreferrer">Abrir en Google Maps</a>`,
        );
    });

    this.map.fitBounds(bounds, { padding: [38, 38], maxZoom: 17 });
  }
}
