async function getData(url) {
    const req = await fetch(url);

    if (req.status != 200) {
        throw Error(`Failed to get data from ${url}, with status ${req.status}`);
    }

    return req.json();
}

async function postData(url, data, format) {
    const req = await fetch(url, {
        method: 'POST',
        body: data,
        headers: format
    });

    if (!req.ok) {
        throw Error(`Failed to get data from ${url}, with status ${req.status}`);
    }

    return req.json();
}

export { getData };
export { postData };