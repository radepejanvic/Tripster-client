import { Component, OnInit } from '@angular/core';
import {
  Accommodation,
  Review,
} from '../../accommodation-info/model/accommodation.model';
import { AccommodationInfoService } from '../../accommodation-info/accommodation-info.service';
import { AccommodationInfoCard } from '../../cards/accommodation-info-card/model/accommodation-info-card.model';
import { FilterService } from '../../filter/filter.service';
import { AccommodationRequest } from '../../cards/accommodation-request-card/model/accommodation-request.mode';
import { BasicFilterComponent } from '../../filter/basic-filter/basic-filter.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { Amenity } from 'src/app/shared/enum/amenity.enum';
import { AuthorizationService } from '../../authorization/authorization.service';
import { UtilService } from 'src/app/shared/util.service';
import { Reservation } from '../../cards/guest-reservation-card/model/reservation.model';
import { ReviewReport } from '../../cards/accommodation-review-report-card/model/review-report.model';

@Component({
  selector: 'app-filter-page',
  templateUrl: './filter-page.component.html',
  styleUrl: './filter-page.component.css',
})
export class FilterPageComponent implements OnInit {
  filterTitle: string = 'Your search';
  title: string = 'Search results';

  accommodations: AccommodationInfoCard[];
  accommodationRequests: AccommodationRequest[];
  hostAccommodation: AccommodationInfoCard[];
  guestReservation: Reservation[];
  hostReservation: Reservation[];
  accommodationReviews: Review[];
  accommodationReportReviews: ReviewReport[];
  userReviews: Review[];
  guestFavoriteAccommodation: AccommodationInfoCard[];
  role: string = '';

  constructor(
    private service: FilterService,
    private fb: FormBuilder,
    private authService: AuthorizationService,
    private util: UtilService
  ) {
    this.accommodations = [];
    this.accommodationRequests = [];
  }

  mainFormGroup: FormGroup;

  ngOnInit(): void {
    this.authService.userState.subscribe((result) => {
      this.role = result;
    });

    if (this.getCurrentURL().includes('guest/reservation')) {
      this.service
        .getGuestReservation(this.authService.getPersonId())
        .subscribe((value: Reservation[]) => {
          this.guestReservation = value;
          value.map((item) => {
            item.url = this.util.base64ToDataURL(item.photo);
          });
        });
    } else if (this.getCurrentURL().includes('guest/favoriteAccommodation')) {
      this.service
        .getGuestFavotiteAccommodation(this.authService.getPersonId())
        .subscribe((value: AccommodationInfoCard[]) => {
          this.guestFavoriteAccommodation = value;
          value.map((item) => {
            item.url = this.util.base64ToDataURL(item.photo);
          });
        });
    } else if (this.role == 'ROLE_GUEST') {
      this.service
        .getAllAccommodations()
        .subscribe((value: AccommodationInfoCard[]) => {
          this.accommodations = value;

          value.map((item) => {
            item.url = this.util.base64ToDataURL(item.photo);
          });
        });
    }

    if (this.getCurrentURL().includes('accommodationReviews')) {
      this.service.getAccommodationReview().subscribe((value: Review[]) => {
        this.accommodationReviews = value;
        value.map((item) => {
          if (item.reviewedPhoto)
            item.reviewUrl = this.util.base64ToDataURL(item.reviewedPhoto);
        });
      });
    } else if (this.getCurrentURL().includes('accommodationReportReviews')) {
      this.service;
      this.service
        .getAccommodationReportReview()
        .subscribe((value: ReviewReport[]) => {
          this.accommodationReportReviews = value;
          value.map((item) => {
            if (item.photo) item.url = this.util.base64ToDataURL(item.photo);
          });
        });
    } else if (this.role == 'ROLE_ADMIN') {
      this.service
        .getAccommodationRequestByFiltersForAdmin(new HttpParams())
        .subscribe((value: AccommodationRequest[]) => {
          this.accommodationRequests = value;
          value.map((item) => {
            item.url = this.util.base64ToDataURL(item.photo);
          });
        });
    }

    if (this.getCurrentURL().includes('host/reservation')) {
      this.service
        .getHostReservation(this.authService.getPersonId())
        .subscribe((value: Reservation[]) => {
          this.hostReservation = value;
          value.map((item) => {
            item.url = this.util.base64ToDataURL(item.photo);
          });
        });
    } else if (this.role == 'ROLE_HOST') {
      this.service
        .getAccommodationForHost(this.authService.getPersonId())
        .subscribe((value: AccommodationInfoCard[]) => {
          this.hostAccommodation = value;
          value.map((item) => {
            item.url = this.util.base64ToDataURL(item.photo);
          });
        });
    }

    this.mainFormGroup = this.fb.group({
      basicFilter: this.fb.group({
        destination: new FormControl(null),
        checkIn: new FormControl('', Validators.required),
        checkOut: new FormControl('', Validators.required),
        numberOfGuest: new FormControl(null, Validators.min(0)),
      }),
      additionalFilter: this.fb.group({
        amenities: [],
        type: new FormControl(null),
        minPrice: new FormControl(null),
        maxPrice: new FormControl(null),
      }),
      accommodationRequestsFilter: this.fb.group({
        requestType: [],
      }),
      reservationStatusFilter: this.fb.group({
        reservationType: [],
      }),
    });
  }

