function refactorAllApis(app){
    app.use("/api/v1/category",require('../../src/components/category/category.api'))
    app.use("/api/v1/book",require('../../src/components/book/book.api'))
    app.use("/api/v1/user",require('../../src/components/user/user.api'))
    app.use("/api/v1/favbook",require('../../src/components/favouriteBook/favourites.api'))
}

module.exports = refactorAllApis