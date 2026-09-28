'use strict';
const exampleDialog = document.querySelector('#example-dialog');
document.querySelector('#open-example-dialog').addEventListener('click', () => exampleDialog.showModal());
for (const id of ['keep-example', 'discard-example']) {
  document.getElementById(id).addEventListener('click', () => exampleDialog.close());
}
