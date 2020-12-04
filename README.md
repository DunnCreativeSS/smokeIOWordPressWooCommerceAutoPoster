If you found this repo useful, consider clicking the sponsor button near the top :) Sponsoring via GitHub is as little as $1/month and if you do not use banks or credit cards, there are crypto links included :)<br /><br />
# smokeIOWordPressWooCommerceAutoPoster

#### Repository
https://github.com/DunnCreativeSS/smokeIOWordPressWooCommerceAutoPoster

### Sites
https://tradeitforweed.club
https://smoke.io

### Bug Fixes
- What was the issue(s)?

1. Along the way of development for initial commit, WooCommerce .get('products') returned 1 page or 10 items

- What was the solution?

1. I had a look at Woo API's docs and found you have to pass params (like page=2) through the .get('products?page=2') in order to get additional products. It now receives all 27 products we have published.

![27.png](https://ipfs.busy.org/ipfs/QmebR1a6c8CZdvBetvAQatGZNESQk7YzhJ6avreCwkei5E)

### New Features
- What feature(s) did you add?

1. Posts on Smoke.IO will be added as a WP post
2. Posts on WP added with the tag 'smokeio' (which I used to create a posts widget that shows only this tag) 
3. Posts on WP added with a tag that has the permlink from Smoke.IO, so that the same posts aren't re-posted
4. Products on WP will be added as a Smoke.io post
5. Posts on Smoke.io added with a permlink of the last split('/') of the url of the WP item, as well as random string, we don't post more than once
6. Posts on Smoke.io have images from a loop of images on WP
7. Posts on Smoke.io have a link back to the WP item
8. Posts on Smoke.io have an application metadata

- How did you implement it/them?
1, 2 and 3 ![newPost.png](https://ipfs.busy.org/ipfs/QmeYJwoDWfyyjt1nKXjxTbqPSQdQKevsXMtRKN4HDBi5NM)

4: ![smokePOst.png](https://ipfs.busy.org/ipfs/QmQTFtK2S9o4etz8KiMVCnQdHm6XqMp5tgKTJyCEqMtErM)
5: ![perm.png](https://ipfs.busy.org/ipfs/QmZFsDuE23Vn9ozZL9PptfjZsmtPz71KFGvxstFv6erVQT)
6: ![images.png](https://ipfs.busy.org/ipfs/QmVPUg7Fhn382wA1aDgeT3m1yBpb2SwzuxpFPvYrt3GNXu)
7: ![link.png](https://ipfs.busy.org/ipfs/QmRFisfF9ZqXDuTZGJ368sKxKGeE3RDRnP4XZ3JaNA5Hfe)
8: ![app.png](https://ipfs.busy.org/ipfs/QmcfKm1C2xMRZcrtp9fnxZKL3z4WcFXEg5WxsE8224FLdH)


### New Projects
- What is the project about?

This project automates our existing WP site https://tradeitforweed.club and https://smoke.io. See: https://smoke.io/@tradeitforweed

- Technology Stack

1. Ubuntu
2. Node
3. Npm
4. git clone repo
5. npm i
6. add these exports to your ~/.bashrc: 

a. your smoke posting WIF in steemPostPw
b. your author name as author
c. your wordpass password as wpsecret
d. wookey, woosec to your WooCommerce REST Api credentials

7. edit the code so that the wordpress site and user are correct


- Roadmap

1. Escrow services with Smoke
2. Figure out legality of crypto barter for marijuana in Canada first

- How to contribute?

Contact me here SteemIt @hodlorbust, or Smoke @tradeitforweed, or GitHub dunncreativess.

#### GitHub Account
https://github.com/DunnCreativeSS
