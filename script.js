const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

async function getPosts() {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data = await response.json();
    return data;
}

//Show posts in DOM
async function showPosts() {
    const posts = await getPosts();
    console.log({ posts })
    posts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `
        <div class="number">
            <p>${post.id}</p>
        </div>
        <div class="post-info">
            <h2 class='post-title'>${post.title}</h2>
            <p class="post-body">${post.body} </p>
        </div>
        `;

        postsContainer.appendChild(postEl);
    })
}

function showLoader() {
    loading.classList.add('show');

    setTimeout(() => {
        loading.classList.remove('show');

        setTimeout(() => {
            page++;
            console.log('showing new posts')
            showPosts();
        }, 300);
    }, 1000);
}

function filerPosts(event) {
    const term = event.target.value.toLowerCase();
    const posts = document.querySelectorAll('.post');
    console.log('fuck', posts)
    posts.forEach((post) => {
        const title = post.querySelector('.post-title').innerText.toLowerCase();
        const body = post.querySelector('.post-body').innerText.toLowerCase();
        if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }

    })

}
showPosts()

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showLoader();
    }
});

filter.addEventListener('input', filerPosts);