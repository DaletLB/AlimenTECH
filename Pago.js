const mp = new MercadoPago('APP_USR-82f8aab2-8326-42c0-a116-6d9485905e49', {
    locale: "es-MX"
});

document.getElementById("btn-pago").addEventListener("click", async () => {
    try {
        const orderData = {
            title: "Semilla de Sandia",
            quantity: 1,
            price: 100,
        };

        const response = await fetch("http://localhost:3000/create_preference", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
        });

        const preference = await response.json();
        createCheckoutButton(preference.id);
    } catch (error) {
        alert("Error :(");
    }

});

const createCheckoutButton = (preferenceId) => {
    const bricksBuilder = mp.bricks();

    const renderComponent = async () => {
        if (window.checkoutButton) window.checkoutButton.unmount();
        await bricksBuilder.create("wallet", "wallet_container", {
            initialization: {
                preferenceId: preferenceId,
            },
            customization: {
                texts: {
                    valueProp: 'smart_option',
                },
            },
        });
    };

    renderComponent()
};