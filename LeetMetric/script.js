document.addEventListener("DOMContentLoaded", function() {
    const searchBtn = document.getElementById("search-btn");
    const usernameInput = document.getElementById("username");
    const statsContainer = document.querySelector(".stats-container");
    const mediumProgress = document.querySelector(".medium-progress");
    const easyProgress = document.querySelector(".easy-progress");
    const hardProgress = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatContainer = document.querySelector(".stats-card");

    function validateUsername(username) {
        if (username.trim() === "") {
            alert("Username should not be empty");
            return false;
        }
        const regex = /^(?!_)[a-zA-Z0-9_]{4,15}(?<!_)$/;
        const isMatching = regex.test(username);
        if (!isMatching) {
            alert("Invalid username");
        }
        return isMatching;
    }

    async function fetchUserDetail(username) {
        try {
            searchBtn.textContent = "Searching...";
            searchBtn.disabled = true;

            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const targetUrl = 'https://leetcode.com/graphql/';

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const graphql = JSON.stringify({
                query: `
                    query userSessionProgress($username: String!) {
                        allQuestionsCount {
                            difficulty
                            count
                        }
                        matchedUser(username: $username) {
                            submitStats {
                                acSubmissionNum {
                                    difficulty
                                    count
                                    submission
                                }
                                totalSubmissionNum {
                                    difficulty
                                    count
                                    submission
                                }
                            }
                        }
                    }
                `,
                variables: { "username":'${username}' }
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: graphql,
                redirect: "follow"
            };

            const response = await fetch(proxyUrl+targetUrl, requestOptions);

            if (!response.ok) {
                alert("User not found or network error.");
                return;
            }
            const parsedData = await response.json();
            console.log("User Data:", parsedData);

            // displayUserData(parsedData);

        } catch (error) {
            alert("Error fetching data. Please try again later.");
            console.error("Fetch Error:", error);
        } finally {
            searchBtn.textContent = "Search";
            searchBtn.disabled = false;
        }
    }

    // function displayUserData(parsedData) {
    // }

    searchBtn.addEventListener('click', function() {
        const username = usernameInput.value;
        console.log("Logging Username:", username);
        if (validateUsername(username)) {
            fetchUserDetail(username);
        }
    });
});