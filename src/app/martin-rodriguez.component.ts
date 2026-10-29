import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

declare const L: any;

@Component({
  selector: 'app-martin-rodriguez',
  imports: [RouterLink],
  templateUrl: './martin-rodriguez.component.html',
})
export class MartinRodriguezComponent implements AfterViewInit, OnDestroy {
  @ViewChild('campusMap') campusMap?: ElementRef<HTMLElement>;

  readonly santaCeciliaPhotos = [
    'assets/images/santa_cecilia_1.png',
    'assets/images/santa_cecilia_2.png',
  ];
  readonly escuelaRodriguezPhotos = [
    'assets/images/escuela_rodriguez_1.png',
    'assets/images/escuela_rodriguez_2.png',
  ];
  readonly institutoRodriguezPhotos = [
    'assets/images/instituto_1.png',
    'assets/images/instituto_2.png',
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
        name: 'Jardín Santa Cecilia',
        address: 'Av. Balbín 980',
        coordinates: [-37.3151257, -59.1216158],
      },
      {
        name: 'Instituto Brig. Gral. Martín Rodríguez',
        address: 'Av. Balbín 910',
        coordinates: [-37.3158111, -59.1211903],
      },
      {
        name: 'Escuela Brig. Gral. Martín Rodríguez',
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
