// console.log("ji")

// setInterval(()=>{
//     console.log(Date.now().toString);
// },1000)
// setTimeout(()=>{
//     console.log("after 2 second");
// },2000);
// const func=new Promise(async (resolve,reject)=>{
//     const i=false;
//     if(i){
//         resolve("hey man everything is fine");
//     }else{
//         reject("hi");
//     }
// })
// func
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log("failed")
//     console.log(err)
// })
// function name() {
//     return new Promise((resolve, reject) => {
//         const i = false;
//         if (i) {
//             resolve("hey man everything is fine");
//         } else {
//             reject("hey man failed");
//         }
//     });
// }

// name
//     .then((res) => {
//         console.log(res); // "hey man everything is fine"
//     })
//     .catch((err) => {
//         console.log("failed"); // "failed"
//         console.log(err); // "hey man failed"
//     });
import os from 'os'
const cpu=os.cpus().length;
console.log(cpu)