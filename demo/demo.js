function addToDo (event) {
  event.preventDefault();
  const $form = $l(event.currentTarget);
  const toDoText = $form.find('input[type=text]').nodes[0][0].value;

  const $newToDo = $l('li', {
    text: toDoText,
    'class': 'incomplete'
  });

  $l('.todos-list').append($newToDo);
}

$l(() => {
  $l('form').on('submit', addToDo);
});
