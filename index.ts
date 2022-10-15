import { tweetsData } from "./data.js";
const getFeedHtml = () => {
    const feedHtml = tweetsData.reduce((acc, tweet) => {
        let repliesHtml = "";
        tweet.replies.length && tweet.replies.forEach(reply => 
            repliesHtml += `
                <div class="tweet-reply">
                    <div class="tweet-inner">
                    <img src=${reply?.profilePic} class="profile-pic">
                        <div>
                            <p class="handle">${reply?.handle}</p>
                            <p class="tweet-text">${reply?.tweetText}</p>
                        </div>
                    </div>
                </div>
            `
        );
        acc += `
            <div class="tweet">
                <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${tweet.handle}</p>
                        <p class="tweet-text">${tweet.tweetText}</p>
                        <div class="tweet-details">
                                <span class="tweet-detail">
                                    <i class="fa-regular fa-comment-dots" 
                                        data-reply="${tweet.uuid}"
                                    ></i>
                                    ${tweet.replies.length}
                                </span>
                                <span class="tweet-detail">
                                    <i 
                                        class="fa-solid fa-heart ${tweet.isLiked && 'liked'}" 
                                        data-like="${tweet.uuid}"
                                    ></i>
                                    ${tweet.likes}
                                </span>
                                <span class="tweet-detail">
                                    <i 
                                        class="fa-solid fa-retweet ${tweet.isRetweeted && 'retweeted'}" 
                                        data-retweet="${tweet.uuid}"
                                    ></i>
                                    ${tweet.retweets}
                                </span>
                            </div>
                        </div>
                    </div>
                <div class="hidden" id="replies-${tweet.uuid}">
                    ${repliesHtml}
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
const handleLikeClick = (tweetId: string | undefined) => {
    const targetTweetObj = tweetsData.filter(tweet => tweet.uuid === tweetId)[0];
    targetTweetObj.isLiked ? targetTweetObj.likes-- : targetTweetObj.likes++;
    targetTweetObj.isLiked = !targetTweetObj.isLiked;
    render();
};
const handleRetweetClick = (tweetId: string | undefined) => {
    const targetTweetObj = tweetsData.filter(tweet => tweet.uuid === tweetId)[0];
    targetTweetObj.isRetweeted ? targetTweetObj.retweets-- : targetTweetObj.retweets++;
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;   
    render(); 
};
const handleRepliesClick = (id: string) => {
    document.getElementById(`replies-${id}`)?.classList.toggle("hidden");
};
const handleTweetBtn = () => {
    const tweetInput = document.getElementById("tweet-input") as HTMLTextAreaElement;
    tweetInput.value && tweetsData.unshift({
        handle: `@CoderJohn ✅`,
        profilePic: `images/MyPic.jpeg`,
        likes: 0,
        retweets: 0,
        tweetText: `${tweetInput.value}`,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: `${Date.now()}`
    });
    tweetInput.value && render();
    tweetInput.value = "";
};
document.addEventListener("click", event => {
    if (event !== null && event.target instanceof HTMLElement) {
        event.target.dataset.like && handleLikeClick(event.target.dataset.like);
        event.target.dataset.retweet && handleRetweetClick(event.target.dataset.retweet);
        event.target.dataset.reply && handleRepliesClick(event.target.dataset.reply);
        event.target.id === 'tweet-btn' && handleTweetBtn();
    };
});
render();