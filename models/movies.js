

const gunzip = require('gunzip-file')

module.exports.search_moviename = (query) => {
    

    // const { body } = await got('', {
    //     responseType: 'buffer',
    // });

    // unzip the buffered gzipped sitemap
    //const sitemap = (await ungzip(body)).toString();

    gunzip('title.akas.tsv.gz', 'sitemap.json', () => {
        console.log('gunzip done!')
     })

    return "sitemap"
}

