const logo = document.getElementById('logo');
const dropdownMenu = document.getElementById('dropdownMenu');


logo.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevents the event from propagating to the window
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});


/*window.addEventListener('click', () => {
  if (dropdownMenu.style.display === 'block') {
    dropdownMenu.style.display = 'none';
  }
});
*/