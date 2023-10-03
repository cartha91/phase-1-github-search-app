document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('github-form').addEventListener('submit', function(event) {
      event.preventDefault();
  
      let nameFinder = document.getElementById('search').value;
  
      fetch(`https://api.github.com/search/users?q=${nameFinder}`, {
        headers: {
          "Accept": "application/vnd.github.v3+json"
        }
      })
        .then(response => response.json())
        .then(data => {
          let userList = document.getElementById('user-list');
          userList.innerHTML = '';
          data.items.forEach(user => {
            let listItem = document.createElement('li');
  
            let avatar = document.createElement('img');
            avatar.src = user.avatar_url;
            avatar.width = 50;
            listItem.appendChild(avatar);
  
            let link = document.createElement('a');
            link.href = '#';
            link.textContent = user.login;
            link.addEventListener('click', function(event) {
              event.preventDefault();
              fetch(`https://api.github.com/users/${user.login}/repos`, {
                headers: {
                  "Accept": "application/vnd.github.v3+json"
                }
              })
                .then(response => response.json())
                .then(repos => {
                  let reposList = document.getElementById('repos-list');
                  reposList.innerHTML = '';
                  repos.forEach(repo => {
                    let repoItem = document.createElement('li');
  
                    let repoLink = document.createElement('a');
                    repoLink.href = repo.html_url;
                    repoLink.textContent = repo.name;
                    repoItem.appendChild(repoLink);
  
                    reposList.appendChild(repoItem);
                  });
                })
                .catch(error => console.error(error));
            });
            listItem.appendChild(link);
  
            userList.appendChild(listItem);
          });
        })
        .catch(error => console.error(error));
    });
  });