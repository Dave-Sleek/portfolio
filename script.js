const contactForm = document.getElementById('contactForm');

contactForm?.addEventListener('submit', async (e) => {

    e.preventDefault();

    const formData = {

        name: contactForm.name.value,
        email: contactForm.email.value,
        message: contactForm.message.value

    };

    try {

        const response = await fetch('/api/contact', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(formData)

        });

        const data = await response.json();

        if (response.ok) {

            alert('✨ Message sent successfully!');

            contactForm.reset();

        } else {

            alert(data.error || 'Something went wrong');

        }

    } catch (error) {

        alert('Server error');

        console.error(error);

    }

});