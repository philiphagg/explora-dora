# Project description

This is a project that is done by the contributing members in the course DH2642 Interaction Programming and the Dynamic Web.
<br>
The app is designed to be a geocaching game where you explore Stockholm and earn collectibles. When walking around on the map, different markers will appear. When you are approx 15 meters from the object you can "collect it" by pressing the marker. <br>
A new view should appear where you can upload a picture and write a caption. All these uploads will be available in a feed where users can like each others pictures that were taken at different collectibles' locations.
<br>
The user can see their own collectibles under the collectibles tab. You can swap the design of the app to dark mode or light mode under the profile tab. Where the user can change their nickname.
On the map screen the user can view the map "play" the game. Under the progress map, users will be able to see the collectibles.

There is collectibles inside KTH Kista and at KTH campus for debugging purposes

---
## What have we done
Firstly we created a small UML architecture for the app.
We understood that by creating and deciding what views we needed was a good entry point to see how the actual app would
look like. We started off with the main one that were the "Navigationbar" that would show the menu containing
"Map, ProgressView, FeedView, High score, Collectibles, ProfileView".
After that we divided the work in the group to make the work as efficient as possible.
After that we implemented redux, firebase auth, map and pages.

While implementing firebase we faced some smaller issues, which made this step take a bit time.
When firebase was implemented it was now possible to both use authentication and upload data to the database.
The next big step was making sure that the map-api was functional and implemented in a correct way.
This was a crucial to make the entire app work as planned.

We began with just react state where we "hardcoded" some
test/data just to make sure that the application was working. When we realised that everything was connected and
implemented correctly the next step was to implement Redux state which became a central role of the application.
The reason for this is that by implementing redux, we could replace the model entirely. By doing this some
code had to be re-written.

---
### Output from API
While using the api for the map, we want to track the users movement. So the output looks like below. Which is logged to the expo console, while using the app.
```javascript
Continuous location: {"speed":-1,"heading":-1,"longitude":17.868970969615283,"accuracy":35,"latitude":59.41208123563255,"altitudeAccuracy":14.094679832458496,"altitude":15.767148971557617,"latitudeDelta":0.01,"longitudeDelta":0.01}
```

---
## What should we do next
+ We need to save the user's path on firebase in order to display them as a heatmap onto the progress screen
+ image upload is still buggy and needs fixes for IOS.
+ image uploads should be linked to the post
+ async animations when user is waiting
+ heatmap optimisation
+ add more collectibles

---
# How to install and run the app
Because the app is made for mobile devices, Examinator has confirmed that we don't need to host the app, on Heroku/Firebase
<br><br>
Make sure you have npm installed on your computer [download npm here](https://nodejs.org/en/download/)

1. Download the repo to your computer
2. Use the terminal/powershell to navigate to the root directory of the project
3. Run the command ```npm install expo-cli```** and ``` npm install ``` in order to install dependencies. 
5. Download the app "Expo Go" from app store or google play.
6. Run command ``` expo start ``` or ``` npm start ```in the computers terminal/powershell, to launch the app.
   <br>The app should launch in your web-browser.
7. Scan the barcode with your phone.

*If error occur during expo-cli installation, run ```sudo npm install --unsafe-perm -g expo-cli ``` in git bash for additional rights.

Now the app should compile and run on your phone.
Click around and give it a try.



---
## Debug and console
On point 5 in above guide. When the app is launched with expo start, a tab should open in your browser.
if it doesn't you can press  ```d``` in the terminal that runs expo. In the browser, you can change connection to tunnel. If you want to enter the same instance of the application.

---
## Short description of files
Below image is a mindmap under construction. Was made week one to describe the architecture.

![UML](https://github.com/Digitusmedia/explora-dora/blob/main/mindmap.png)

[file]: https://img.icons8.com/ios/50/000000/file--v1.png

![](https://img.icons8.com/material-outlined/24/000000/folder-invoices.png)
Firebase

![](https://img.icons8.com/material-outlined/24/000000/folder-invoices.png)
Presenters

![](https://img.icons8.com/material-outlined/24/000000/folder-invoices.png)
Redux

![](https://img.icons8.com/material-outlined/24/000000/folder-invoices.png)
Views
### Firebase 
      firebaseConfig - containing the api-keys etc
      FirebaseFunctions - helper functions to communicate with firebase
### Presenters
      CollectionView - View the collection of the signed in user
      feed - shows the feed of all users collected items 
      high score - shows a high score list of all the users
      map - handles the api calls and presenting the map to the users
      profile - user profile, where you can change app theme and nickname and credentials
      progress - shows in map form all the collected items

### Redux
      Storee - Combining all the reducers

### Reducers
All below files updates states for the model layer.

      Camera
      collection
      feed
      markers
      paths
      theme
      user 

### Views
      Addpost - a view where u can add a post
      CollectionView - a view of each users private collectibles
      FeedView - shows the feed of all the users latest posts
      HighscoreView - A high score list of all the users based on users collectibles 
      LoginView - A view over the login screen
      MapView1 - File should be renamed, but is the map view
      MapViewNavigator - experimental file
      Navigationbar - responsible for navigating the user and routing
      ProfileView - Show the profile to the user
      ProgressView - shows the progress to the user

### Component
      Button - containing the button function
      Camera - uses the camera 
      LoadingAnimation - containing a function displaying the loadingscreen

### Other files
      app - launches the app and the navigation
      styles - CSS file for react native
      stylesDark - Dark theme
      stylesLight - Light theme
