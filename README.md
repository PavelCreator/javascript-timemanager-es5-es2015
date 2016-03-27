<h1>JavaScript demo of skills (OOP, ES5, ES2015, Gulp, npm, Nightwatch.js, Mocha/Chai)</h1>
<h3>Timemanager is a web-service for measure the time</h3>
<h3><a href="http://melomance.net/timemanager/">Full demo</a></h3>
<h3>Functionality:</h3>
<ul>
  <li>There are <strong>3 modes</strong> - 'TIMER' (count down), 'STOP WATCH' (count up), 'WATCH' (clock)</li>
  <li>User can start/stop by <strong>ENTER</strong> or <strong>SPACE</strong> key</li>
  <li>User can select a <strong>melody</strong>, <strong>volume</strong> or <strong>mute</strong> the ringer</li>
  <li>User can <strong>manually</strong> enter the value in field. <strong>3 HTML inputs work as one field</strong>, and this is implemented without plugins</li>
  <li>All user settings are <strong>stored</strong> in the browser via LocalStorage</li>
  <li>The current value and the name of the counter is displayed in the <strong>title of the browser tab</strong></li>
  <li>'TIMER' mode also <strong>can count up</strong> after the end of time (customizable)</li>
  <li><strong>Responsive cross-browser</strong> custom design</li>
</ul>

<h3>Programming:</h3>
<ul>
  <li>Project have <strong>ES5</strong> and <strong>ES2015</strong> separate sources (both is full versions)</li>
  <li>The system is collected automatically using <strong>npm</strong></li>
  <li>Auto deploy using <strong>Gulp</strong></li>
  <li>The project is completely covered by End-to-End tests using <strong>Nightwatch.js</strong></li>
  <li>Also functional tests are written using <strong>Chai/Mocha</strong></li>
</ul>

<h4>Gulp processing:</h4>
<ul>
  <li><strong>ES5</strong> - collected from the files pack, minimized, unglifyed, console.log and comments deleted</li>
  <li><strong>ES2015</strong> - like ES5 and also processed with Babel</li>
  <li><strong>SCSS</strong> - conveted in CSS, minimized, comments deleted</li>
  <li><strong>HTML</strong> - minimised, comments deleted</li>
  <li><strong>Images</strong> - optimized</li>
  <li>Written <strong>watchers</strong> for separate parts and "Packs"</li>
  <li>Written <strong>error-stubs</strong> and <strong>notifications</strong> for all tasks</li>
</ul>

<h4>Deploy:</h4>
<ul>
<li>1) install all node modules. Enter in console:
<strong>npm install</strong></li>
<li>2) make build
<br><strong>gulp b5</strong> - to generate ES5 build
<br><strong>gulp b6</strong> - to generate ES2015 build
<br><strong>gulp b5t</strong> - to generate ES5 build with Chai/Mocha tests
<br><strong>gulp b6t</strong> - to generate ES2015 build with Chai/Mocha tests</li>
</ul>

<h4>Nightwatch.js End-to-End tests:</h4>
<ul>
<li>1) Make all next steps only after deploy</li>
<li>2) Init Selenium server: <strong>java -jar "tests\nightwatch\drivers\selenium-server-standalone-2.52.0.jar"</strong></li>
<li>3) Run Tests: <strong>node nightwatch.js</strong></li>
</ul>
<p>For default tests work in Mozilla Firefox, for making tests in another browsers read <a href='http://nightwatchjs.org/guide'>Nightwatch.js Developer Guide</a>
<br>I maked custom color logs for console to more understandable tests process</p>
<p>
[![ScreenShot](https://raw.github.com/GabLeRoux/WebMole/master/ressources/WebMole_Youtube_Video.png) ](http://youtu.be/vt5fpE0bzSY)
</p>

<p>[![Nightwatch.js End-to-End tests, Chai/Mocha functional tests](http://img.youtube.com/vi/khx1WiCrNDI/0.jpg)](https://www.youtube.com/watch?v=khx1WiCrNDI "Nightwatch.js End-to-End tests, Chai/Mocha functional tests")
<iframe width="560" height="315" src="https://www.youtube.com/embed/khx1WiCrNDI" frameborder="0" allowfullscreen></iframe>
</p>

<a href="http://www.youtube.com/watch?feature=player_embedded&v=khx1WiCrNDI
" target="_blank"><img src="http://img.youtube.com/vi/khx1WiCrNDI/0.jpg" 
alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>

<p><img src='http://melomance.net/timemanager/for_github/nightwatch.jpg'></p>

<h4>Chai/Mocha functional tests:</h4>
<p>
<img src='http://melomance.net/timemanager/for_github/chai_mocha_1.jpg'>
<img src='http://melomance.net/timemanager/for_github/chai_mocha_2.jpg'>
</p>
