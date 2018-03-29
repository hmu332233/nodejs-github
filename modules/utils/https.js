const https = require('https');

module.exports = {
  request: function (options, callback) {
    https.request(options, function (res) {
      if (res.statusCode === 200) {
        res.on('data', function(_data) {
          var data = '';
          var buf = new Buffer(_data);

          data = JSON.parse(buf.toString());
          callback(null, data);
        });
      } else {
        callback(res);
      }
    });
  }
};