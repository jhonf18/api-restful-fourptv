'use strict'

function filterTag(Product, search, cb){

  Product.find({tags: {$regex: `.*${search}`, $options: "i"} }, (err, products )=> {
    if(err) return cb(true, `${err}`)
    return cb(null, products)
  })
}

function filterTags(Product, arraySearch, cb){
  let products = []

  Array.from(arraySearch).forEach( search => {
    Product.find({tags: {$regex: `.*${search}`, $options: "i" }}, (err, product)=> {
      if(err) return cb(true, `${err}`)

      products.push(product)
    })
  })

  // send products
  const searchProducts = setInterval(()=> {
    if(products.length > 0 ){
      clearInterval(searchProducts)
      return cb(null, products)
    }
  }, 100)
}

module.exports = {
  filterTag,
  filterTags
}
