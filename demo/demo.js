function toggleComplete() {
  $dom('.todos-list li').on('click', function(e) {
    $dom(e.currentTarget).toggleClass('complete');
    $dom(e.currentTarget).toggleClass('incomplete');
  });
}

function fetchGif() {
  $gif = $dom.ajax({
    url: "http://api.giphy.com/v1/gifs/search?q=cats&api_key=dc6zaTOxFJmzC",
    type: "GET",
    success: function(response) {
      let num = Math.floor(Math.random() * 25);
      let url = response.data[num].images.fixed_width.url;
      $dom('#gifs').append(`<li><img src="${url}" /></li>`);
    }
  });
}

function clearGifs() {
  $dom('#gifs li').remove();
}

function clearTodos() {
  $dom('.todos-list li').remove();
}

function addToDo (event) {
  event.preventDefault();
  const $form = $dom(event.currentTarget);
  const toDoText = $form.find('input[type=text]').nodes[0][0].value;

  const $newToDo = `<li class="incomplete">${toDoText}</li>`;

  $dom('.todos-list').append($newToDo);
  toggleComplete();
  $form.find('input[type=text]').nodes[0][0].value = '';
}

$dom(() => {
  toggleComplete();
  $dom('form').on('submit', addToDo);
  $dom('#fetch-gif').on('click', fetchGif);
  $dom('#clear-gifs').on('click', clearGifs);
  $dom('#clear-todos').on('click', clearTodos);
});
