var a = new URL(location);
console.log(a)

a.searchParams.forEach(function(val, key){
  console.log(key + ' ' + val);
});

