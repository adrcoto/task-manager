require('../src/db/mongoose');
const User = require('../src/models/user');

// 5e5e6757a281fb146ca2b5ba

User.findByIdAndUpdate('5e5e6757a281fb146ca2b5ba', { age: 1 }).then((user) => {
    console.log(user);

    return User.countDocuments({ age: 1 });
}).then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({ age });

    return count;
};

updateAgeAndCount('5e5e6757a281fb146ca2b5ba', 1).then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
});
