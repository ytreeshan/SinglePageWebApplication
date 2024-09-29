const rootDiv = document.getElementById('root');

function renderSignUp() {
    rootDiv.innerHTML = `
        <h1>Sign Up</h1>
        <form id="signupForm">
            <label for="name">Name:</label>
            <input type="text" id="name" placeholder="Enter your name"><br>
            <label for="email">Email:</label>
            <input type="email" id="email" placeholder="Enter your email"><br>
            <label for="password">Password:</label>
            <input type="password" id="password" placeholder="Enter your password"><br>
            <button type="button" onclick="handleSignUp()">Sign Up</button>
        </form>
    `;
}
renderSignUp(); // Call the function to render it on page load

let userName = '';

function handleSignUp() {
    const nameInput = document.getElementById('name').value;
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;

    if (nameInput && emailInput && passwordInput) {
        userName = nameInput;
        localStorage.setItem('userName', userName);  // Save user name to Local Storage
        renderHomePage();  // Move to the home page
    } else {
        alert('Please fill out all fields');
    }
}

function renderHomePage() {
    const storedUserName = localStorage.getItem('userName');  // Retrieve user name from Local Storage
    if (storedUserName) {
        userName = storedUserName;  // Set userName to the stored value
    }

    rootDiv.innerHTML = `
        <h1>Welcome, ${userName}!</h1>
        <h2>Create a Post</h2>
        <textarea id="postContent" placeholder="What's on your mind?"></textarea><br>
        <button type="button" onclick="handleCreatePost()">Post</button>
        <h3>Your Posts</h3>
        <ul id="postList"></ul>
    `;
    renderPostList();  // Render the posts when the home page loads
}


let posts = [];

function handleCreatePost() {
    const postContent = document.getElementById('postContent').value;

    if (postContent) {
        posts.push(postContent);  // Add the new post to the array
        localStorage.setItem('posts', JSON.stringify(posts));  // Save the updated posts array to Local Storage
        renderPostList();  // Re-render the list of posts
    } else {
        alert('Post content cannot be empty');
    }
}


function renderPostList() {
    const savedPosts = localStorage.getItem('posts');  // Retrieve posts from Local Storage
    if (savedPosts) {
        posts = JSON.parse(savedPosts);  // Parse and set the posts array
    }

    const postListElement = document.getElementById('postList');
    postListElement.innerHTML = '';  // Clear the current list of posts

    posts.forEach((post, index) => {
        const postItem = document.createElement('li');
        postItem.innerHTML = `
            ${post}
            <button onclick="editPost(${index})">Edit</button>
            <button onclick="deletePost(${index})">Delete</button>
        `;
        postListElement.appendChild(postItem);
    });
}

function editPost(index) {
    const newContent = prompt("Edit your post:", posts[index]);
    if (newContent) {
        posts[index] = newContent;  // Update the post in the array
        localStorage.setItem('posts', JSON.stringify(posts));  // Update Local Storage
        renderPostList();  // Re-render the post list
    }
}

function deletePost(index) {
    posts.splice(index, 1);  // Remove the post from the array
    localStorage.setItem('posts', JSON.stringify(posts));  // Update Local Storage
    renderPostList();  // Re-render the post list
}

