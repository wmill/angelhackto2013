setup_sockets = function(tv_id){
  var notifications = io.connect('/tv_sockets/' + tv_id);
  notifications.on('show_item', function(item) {
  // item.url, item.type, where type = video / picture

    var url = item.url;
    var type = item.type; 
    var new_content;
    if (type === 'video'){
      new_content = $('<iframe />', {
        name: 'myframe',
        src: url
      });
    }
    else if (type === 'picture') {
      new_content = $('<img class="img" src=' + url + '></img>');
    }
    else if (type === 'mp4') {
      new_content = $('<video autoplay controls><source src="'
        + url + '" type="video/mp4"></video>');
      console.log(new_content);
    }
    $('#content').html(new_content);
    console.log(item);
  });
};