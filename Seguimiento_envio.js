document.getElementById('checkStatus').addEventListener('click', function() {
    const trackingCode = document.getElementById('tracking-code').value;

    // Comprobar un código de paquete predeterminado
    if (trackingCode === '123456') {
        const steps = document.querySelectorAll('.step');
        const progress = document.querySelector('.progress');
        const packageImg = document.getElementById('package');
        const finalMessage = document.getElementById('finalMessage');

        let currentStep = 0;

        // Función para avanzar en el seguimiento
        const interval = setInterval(() => {
            if (currentStep < steps.length) {
                // Marcar el paso como activo
                steps[currentStep].classList.add('active');
                
                // Aumentar la barra de progreso
                progress.style.width = ((currentStep + 1) / steps.length) * 100 + '%';

                // Mover la imagen del paquete
                packageImg.classList.add('moving');

                currentStep++;
            } else {
                clearInterval(interval);
                finalMessage.textContent = "¡Paquete Entregado!";
                finalMessage.style.visibility = "visible";
            }
        }, 2000); // Cambia el paso cada 2 segundos
    } else {
        alert('Código de paquete inválido.');
    }
});
