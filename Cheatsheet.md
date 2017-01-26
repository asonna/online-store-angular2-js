## Create new project
ng new online-store

##Install bower
*npm list -g bower*
 or global install if no version was received:
*npm install bower -g*

## Initialize bower
*bower init*

- Add */bower_components* under the dependencies section of the .gitignore file.
###&
...
# dependencies
/node_modules
*/bower_components*
...
###

- Install bower dependencies like bootstrap:
*bower install bootstrap --save*

- Modify the *angular-cli.json* file to include the bower package code as follow:
###
...
"apps": [
    {
      ...
      ],
      ...
      "styles": [
        "styles.css",
        *"../bower_components/bootstrap/dist/css/bootstrap.css"*
      ],
...
###

Use following command:
- *ng serve* - to lauch project
- *ng lint* - to catch errors if any
- *ng g component ComponentName* - create component page
- *ng g component welcome* - to create pipe if needed
- *ng g class class-name.model* - to create the object model and add to it the constructor with properties as follow:
###*
  constructor (public title: string, public artist: string, public description: string) {}
###*
- Finalize Design
- Create route file:
(/app/app.routing.ts)
-Import the following to top of the file.
###*
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [ ];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
###*
FOR NEW ROUTES IMPORT COMPONENT (xxx means the name of the component) & DEFINE PATH


- Update the following file: *(app/app.routing.ts)* with below:
###*
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { XxxComponent } from './xxx/xxx.component';

const appRoutes: Routes = [
  {
    path: '',
    component: XxxComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
###

- Update the following file to import router into the app module *(.../app/app.module.ts)* with below:
###*
...
import { WelcomeComponent } from './welcome/welcome.component';
import { routing } from './app.routing';
...
###

- Update the following file to export router so other components can access it *(.../app/app.routing.ts)* with below:
###*
...
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
###

- add the routing constant to our root module's *(.../app/app.module.ts)* imports array:
###*
...
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
...
###

- Render route with the router outlet added into the *(src/app/app.component.html)* as follow:
###*
<h1>{{title}}</h1>
<router-outlet></router-outlet>
###

- Add div and page title to our root component *(src/app/app.component.html)*. like this example:
###*
<div class="container">
  <h1>{{title}}</h1>
  <router-outlet></router-outlet>
</div>
###

- You can now change the title on your app.component.ts file if wanted
- Also update your other component.html file to reflect what you want to display.

- RouterLink are located in the app.component.html file:
###
...
   <a class="navbar-brand" routerLink="">Epicodus Tunes</a>
    ...
      <li><a routerLink="about">About</a></li>
...
###

- All routes paths are defined in the app.routing.ts file as follow:
###
...
const appRoutes: Routes = [
  {
     path: '',
     component: WelcomeComponent
   },
...
###
_________________________________________________________________

## Firebase install##

1 - log into a firebase system: https://firebase.google.com/

2 - Create new firebase project -

3 - Select Add Firebase to Web is building a web based application

4 - Run the command to install firebase in your angular file :
  $ npm install angularfire2 firebase --save

5 - Edit src/tsconfig.json to add the following line:
### "types": [ "firebase" ] ###
right after this line:
###"../node_modules/@types" ], ###

6 - Create src/app/api-keys.ts file to place in our following firebase credential replacing xxxx with true credential from your firebase:
### export var masterFirebaseConfig = {
    apiKey: "xxxx",
    authDomain: "xxxx.firebaseapp.com",
    databaseURL: "https://xxxx.firebaseio.com",
    storageBucket: "xxxx.appspot.com",
    messagingSenderId: "xxxx"
  }; ###

7 - Add this in .gitignore file to ignore the firebase keys:
###   #Firebase credentials
      /src/app/api-keys.ts   ###

8 - Import our Firebase credentials into our root module by adding the following two line of code in src/app/app.modules:
###*
import { masterFirebaseConfig } from './api-keys';
import { AngularFireModule } from 'angularfire2';
###

9- Export firebaseConfig using below code: (We'll fetch each value from the masterFirebaseConfig object we imported (and ignored). This will make them available throughout our root module *app.modules.ts*)
###
export const firebaseConfig = {
  apiKey: masterFirebaseConfig.apiKey,
  authDomain: masterFirebaseConfig.authDomain,
  databaseURL: masterFirebaseConfig.databaseURL,
  storageBucket: masterFirebaseConfig.storageBucket
};
###

10 - Add the AngularFireModule we just imported to the root component's imports array in *app.modules.ts*; it's also called initializeApp() method and passes in our Firebase credentials; and to be added right after "routing," under "imports" section in the body:
### AngularFireModule.initializeApp(firebaseConfig) ###

11- Back to the firebase site, click on "database", then "rules" and update the rules as follow to allow applications to read and write to it:
###
{
  "rules": {
    ".read": "true",
    ".write": "true"
  }
}
###

12 - Create a json file in our project upper level called XXXX.json with information we want to save in the database.

13 - Upload the created json file into our firebase following these steps:
  - Visit your Firebase Console and select your project's database.
  - Click on the Database option in the left-hand navigational menu.
  - Select the 3 vertical dots on the right-hand side of the grey bar with your database URL on it. (It's right next to the + and - buttons). This should bring up a small menu.
  - Select Import JSON from this menu. This will result in a modal window prompting you to upload a file.
  - Locate the xxx.json file from your project, and upload it.
  - After the file is uploaded, you should see data in your database. Awesome! Our new database now has records!

14 - Update Album  service. Import the necessary additional packages at the top of our service file.
###
import { AngularFire, FirebaseListObservable } from 'angularfire2';
###

15 -Declare the AlbumService's existing albums property to be FirebaseListObservable<any[]> type:
###
@Injectable() export class AlbumService { albums: FirebaseListObservable<any[]>;
###

16 - Include an instance of AngularFire in the service's constructor, making the Firebase application instance available for our service to use as soon as it's started:
###
constructor(private angularFire: AngularFire) {
  }
###

Then define the service's existing albums property:
###
constructor(private angularFire: AngularFire) {
  this.albums = angularFire.database.list('albums');
}
###

17 - Update getAlbums method in album.service (src/app/album.service.ts):

###
getAlbums(){
  return this.albums;
}
###

18 - Make sure the album property in MarketplaceComponent matches FirebaseListObservable<any[]> data type (src/app/marketplace/marketplace-component.ts):

###
export class MarketplaceComponent implements OnInit{
  albums: FirebaseListObservable<any[]>;
    ...
###

19 - Make sure that the ngFor loop uses the asynch pipe, so that the data is shown only once it has been loaded (src/app/marketplace/marketplace.component.html):
###
<div ** *ngFor="let album of albums | async" ...>  **
###

20 - To add new objects to the database, we need to set up new route.
  20.1- Create an admin component using the following:
### ng g component admin ###

  20.2- Import it into our router file as follow:
###
  ...
  import { AdminComponent }   from './admin/admin.component';

  const appRoutes: Routes = [
    ...
    {
      path: 'admin',
      component: AdminComponent
    }
   ];
  ...
###

  20.3 - Create routeLink (footer) in *"src/app/app.component.html"* for users to navigate to the new Admin route:
###*
<footer class="footer">
  <div class="container">
    <a class="text-muted" routerLink="admin">Admin</a>
  </div>
</footer>
###

  20.4 - CSS to help fix on footer at the bottom and not move as pages changes in *src/styles.css*:
###
footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #f5f5f5;
  padding: 15px;
}
###

21 - Create a form needed in *src/app/admin/admin.component.html* to be used to collect information as the example below:
###*
<h3>Add New Album to Inventory</h3>
<div>
  <div>
    <label>Album Title:</label>
    <br>
    <input #newTitle>
  </div>

  <div>
    <label>Album Artist:</label>
    <br>
    <input #newArtist>
  </div>

  <div>
    <label>Album Description:</label>
    <br>
    <textarea #newDescription></textarea>
  </div>
</div>
###

22 - Add a button to trigger a method that create the object in *src/app/admin.component.html* :
###*
...
      <div>
        <label>Album Description:</label>
        <br>
        <textarea #newDescription></textarea>
      </div>
      <button (click)="submitForm(newTitle.value, newArtist.value, newDescription.value)">Add</button>
...
###

23 - Add an event binding in *src/app/admin/admin.component.html* to trigger a submitForm() method when clicked:
###*
...
      <button (click)="submitForm(newTitle.value, newArtist.value, newDescription.value); newTitle.value=''; newArtist.value=''; newDescription.value=''">Add</button>
...
###

24 - Define submitForm() in the AdminComponent *src/app/admin/admin.component.ts*:
###*
submitForm(title: string, artist: string, description: string) {
  var newAlbum: Album = new Album(title, artist, description);
  console.log(newAlbum);
}
###&

**FYI**: Note that id is not used and if initially defined, will need to be removed from the *src/app/album.model.ts*.

25 - In the admin component file, add the following AngularFire and FirebaseObjectObservable packages, and the AlbumService itself :
###*
import { Component } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { AlbumService } from '../album.service';
###

26 - Add the objectServices to the constructor in *src/app/admin/admin.component.ts* :
###&
...
  constructor(private albumService: AlbumService) { }
...
###

27 - Create a providers array in the AdminComponent's annotation *src/app/admin/admin.component.ts*, and register AlbumService:
###
...
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [AlbumService]
})
...
###

28 - Create a method in the AlbumService *src/app/album.service.ts* to manage the creation of new database entries. This method will be called by the *submitForm()* method in the AdminComponent invoking the service to save a new album object to Firebase:
###*
addAlbum(newAlbum: Album) {
  this.albums.push(newAlbum);
}
###

FYI - Gray out any method still pointing out to a local repository such as *mock-albums* .

29 - Update *submitForm()* method in our AdminComponent *src/app/admin/admin.component.ts* to call the service's new AddObject() method:
###
...
  submitForm(title: string, artist: string, description: string) {
    var newAlbum: Album = new Album(title, artist, description);
    this.albumService.addAlbum(newAlbum);
  }

...
###

30 -
