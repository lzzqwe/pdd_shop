// import jsonp from 'common/js/jsonp'
import jsonp from '../common/js/jsonp'
// export default function getShop() {
//     let url = 'https://list.mogu.com/search'
//
//     return jsonp(url, {
//         _version: 8253,
//         ratio: '3: 4',
//         cKey: 46,
//         sort: 'pop',
//         page: 0,
//         q: '% E5 % A5 % B3 % E9 % 9E % 8 B',
//         minPrice:'',
//         maxPrice:'',
//         ppath:'',
//         cpc_offset: '',
//           ptp: '32. _mf1_1239_4537 .0 .0 .4 mO6yiNO',
//         acm: '3. mce .1 _10_1n4f8 .132826 .0.yd34mrXTr2Vbt.pos_28 - m_539382 - sd_119 - mf_4537_1211938 - idx_6 - mfs_15 - dm1_5000',
//         offset: 90,
//         _: 1588479404438
//     },{
//       param:'callback'
//     })
// }

export const getShop = () => {
    let url = 'https://list.mogu.com/search'

    return jsonp(url, {
        _version: 8253,
        ratio: '3: 4',
        cKey: 46,
        sort: 'pop',
        page: 0,
        q: '% E5 % A5 % B3 % E9 % 9E % 8 B',
        minPrice: '',
        maxPrice: '',
        ppath: '',
        cpc_offset: '',
        ptp: '32. _mf1_1239_4537 .0 .0 .4 mO6yiNO',
        acm: '3. mce .1 _10_1n4f8 .132826 .0.yd34mrXTr2Vbt.pos_28 - m_539382 - sd_119 - mf_4537_1211938 - idx_6 - mfs_15 - dm1_5000',
        offset: 90,
        _: 1588479404438
    }, {
        param: 'callback'
    })
}

export const getList = () => {
    let url = 'https://api.mogu.com/h5/mwp.pagani.search/21/'
    return jsonp(url, {
        'data': '%7B%22page%22%3A6%2C%22pageSize%22%3A24%2C%22sort%22%3A%22pop%22%2C%22ratio%22%3A%223%3A4%22%2C%22fcid%22%3A%2220003463%22%2C%22cKey%22%3A%22h5-shopping%22%2C%22pid%22%3A%229750%22%7D',
        'mw-appkey': 100028,
        'mw-ttid': 'NMMain@mgj_h5_1.0',
        'mw-t': 1588498337766,
        'mw-uuid': 'e0d23510-f6e8-4a4d-96e8-79cd3a8bf2fd',
        'mw-h5-os': 'iOS',
        'mw-sign': '733802ba5edaeedbc6a2d456162dad27',
        '_': 1588498337767,
    }, {
        param: 'mwpCb7'
    })
}