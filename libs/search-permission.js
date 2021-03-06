function getDataNumOfUser(db, user) {
    return db.collection('authors').find({_id: user}).toArray().then(results => {
        if (results.length == 0) {
            return 0;
        } else {
            return results[0].queries_count || 0;
        }
    });
}

function getRefNumOfUser(db, user) {
    return db.collection('recommendations').find({user: user}).toArray().then(results => {
        if (results.length == 0) {
            return 0;
        } else {
            return results[0].count || 0;
        }
    });
}

function resolveSearchPermission(db, user) {
    // get required values
    return Promise.all([
        getDataNumOfUser(db, user),
        getRefNumOfUser(db, user),
    ])
    // determine authorization
    .then(values => {
        const sum = values.reduce((a, b) => a+b);
        return sum > 0;
    });
}

module.exports = {
    getDataNumOfUser,
    getRefNumOfUser,
    resolveSearchPermission,
};
