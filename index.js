// #!/usr/bin/env node
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
    let url = args[2];
    let token = args[3];
    let tag = args[4]
    let offset = 0;

    if (args.length < 4) {
        console.log(
            'Invalid number of arguments.\n' +
            'Usage: circleci-find-tag <Repository Prefix> <CircleCi Token> [tag]'
        )
        return;
    }

    while (true) {
        let results = await getBuildPage(url, token, 50, offset);


        if (!tag) {
            let builds = results.filter(elem => elem.vcs_tag)

            for (let build of builds) {
                console.log(build.vcs_tag + ' -> ' + build.build_url);
            }

            if (results.length < 50) {
                break;
            }
        } else {
            let build = results.find(elem => elem.vcs_tag === tag)

            if (build !== undefined) {
                console.log(tag + ' -> ' + build.build_url);
                return;
            }

            if (results.length < 50) {
                console.log('Tag not found');
                break;
            }
        }

        offset += 50;
    }
}

getTags();
