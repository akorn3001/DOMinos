function addToDo (event) {
  debugger
  event.preventDefault();
  const $form = $l(event.currentTarget);
  const toDoText = $form.find('input[type=text]').val();

  const $newToDo = $l('<li>', {
    text: toDoText,
    'class': 'incomplete'
  });

  $l('.todos-list').append($newToDo);
}

$l(() => {
  $l('form').on('submit', addToDo);
});
