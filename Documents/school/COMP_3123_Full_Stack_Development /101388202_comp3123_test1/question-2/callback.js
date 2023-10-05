// method resolvedPromise similar to delayedSuccess
const resolvedPromise = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let success = {'message': 'delayed success!'}
            resolve(success);
        }, 500);
    });
};

// method rejectedPromise similar to delayedException
const rejectedPromise = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let errorMessage = {'error': 'delayed exception!'}
            reject(errorMessage)
        }, 500);
    });
};

resolvedPromise()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error.message);
  });


rejectedPromise()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });