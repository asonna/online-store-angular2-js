import { Component, OnInit } from '@angular/core';
import { Album } from '../album.model';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { AlbumService } from '../album.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [AlbumService]
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private albumService: AlbumService) { }

  ngOnInit() {
  }
  submitForm(title: string, artist: string, description: string) {
   var newAlbum: Album = new Album(title, artist, description);
    this.albumService.addAlbum(newAlbum);
    this.router.navigate(['marketplace']);
 }

}
