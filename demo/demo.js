function toggleComplete() {
  $l('.todos-list li').on('click', function(e) {
    $l(e.currentTarget).toggleClass('complete');
    $l(e.currentTarget).toggleClass('incomplete');
  });
}

// function completeAllTodos(event) {
//   event.preventDefault();
//   $l('.incomplete').addClass('complete');
// }

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
  // $l('#complete-todos').on('click', completeAllTodos);
});
