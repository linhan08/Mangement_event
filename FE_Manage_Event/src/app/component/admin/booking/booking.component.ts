import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ArtistService } from 'src/app/services/admin/artist.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit, OnChanges, OnDestroy {


  constructor(private artisService: ArtistService) {
    // goi song song 2 api


    // goi lan luot
  //   this.artisService.getUserInfo('1').pipe(
  //     concatMap(res => {
  //       return this.artisService.getPostByUserId(res);
  //     })
  //   )
  //   .subscribe(res => {})
  }
  ngOnDestroy(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.movie && changes.movie.currentValue) {
      console.log();

    }
  }

  ngOnInit(): void {
  }


}
