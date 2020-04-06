# Patterns the tool focused on

* ` eval()`
* `obj['string'].call()`
* `obj['string'].apply()`
* `obj['string'] ()`

# Packages breakdown

| Total # of packages | Sink finder results      | Percent |
| ------------------- | ------------------------ | ------- |
| 50                  | 19 (7 were dependencies) | 52%     |



# Files within the 22 Packages breakdown

| True positives | Level 1 interests | False Positives | Total # of files |
| :------------: | :---------------: | :-------------: | :--------------: |
|     4 (1%)     |     18 (49%)      |    22 (50%)     |        44        |

Vis and Jquery were not looked at.

# Level 1 Breakdown Table

|         Package         |          Path/to/File [line_number]           | Determination   | Time spent on L1 |
| :---------------------: | :-------------------------------------------: | :-------------: | :--------------: |
|       Alt-0.18.6        |               /dist/alt.js [30]               | False Positive | 15m |
| Angular-resource-1.7.8  |          /angular-resources.js [898]          | Level 2 | 20m |
|     Backbone-1.4.0      |     /backbone.js [1463, 1466, 1469, 1474]     | Level 2 | 30m |
|       Depot-0.1.6       |         /specs/vendor/mocha.js [521]          | Pseudo Positive | 5m |
|     Director-1.2.8      |           /build/director.js [519]            | Level 2 | 30m |
|     Director-1.2.8      |           /build/director.js [338]            | False Positive | 25m |
|     Director-1.2.8      |         /lib/director/router.js [81]          | False Positive | 5m |
|     Director-1.2.8      |         /lib/director/router.js [451]         | Level 2 | 5m |
|       Flot-3.2.5*       |         /source/jquery.flot.js [370]          | Level 2 | 30m |
|       Mocha-6.2.0       | /mocha.js [12751, 12761, 12771, 12781, 12792] | Pseudo Positive | 30m |
| Twitter-bootstrap-2.1.1 |   /docs/assests/js/bootstrap-alert.js [76]    | False Positive  | 15m |
| Twitter-bootstrap-2.1.1 | /docs/assests/js/bootstrap-dropdown.js [131]  | False Positive  | 15m |
| Twitter-bootstrap-2.1.1 |   /docs/assests/js/bootstrap.js [135, 706]    | False Positive  | 15m |



Some files / L1s repeated in other locations with the same syntax (i.e. Twitter-Bootstrap in the /js folder instead of /docs)



# Level 2 Breakdown Table

|        Package         |      Path/to/File [line_number]       | Determination | Time spent on L2 (min) |
| :--------------------: | :-----------------------------------: | :-----------: | :--------------------: |
| Angular-resource-1.7.8 |      /angular-resources.js [898]      |      FP       |           45           |
|     Backbone-1.4.0     | /backbone.js [1463, 1466, 1469, 1474] |      FP       |           15           |
|     Director-1.2.8     |       /build/director.js [519]        |      FP       |           80           |
|     Director-1.2.8     |     /lib/director/router.js [451]     |      FP       |           30           |
|      Flot-3.2.5*       |     /source/jquery.flot.js [370]      |      FP       |           60           |

* Angular - It calls a put/get/pull method, wouldn't be able to inject anything here (predetermined values, anything else wouldn't make sense)
*  Backbone - Level 4ish, predetermined values. Could not inject our own method
*  Director - Router.prototype.invoke() seemed exploitable, but it isn't a top level api. I tried and wasn't able to invoke any malicious functions (exploded)
*  Router- never executes arguments, always ran on an empty array. (Predetermined values for what the methods would be)
* Flot - Executehooks seemed exploitable, but the data being passed was always sanitized and/or predetermined (exploded)