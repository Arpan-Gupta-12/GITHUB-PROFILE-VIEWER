// index.js

const profileDiv = document.getElementById("profile");
const uidInput = document.getElementById('uid');
const searchBtn = document.getElementById('btn');

// Function to fetch and display user data
async function fetchUser(username) {
    // Show the loader while fetching
    profileDiv.innerHTML = `<span class="loader"></span>`;
    profileDiv.classList.add('visible'); // Make the container visible for the loader

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const result = await response.json();

        // Check if the user was not found
        if (result.message === "Not Found") {
            profileDiv.innerHTML = `<p>User not found. Please try another username.</p>`;
            return;
        }

        // Using a more readable variable for the profile link
        const profileURL = result.html_url;

        // NOTE: Added the "visible" class to the profDiv element below
        profileDiv.innerHTML = `
            <div class="profDiv visible">
                <div class="info">
                    <div class="img">
                        <img src="${result.avatar_url}" alt="${result.name}'s avatar">
                    </div>
                    <div class="bio">
                        <p class="username">${result.name || 'No Name Provided'}</p>
                        <p class="desig">${result.bio || 'No bio available.'}</p>
                    </div>
                </div>
                <div class="followInfo">
                    <div class="following">
                        <div class="social">
                            <p>Followers</p>
                            <p>${result.followers}</p>
                        </div>
                        <div class="social">
                            <p>Following</p>
                            <p>${result.following}</p>
                        </div>
                        <div class="social">
                            <p>Repositories</p>
                            <p>${result.public_repos}</p>
                        </div>
                    </div>
                    <a href="${profileURL}" target="_blank" class="visit">
                        Visit Profile
                    </a>
                </div>
            </div>`;

    } catch (error) {
        // Handle network errors, etc.
        profileDiv.innerHTML = `<p>Something went wrong. Please check your connection.</p>`;
        console.error("Fetch error:", error);
    }
}

// Event listener for the search button
searchBtn.addEventListener('click', () => {
    const username = uidInput.value;
    if (username) { // Only search if the input is not empty
        fetchUser(username);
    }
});
