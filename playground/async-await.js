const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0)
                return reject ('Numbers must be non-negative');
            resolve(a + b);
        }, 1000);
    });
};

const doWork = async () => {
    const sum0 = await add(13, 12);
    const sum1 = await add(sum0, -15);
    return   add(sum1, 10);

};

doWork().then((res) => {
    console.log('Result', res);
}).catch((err) => {
    console.log('Error', err);
});