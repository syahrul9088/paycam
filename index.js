const fetch = require('node-fetch');
const readline = require('readline-sync');
var random = require('random-name')
var randomize = require('randomatic');
const delay = require('delay')
const cheerio = require('cheerio');

const functionRegist = (email, ip, reff) => new Promise((resolve, reject) => {
    const url = 'https://api.paycam.asia/register';

    const bodys = {
        "email":email,"password":"Berak321@","recommend":reff,"recaptcha":"03AGdBq25upF-yPU2Flx4UrHvhd_214qnR9v7vBObc18OJsnSgXQHa3RSNkTYqR4hLYo0CJYGu6eMqY4vUhdRp4ixFKpmM9J5anxFHD_WCwzj-JwChICoZo_0hbKTutaCCmx08ohD6-lEXaPb_6AlHABoah_-jKdKyTWutpdd3zXLO67ZSEKBtnyQmdotaX6r_HVqnpoE4WhsYXs5HmXFhKoo0-IaUG2W7Fzt4J20W0v37XQ4YCjXrrzRW_YMPA-4Wgq89HVgkbav4fqpWN-Qr4GGPjDju80DXb-ye_gHW0vvfqEt3En66qyf8FcFWpH2H_aQwM5OhxKZwK_n-jaGHqCHBoeGezhfOU0d4CMsA3iJk1JjfYsNKLVy_K9s6L9Ardu3d6F5RkDvjnP7FrMFj9dIhjaFidwwcB68xbxmdhunvpyKQWMD5-ec4bGDgGPt0-s9Yc1qoD9x-"
    };

    fetch (url, {
        method : 'POST',
        headers : {
            'Host': 'api.paycam.asia',
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json, text/plain, */*',
            'sec-ch-ua-mobile': '?0',
            // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
            'Content-Type': 'application/json; charset = UTF-8',
            'Origin': 'http://wal.paycam.asia',
            'X-Forwarded-For': ip,
            'Sec-Fetch-Site':' cross-site',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Referer': 'http://wal.paycam.asia/',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9'
        },
        body: JSON.stringify(bodys)
    })
    .then(res => res.json())
    .then(result => {
        resolve(result)
    })
    .catch(err => {
        reject(err)
    })
});

const functionVerif = (email, otp, ip) => new Promise((resolve, reject) => {
    const url = 'https://api.paycam.asia/auth/verify';

    const bodys = {
        "email":email,"token":otp,"type":"register"
    };

    fetch (url, {
        method : 'POST',
        headers : {
            'Host': 'api.paycam.asia',
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json, text/plain, */*',
            'sec-ch-ua-mobile': '?0',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
            'Content-Type': 'application/json; charset = UTF-8',
            'Origin': 'http://wal.paycam.asia',
            'X-Forwarded-For': ip,
            'Referer': 'http://wal.paycam.asia/',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9'
        },
        body: JSON.stringify(bodys)
    })
    .then(res => res.json())
    .then(result => {
        resolve(result)
    })
    .catch(err => {
        reject(err)
    })
});

const functionGetLink = (email, domain) =>
    new Promise((resolve, reject) => {
        fetch(`https://generator.email/`, {
            method: "get",
            headers: {
                accept:
                    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
                "accept-encoding": "gzip, deflate, br",
                cookie: `_ga=GA1.2.1164348503.1554262465; _gid=GA1.2.905585996.1554262465; embx=%5B%22${email}%40${domain}%22%2C%22hcycl%40nongzaa.tk%22%5D; _gat=1; io=-aUNS6XIdbbHj__faWS_; surl=${domain}%2F${email}`,
                "upgrade-insecure-requests": 1,
                "user-agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36"
            }
        })
            .then(res => res.text())
            .then(text => {
                const $ = cheerio.load(text);
                const src = $("#email-table > div.e7m.row.list-group-item > div.e7m.col-md-12.ma1 > div.e7m.mess_bodiyy > p > strong:nth-child(1)").text();
                resolve(src);
            })
            .catch(err => reject(err));
    });


(async () => {
    const reff = readline.question('[?] Reff Code: ')
    const jumlah = readline.question('[?] Jumlah Reff: ')
    for (var i = 0; i < jumlah; i++){
        try {
            const name = random.first()
            const rand = randomize('0', 5)
            const ip = `${randomize('0', 3)}.${randomize('0', 3)}.${randomize('0', 3)}.${randomize('0', 2)}`
            const email = `${name}${rand}@jomcs.com`
            console.log(`[+] Email: ${email}`)
            const regist = await functionRegist(email, ip, reff)
            if(regist.status == true){
                console.log(`[+] OTP berhasil dikirim !`)
    
                do {
                    console.log('[!] Mencoba mendapatkan OTP !')
                    await delay(1000)
                    var otp = await functionGetLink(`${name}${rand}`, 'jomcs.com')
                } while (otp === '')
    
                console.log(`[+] OTP : ${otp}`)
    
                const verif = await functionVerif(email, otp, ip)
                if(verif.status == true){
                    console.log(`[+] Verif OTP sukses !\n`)
                } else {
                    console.log(`[!] Verif OTP gagal !\n`)
                }
            } else {
                console.log(`[!] OTP gagal dikirim !\n`)
            }
        } catch(e) {
            console.log(e) 
        }
    }
})();