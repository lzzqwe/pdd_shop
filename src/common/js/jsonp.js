import originJsonp from 'jsonp'

export default function jsonp(url, data, option) {
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
    return new Promise((resolve, reject) => {
        //return resolve({"code":0,"data":{"slider":[{"linkUrl":"https://y.qq.com/m/act/voiceofdreams3/index.html?openinqqmusic=1&playtarget=music&ADTAG=jiaodiantu&channelID=10032187","picUrl":"http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1102759.jpg","id":19045},{"linkUrl":"https://y.qq.com/m/digitalbum/gold/index.html?openinqqmusic=1_video=true&id=5447180&g_f=shoujijiaodian","picUrl":"http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1100463.jpg","id":19033},{"linkUrl":"http://y.qq.com/w/album.html?albummid=002m6eTJ4Qh7ex","picUrl":"http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1102216.jpg","id":19042},{"linkUrl":"https://y.qq.com/m/digitalbum/gold/index.html?openinqqmusic=1_video=true&id=5563819&g_f=shoujijiaodian","picUrl":"http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1100472.jpg","id":19036},{"linkUrl":"https://y.qq.com/msa/270/0_6526.html?openinqqmusic=1&ADTAG=APP","picUrl":"http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1101847.jpg","id":19089}],"radioList":[{"picUrl":"http://y.gtimg.cn/music/photo/radio/track_radio_199_13_1.jpg","Ftitle":"热歌","radioid":199},{"picUrl":"http://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg","Ftitle":"一人一首招牌歌","radioid":307}],"songList":[{"songListDesc":"催泪大杀器！盘点演唱会经典万人大合唱","picUrl":"http://p.qpic.cn/music_cover/1Fr9IFMhWDPeUzWKVEjn3QTL2eX2QziaJmaL0ZAmsvtW71ic9IDUoYzg/300?n=1","id":"2646688496","accessnum":9822092,"songListAuthor":"金青松","pic_mid":"00333So02drvak","album_pic_mid":""},{"songListDesc":"纳尼？这些华语歌手竟然会唱日语歌！","picUrl":"http://p.qpic.cn/music_cover/z8wAFqicQ1qhImeiajkrgiaR4hYM3pzsUULFnicXshFXdw9uGkm261Ex9g/300?n=1","id":"1144416825","accessnum":672462,"songListAuthor":"风吹草地","pic_mid":"0013j8zs1jRnLQ","album_pic_mid":""},{"songListDesc":"精选内地十大民谣歌手代表作","picUrl":"http://p.qpic.cn/music_cover/hVUsfUFG2DV466URqw7PT7X66OknPIhic2mKDgicawN4qThIR7yhYY1w/300?n=1","id":"2043041547","accessnum":1246187,"songListAuthor":"１'s   ヽ","pic_mid":"004bFmjW2PXSqF","album_pic_mid":"0032YJyg2yF6Dd"},{"songListDesc":"2016billboard嘻哈榜","picUrl":"http://p.qpic.cn/music_cover/tkduvk4dwqBxwzZhsNe0nwkwyiaLHVkxtla7REsX0yNkhibOH3Bdb2og/300?n=1","id":"2040362185","accessnum":1160457,"songListAuthor":"CREAMSAUCEONMEBABY","pic_mid":"000cL0xT2csmd7","album_pic_mid":"001iJq1y1Uq3zV"},{"songListDesc":"浮光掠影：ACG纯音乐赏析合辑","picUrl":"http://p.qpic.cn/music_cover/XMPAjfs5uwGZdWII3osvAvCRyNWx8Pqy5Yice41OCZlBhLtk0p0icNvg/300?n=1","id":"1723063372","accessnum":983028,"songListAuthor":"黎桐同","pic_mid":"000xFtbN1l8ye8","album_pic_mid":"002egQPg3DWcCS"},{"songListDesc":"trip-hop单曲大推荐","picUrl":"http://y.gtimg.cn/music/photo_new/T005R600x600M000002CJKAY1LKpcz.jpg?n=1","id":"3482605622","accessnum":357541,"songListAuthor":"哑忍","pic_mid":"","album_pic_mid":"004aOQhn3PPOpK"}]}})
        originJsonp(url, option, (err, data) => {
            console.log(err)
            if (!err) {
                resolve(data)
            } else {
                reject(err)
            }
        })
    })
}

export function param(data) {
    let url = ''
    for (var k in data) {
        let value = data[k] !== undefined ? data[k] : ''
        url += '&' + k + '=' + encodeURIComponent(value)
    }
    return url ? url.substring(1) : ''
}