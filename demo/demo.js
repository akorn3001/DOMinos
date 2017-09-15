function toggleComplete() {
  $l('.todos-list li').on('click', function(e) {
    $l(e.currentTarget).toggleClass('complete');
    $l(e.currentTarget).toggleClass('incomplete');
  });
}

function fetchGif() {
  $gif = $l.ajax({
    url: "http://api.giphy.com/v1/gifs/search?q=cats&api_key=dc6zaTOxFJmzC",
    type: "GET",
    success: function(response) {
      let num = Math.floor(Math.random() * 25);
      let url = response.data[num].images.fixed_width.url;
      $l('#gifs').append(`<li><img src="${url}" /></li>`);
    }
  });
}

function clearGifs() {
  $l('#gifs li').remove();
}

function addToDo (event) {
  event.preventDefault();
  const $form = $l(event.currentTarget);
  const toDoText = $form.find('input[type=text]').nodes[0][0].value;

  const $newToDo = `<li class="incomplete">${toDoText}</li>`;

  $l('.todos-list').append($newToDo);
  toggleComplete();
  $form.find('input[type=text]').nodes[0][0].value = '';
}

$l(() => {
  toggleComplete();
  $l('form').on('submit', addToDo);
  $l('#fetch-gif').on('click', fetchGif);
  $l('#clear-gifs').on('click', clearGifs);
});
