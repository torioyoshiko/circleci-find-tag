#!/usr/bin/env node
const https = require('https');

const getBuildPage = async (url, token, limit, offset) => {
    const options = {
        hostname: 'circleci.com',
        port: 443,
        path: `/api/v1.1/project/${url}?circle-token=${token}&limit=${limit}&offset=${offset}`,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    }

    const promise = new Promise((resolve, reject) => {

        const request = https.request(options, response => {
            let responseString = '';

            response.on('data', d => {
                responseString += (d.toString());
            })

            response.on('end', () => {
                resolve(JSON.parse(responseString));
            });
        })

        request.on('error', error => {
            reject(error);
        });

        request.end()
    });

    return promise;

}

const getTags = async () => {
    let args = process.argv;

    let offset = 0;

    while (true){
        let results = await getBuildPage(args[2], args[3], 50, offset);

        let build = results.find(elem => elem.vcs_tag === args[4])

        if (build !== undefined){
            console.log(args[4] + ' -> ' + build.build_url);
            return;
        }

        if (results.length < 50){
            console.log('Tag not found');
            break;
        }

        offset += 50;
    }
}

getTags();