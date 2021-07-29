// List of Free and Open Public APIs:  
// https://mixedanalytics.com/blog/list-actually-free-open-no-auth-needed-apis/

// Accessing Biggest collection of open source dog pictures
// Dog API - https://dog.ceo/dog-api/documentation/breed
// Ref: https://dog.ceo/dog-api/breeds-list

// Superagent : https://visionmedia.github.io/superagent/#request-basics

const superagent = require("superagent")
const fs = require('fs')


   // Using PROMISE: Returns a value that we expect some time in future
     // Doing all asynchronous work inside the 'executor' function of 'Promise'
   // Behind the scenes the 'readFilePromise' executes the 'readFile' function & returns 'Promise'
   const readFilePromise = (file) => {
      return new Promise( (resolve, reject) => {    // Promise takes 'executor' function

         fs.readFile(file, (err, data) => {
            if(err) reject('File Not Found!')
            resolve(data)   // 'resolve' returns successful value from 'Promise'
         }  )

      })
   }

   const writeFilePromise = (file, data) => {
      return new Promise( (resolve, reject) => {    // Promise takes 'executor' function

         fs.writeFile(file, data, (err) => {
            if(err) reject("Couldn't Write File!")
            resolve('Success!')   // 'resolve' returns successful value from 'Promise'
         }   )
      })
   }



/* Asynchronous JavaScript feature - Consuming Promises with Async/Await
Instead of consuming Promises using 'then' method, we can use Async/Await
*/

const getRandomDogPictureByBreed = async () => {  // async functions are running in the background
   try {
   const data = await readFilePromise(`${__dirname}/random-image-by-breed/breed.txt`);
   console.log(`Breed: ${data}`);
   
   const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

   
   await writeFilePromise('random-image-by-breed/dog-img.txt', res.body.message,)  
   console.log('Rondom Dog Image Saved To File!');
   }
   catch(err)  {             // Handling rejected promise
      console.log(err.message)
   }
}
getRandomDogPictureByBreed ()

 console.log("Saving Dog Image to a file...")



//Waiting for Multiple Promises Simultaneously
/*
const getRandomDogPicturesByBreed  = async () => {  // async functions are running in the background
   try {
   const data = await readFilePromise(`${__dirname}/random-image-by-breed/breed.txt`);
   console.log(`Breed: ${data}`);
   
   const resPromise1 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
   
   const resPromise2 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
   
   const resPromise3 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
   
   // Running all the Promises in the same time.
   const all = await Promise.all([resPromise1, resPromise2, resPromise3])
   const imgs = all.map( element => element.body.message);
   console.log(imgs) ;
   
   await writeFilePromise('random-image-by-breed/dog-img.txt', imgs.join('\n'))  
   console.log('Rondom Dog Image Saved To File!');
   }
   catch(err)  {             // Handling rejected promise
      console.log(err.message)
   }
}

getRandomDogPicturesByBreed()
*/
