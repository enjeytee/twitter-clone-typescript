import { tweetsData } from "./data.js";
const tweetBtn = document.getElementById("tweet-btn") as HTMLButtonElement;
const tweetInput = document.getElementById("tweet-input") as HTMLTextAreaElement;
tweetBtn.addEventListener("click", () => {
    console.log(tweetInput.value)
});
const getFeedHtml = () => {
    const feedHtml = tweetsData.reduce((acc, tweet) => {
        acc += `
            <div class="tweet">
                <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${tweet.handle}</p>
                        <p class="tweet-text">${tweet.tweetText}</p>
                        <div class="tweet-details">
                            <span class="tweet-detail">
                                <i class="fa-regular fa-comment-dots"></i>
                                ${tweet.replies.length}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-heart"></i>
                                ${tweet.likes}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-retweet"></i>
                                ${tweet.retweets}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            `
            return acc
        }, "");
        return feedHtml;
    };
const render = () => {
    const feed = document.getElementById("feed") as HTMLDivElement;
    feed.innerHTML = getFeedHtml();
};
render();