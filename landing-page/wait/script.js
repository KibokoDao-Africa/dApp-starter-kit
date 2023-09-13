const email = document.getElementById('email');
  const button = document.querySelector('button');
  const form = document.querySelector('form');
  const result = document.querySelector('.result');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    try {
      if (!email.value) {
        throw new Error('Please enter your Email');
      }

      button.innerHTML = 'Sending...';
        button.disabled = true;

        const formData = new FormData();
        formData.append('email', email.value);

        fetch('/api/subscribe', {
          method: 'POST',
          body: formData
        }).then(res => res.json())
          .then(data => {
            console.log(data);
            if (data.content) {
              button.innerHTML = 'Success!';
              button.disabled = true;
            } else {
              button.innerHTML = 'Try again';
              button.disabled = false;
              result.innerHTML = data.message;
            }
          })
          .catch(err => {
            console.log(err);
            button.innerHTML = 'Try again';
            button.disabled = false;
            result.innerHTML = 'Something went wrong';
          });
    } catch (error) {
      button.innerHTML = 'Try again';
      button.disabled = false;
      result.innerHTML = error.message;
      console.log(error);
    }
  })