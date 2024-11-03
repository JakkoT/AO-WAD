//fetch("https://api.npoint.io/f9f4ef42fe34c0da7ee3")
fetch("posts.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);

    data.forEach((element) => {
      console.log(element);
      let postHTML;
      if (typeof element.image === "undefined") {
        postHTML = `
        <div class="post">
          <table>
            <tr>
              <td>
                <img src="${element.profilePicture}" alt="User icon" width="30" height="30" />
              </td>
              <td>
                <p>${element.createTime}</p>
              </td>
            </tr>
            <tr>
              <td colspan="3">
                <p>${element.content}</p>
              </td>
            </tr>
            <tr>
              <td>
                <img src="${element.reaction}" alt="Reaction" width="25" height="25" />
              </td>
            </tr>
          </table>
        </div>
      `;
      } else {
        postHTML = `
        <div class="post">
          <table>
            <tr>
              <td>
                <img src="${element.profilePicture}" alt="User icon" width="30" height=30" />
              </td>
              <td>
                <p>${element.createTime}</p>
              </td>
            </tr>
            <tr>
              <td colspan="3">
                <img class="postimg" src="${element.image}" alt="" />
              </td>
            </tr>
            <tr>
              <td colspan="3">
                <p>${element.content}</p>
              </td>
            </tr>
            <tr>
              <td>
                <img src="${element.reaction}" alt="Reaction" width="25" height="25" />
              </td>
            </tr>
          </table>
        </div>
      `;
      }

      let postLoc = document.getElementById("middle");
      postLoc.innerHTML += postHTML;
    });
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });


const logo = document.getElementById('logo');
const dropdownMenu = document.getElementById('dropdownMenu');


logo.addEventListener('click', (event) => {
  event.stopPropagation(); // Prevents the event from propagating to the window
  dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});


window.addEventListener('click', () => {
  if (dropdownMenu.style.display === 'block') {
    dropdownMenu.style.display = 'none';
  }
});
