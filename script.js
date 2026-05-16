const form = document.getElementById("contact-form");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value,
    };

    status.innerText = "Sending...";

    try {
        const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
            status.innerText = "Message sent successfully!";
            form.reset();
        } else {
            status.innerText = data.error || "Something went wrong.";
        }
    } catch (error) {
        status.innerText = "Server error.";
    }
});