const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b);
        }, 2000)
    });
};

add(1, 2).then((sum) => {
    console.log('Success', sum);
    return add(sum, 20);
}).then((sum2)=> {
    console.log('Success', sum2);
    return add(sum2, 27);
}).then((sum3)=> {
    console.log('Success', sum3);
}).catch((err) => {
    console.log('Error!', err);
});