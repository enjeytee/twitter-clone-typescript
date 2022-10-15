interface ItfRetweets {
    handle: string;
    profilePic: string;
    tweetText: string;
}
export interface ItfTweetsData 
    {
        handle: string;
        profilePic: string;
        likes: number;
        retweets: number;
        tweetText: string;
        replies: ItfRetweets[] | null[];
        isLiked: boolean;
        isRetweeted: boolean;
        uuid: string;
    }  