//setup

var wordpress = require("wordpress");
var client = wordpress.createClient({
    url: "https://tradeitforweed.club",
    username: "admins",
    password: process.env.wpsecret
});
var terms = []
var WooCommerceAPI = require('woocommerce-api');

var WooCommerce = new WooCommerceAPI({
    url: 'https://tradeitforweed.club',
    consumerKey: process.env.wookey,
    consumerSecret: process.env.woosec,
    wpAPI: true,
    version: 'wc/v1'
});
var toPost = "";

var productPage = 1;
//function to get $productPage of products from Woo API
function getMoreWooProducts() {
    WooCommerce.get('products?page=' + productPage, function(err, data, res) {
        if (res.length <= 300) {
            doPostWootoSmoke();
        } else {
            for (var index1 in JSON.parse(res)) {
                productList.push(JSON.parse(res)[index1])

            }
            productPage++;
            getMoreWooProducts();
        }
    });
}
var productList = [];

//function to post items from productList that don't exist on Smoke to Smoke

function doPostWootoSmoke() {
    console.log(productList.length);
    for (var index1 in productList) {
        //console.log(productList[index1])
        var toPost = "";
        var title = (productList[index1].name);
        var perm = (productList[index1].permalink);
        toPost += "<br><a href='" + perm + "'>" + title + " available here! Click!</a><br><br>";
        var str = Math.random()
            .toString(36)
            .substring(2);
        perm = perm.substr(0, perm.length - 1).split('/')[perm.substr(0, perm.length - 1).split('/').length - 1] + '-' + str;

        for (var img in productList[index1].images) {
            toPost += (productList[index1].images[img].src + '<br>')
        }

        toPost += (productList[index1].short_description + '<br><br>');
        toPost += (productList[index1].description + '<br><br>');
        //console.log(5 * 61 * (index1+1));
        setTimeout(function() {

            asyncGetSmokePosts(perm, title, toPost, index1);

        }, 5 * 1000 * 61 * (index1+1));
    }
}

//Helper function returns true if str is in strArray's members, false if not

function searchStringInArray(str, strArray) {
    for (var j = 0; j < strArray.length; j++) {
        if (strArray[j].match(str)) return true;
    }
    return false;
}

//function to get Smoke.io posts asynchronously, takes permlink, title, toPost body to post on Smoke

function asyncGetSmokePosts(perm, title, toPost, index1) {

    steem.api.getBlogEntries(process.env.author, 9999, 1, function(err, data) {

        for (var index4 in data) {
            posts.push(data[index4])

        }
        for (var index2 in posts) {
            asyncPostProductsToSmoke(posts, index2, perm, title, toPost, index1);
        }
    });
}

//Async function to post Products to Smoke.io, takes a list of posts, two indexes for two lists, permlink, title and toPost body to post

function asyncPostProductsToSmoke(posts, index2, perm, title, toPost, index1) {
    if (!indexes.includes(index1)) {
        indexes.push(index1);
        const now = new Date().toISOString().split('.')[0];
        steem.api.getDiscussionsByAuthorBeforeDate(process.env.author, posts[index2].permlink, now, 1, function(err, result) {
            for (var index3 in result) {
                if (!takenPerms.includes(result[index3].permlink)) {
                    takenPerms.push(result[index3].permlink);
                }

            }
            //console.log(takenPerms);
            if (!searchStringInArray(perm.substr(0, perm.length - 12), takenPerms)) {
                //console.log(index1);
                //console.log(perm);
                steem.broadcast.comment(
                    process.env.steemPostPw,
                    '', // Leave parent author empty
                    'smokeio', // Main tag
                    process.env.author, // Author
                    perm, // Permlink
                    title, // Title
                    toPost, // Body
                    {
                        tags: ['products', 'marketplace', 'trade', 'barter'],
                        app: 'smokeio/tradeitforweed'
                    }, // Json Metadata
                    function(err, result) {
                        console.log(err, result);
                    }
                );


            }
        });
    }
}

//more setup
var indexes = []
takenPerms = []
const steem = require('./lib');
var posts = []

//an interval hourly grab of blog entries on Smoke to then re-post if not exist on WP, checks the tag == permlink to be sure not to repost

setInterval(function() {
    steem.api.getBlogEntries(process.env.author, 9999, 1, function(err, data) {

        for (var index4 in data) {
            posts.push(data[index4])

        }
        //console.log(posts);

        const now = new Date().toISOString().split('.')[0];
        for (var index1 in posts) {
            steem.api.getDiscussionsByAuthorBeforeDate(process.env.author, posts[index1].permlink, now, 1, function(err, result) {
                for (var index3 in result) {
                    client.getPosts(function(error, posts) {
                        //console.log(error);

                        for (var index2 in posts) {
                            for (var t in (posts[index2].terms)) {
                                terms.push(posts[index2].terms[t].name)
                            }
                        }
                        //console.log( "Found " + posts.length + " posts!" );
                        if (!terms.includes(result[index3].permlink)) {
                            takenPerms.push(result[index3].permlink);

                            newPost(result[index3].body, result[index3].title, result[index3].permlink)

                            //console.log(result[index3].body)
                            //console.log(result[index3].title)
                        }
                    });
                }

            });
        }

    });
    getMoreWooProducts();

}, 60 * 1000 * 60);
getMoreWooProducts();

// a funnction to post on WP, takes body title to post and permlink to add as a tag

function newPost(body, title, permlink) {
    client.newPost({
        title: title,
        content: body,
        termNames: {
            "category": ["smokeio", "Node"],
            "post_tag": ["smokeio", "js", permlink]
        },
        status: 'publish'
    }, function(error, data) {
        //console.log( arguments );
    });

}