  onBasicFilter(data: any) {
    this.mainFormGroup.get('basicFilter')?.patchValue(data);
  }
  onAdditionalFilter(data: any) {
    this.mainFormGroup.get('additionalFilter')?.patchValue(data);
  }
  onAccommodationRequestsFilter(data: any) {
    this.mainFormGroup.get('accommodationRequestsFilter')?.patchValue(data);
  }
  onReservationStatusFilter(data: any) {
    this.mainFormGroup.get('reservationStatusFilter')?.patchValue(data);
  }
  sendRequest() {
    if (this.role == 'ROLE_ADMIN') {
      this.service
        .getAccommodationRequestByFiltersForAdmin(this.getAdminParams())
        .subscribe((value: AccommodationRequest[]) => {
          this.accommodationRequests = value;
          value.map((item) => {
            item.url = this.util.base64ToDataURL(item.photo);
          });
        });
    } else {
      if (this.mainFormGroup.get('basicFilter')?.valid) {
        if (this.getCurrentURL().includes('guest/reservation')) {
          this.service
            .getGuestReservationByParams(
              this.getGuestReseravtionParams(),
              this.authService.getPersonId()
            )
            .subscribe((value: Reservation[]) => {
              this.guestReservation = value;
              value.map((item) => {
                item.url = this.util.base64ToDataURL(item.photo);
              });
            });
        } else if (this.getCurrentURL().includes('host/reservation')) {
          this.service
            .getHostReservationByParams(
              this.getGuestReseravtionParams(),
              this.authService.getPersonId()
            )
            .subscribe((value: Reservation[]) => {
              this.hostReservation = value;
              value.map((item) => {
                item.url = this.util.base64ToDataURL(item.photo);
              });
            });
        } else {
          this.service
            .getAccommodationByFiltersForGuest(this.getParams())
            .subscribe((value: AccommodationInfoCard[]) => {
              this.accommodations = value;

              value.map((item) => {
                item.url = this.util.base64ToDataURL(item.photo);
              });
            });
        }
      }
    }
  }

  getParams(): HttpParams {
    const additionalFilter = this.mainFormGroup.get('additionalFilter')?.value;
    const basicFilter = this.mainFormGroup.get('basicFilter')?.value;

    var params = new HttpParams()
      .set('start', new Date(basicFilter.checkIn).getTime())
      .set('end', new Date(basicFilter.checkOut).getTime());

    if (basicFilter.destination !== null && basicFilter.destination !== '') {
      params = params.append('city', basicFilter.destination);
    }
    if (basicFilter.numberOfGuest !== null) {
      params = params.append('numOfGuests', basicFilter.numberOfGuest);
    }
    if (additionalFilter.maxPrice !== null) {
      params = params.append('maxPrice', additionalFilter.maxPrice);
    }
    if (additionalFilter.minPrice !== null) {
      params = params.append('minPrice', additionalFilter.minPrice);
    }
    if (
      additionalFilter.amenities !== null &&
      additionalFilter.amenities.length !== 0
    ) {
      params = params.append('amenities', additionalFilter.amenities);
    }
    if (additionalFilter.type !== null && additionalFilter.type !== '') {
      params = params.append('type', additionalFilter.type);
    }

    return params;
  }
  getAdminParams(): HttpParams {
    var params = new HttpParams();
    const accommodationRequestsFilter = this.mainFormGroup.get(
      'accommodationRequestsFilter'
    )?.value;
    if (
      accommodationRequestsFilter.requestType !== null &&
      accommodationRequestsFilter.requestType.length !== 0
    ) {
      params = params.append(
        'statusList',
        accommodationRequestsFilter.requestType
      );
    }
    return params;
  }

  getGuestReseravtionParams(): HttpParams {
    const basicFilter = this.mainFormGroup.get('basicFilter')?.value;
    const reservationStatusFilter = this.mainFormGroup.get(
      'reservationStatusFilter'
    )?.value;

    var params = new HttpParams()
      .set('start', new Date(basicFilter.checkIn).getTime())
      .set('end', new Date(basicFilter.checkOut).getTime());

    if (basicFilter.destination !== null && basicFilter.destination !== '') {
      params = params.append('name', basicFilter.destination);
    }
    if (
      reservationStatusFilter.reservationType !== null &&
      reservationStatusFilter.reservationType.length !== 0
    ) {
      params = params.append(
        'statusList',
        reservationStatusFilter.reservationType
      );
    }
    params.append('id', this.authService.getPersonId());
    return params;
  }

  getCurrentURL(): string {
    return window.location.href;
  }
}
