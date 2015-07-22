myApp
    .filter('hourToString', function() {
        return function(hour) {
            var array = String(hour).split('.');
            var hour = array[0]
            var min = array[1]

            if (Number(hour) > 12) {
                hour = hour - 12;
                if (hour < 10) {
                    array[0] = '0' + hour;
                } else {
                    array[0] = String(hour);
                }
            }

            Number(min) === 5 ? array[1] = '30' : array.push('00')

            var str = array.join(':')
            return str;
        }
    })
