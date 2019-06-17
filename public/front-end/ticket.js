let d = document.getElementById("dobrofest");
let a = document.getElementById("atlas");
let y = document.getElementById("yletay");
y.addEventListener('click', () => {
    Promise.resolve(
        fetch(`/api/ticket?name=yletay`).then((data) => data.json()),
    ).then((data) => {
        if(!data.err){
            alert("Квиток куплено");
        }else{
            console.log('err');
        }
        })
        .catch((err) => {
            console.log(err.message);

        });
       console.log("123"); 
});
a.addEventListener('click', () => {
    Promise.resolve(
        fetch(`/api/ticket?name=atlas`).then((data) => data.json()),
    ).then((data) => {
        if(!data.err){
            alert("Квиток куплено");
        }else{
            console.log('err');
        }
        })
        .catch((err) => {
            console.log(err.message);

        });
       console.log("123"); 
});
d.addEventListener('click', () => {
    Promise.resolve(
        fetch(`/api/ticket?name=dobrofest`).then((data) => data.json()),
    ).then((data) => {
        if(!data.err){
            alert("Квиток куплено");
        }else{
            console.log('err');
        }
        })
        .catch((err) => {
            console.log(err.message);

        });
       console.log("123"); 
});