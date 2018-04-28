# calculateDueDate

##Using

```javascript
const calculateDueDate = require('./calculateDueDate');

calculateDueDate('2018-04-27 10:00:00', 4); //2018-04-27 14:00:00
calculateDueDate('2018-04-26 9:00:00', 10); //2018-04-27 11:00:00
calculateDueDate('2018-04-02 09:00:00', 253); //2018-05-15 14:00:00
```

##Notes

####global
* can define range working hours and days
* workingDays is number of day on week in american way: 0 is sunday

####Submit date
* based on Date class
* so I use for test this format: yyyy-mm-dd hh:mm:ss