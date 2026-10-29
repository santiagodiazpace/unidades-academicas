import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

declare const L: any;

@Component({
  selector: 'app-begonia',
  imports: [RouterLink],
  templateUrl: './begonia.component.html',
})
export class BegoniaComponent implements AfterViewInit, OnDestroy {
  @ViewChild('campusMap') campusMap?: ElementRef<HTMLElement>;

  readonly guarderiaPhotos = [
    'assets/images/guarderia_1.png',
    'assets/images/guarderia_2.png',
  ];
  readonly primariaBegoniaPhotos = [
    'assets/images/begonia_1.png',
    'assets/images/begonia_2.png',
  ];
  activeGalleryPhotos: readonly string[] = [];
  activeGalleryTitle = '';
  isGalleryOpen = false;
  currentPhotoIndex = 0;

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

  openGallery(photos: readonly string[], title: string): void {
    this.activeGalleryPhotos = photos;
    this.activeGalleryTitle = title;
    this.currentPhotoIndex = 0;
    this.isGalleryOpen = true;
  }

  closeGallery(): void {
    this.isGalleryOpen = false;
  }

  previousPhoto(): void {
    this.currentPhotoIndex =
      (this.currentPhotoIndex - 1 + this.activeGalleryPhotos.length) %
      this.activeGalleryPhotos.length;
  }

  nextPhoto(): void {
    this.currentPhotoIndex =
      (this.currentPhotoIndex + 1) % this.activeGalleryPhotos.length;
  }

  @HostListener('document:keydown', ['$event'])
  handleGalleryKeyboard(event: KeyboardEvent): void {
    if (!this.isGalleryOpen) {
      return;
    }

    if (event.key === 'Escape') {
      this.closeGallery();
    } else if (event.key === 'ArrowLeft') {
      this.previousPhoto();
    } else if (event.key === 'ArrowRight') {
      this.nextPhoto();
    }
  }

  private initializeMap(): void {
    if (this.map || !this.campusMap || typeof L === 'undefined') {
      return;
    }

    const locations = [
      {
        name: 'Guardería Virgen de Begoña',
        address: 'Sáenz Peña 742 - PA',
        coordinates: [-37.3042453, -59.1422167],
        pinOffsetX: -18,
        pinOffsetY: 0,
      },
      {
        name: 'Jardín Virgen de Begoña',
        address: 'Sáenz Peña 742 - PB',
        coordinates: [-37.3042453, -59.1422167],
        pinOffsetX: 18,
        pinOffsetY: 0,
      },
      {
        name: 'Colegio Nuestra Sra. de Begoña - Primaria',
        address: 'Sáenz Peña 751',
        coordinates: [-37.3041277, -59.142294],
        pinOffsetX: 18,
        pinOffsetY: -18,
      },
      {
        name: 'Colegio Nuestra Sra. de Begoña - Secundaria',
        address: 'Sáenz Peña 751',
        coordinates: [-37.3041277, -59.142294],
        pinOffsetX: 18,
        pinOffsetY: 18,
      },
    ];

    this.map = L.map(this.campusMap.nativeElement, {
      scrollWheelZoom: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(this.map);

    const createPin = (offsetX: number, offsetY: number) =>
      L.divIcon({
        className: 'school-map-marker',
        html: '<span class="school-map-pin" aria-hidden="true"></span>',
        iconAnchor: [15 - offsetX, 32 - offsetY],
        iconSize: [30, 32],
        popupAnchor: [offsetX, offsetY - 31],
      });

    const bounds = locations.map((location) => location.coordinates);
    locations.forEach((location) => {
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${location.address.replace(/ - P[AB]$/, '')}, Tandil, Buenos Aires`,
      )}`;

      L.marker(location.coordinates, {
        icon: createPin(location.pinOffsetX, location.pinOffsetY),
      })
        .addTo(this.map)
        .bindPopup(
          `<strong>${location.name}</strong><br>${location.address} - Tandil<br>` +
            `<a href="${googleMapsUrl}" target="_blank" rel="noopener noreferrer">Abrir en Google Maps</a>`,
        );
    });

    this.map.fitBounds(bounds, { padding: [50, 50], maxZoom: 19 });
  }
}
