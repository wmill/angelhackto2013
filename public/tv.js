setup_sockets = function(tv_id){
  var notifications = io.connect('/tv_sockets/' + tv_id);
  notifications.on('show_item', function(item) {
  // item.url, item.type, where type = video / picture

    var url = item.url;
    var type = item.type; 
    var new_content;
    if (type === 'video')
    {
      new_content = $('<iframe />', {
        name: 'myframe',
        src: url    
      });
    }
    else
    {
      new_content = $('<img class="img" src=' + url + '></img>');
    }
    $('#content').html(new_content);
    console.log(item);
  });
};