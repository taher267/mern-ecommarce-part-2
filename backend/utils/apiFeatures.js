module.exports = class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i"
            }
        } : {};

        this.query = this.query.find({ ...keyword });
        return this
    }
    filter() {
        const queryCopy = { ...this.queryStr };
        //Remove some fields for category
        const removeField = ["keyword", 'page', 'limit'];
        removeField.forEach(key => delete queryCopy[key]);
        //filtering by price or price rating
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    pagintion(perPage, counted) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = perPage * (currentPage - 1);
        this.query = this.query.limit(perPage).skip(skip);
        return this
    }
}