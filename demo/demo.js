function addToDo (event) {
  event.preventDefault();
  const $form = $l(event.currentTarget);
  const toDoText = $form.find('input[type=text]').nodes[0][0].value;

  const $newToDo = `<li class="incomplete">${toDoText}</li>`;

  $l('.todos-list').append($newToDo);
  $l('.todos-list li').on('click', function(e) {
    $l(e.currentTarget).toggleClass('complete');
    $l(e.currentTarget).toggleClass('incomplete');
  });
}

$l(() => {
  $l('form').on('submit', addToDo);
});
