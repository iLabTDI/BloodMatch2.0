// Formato de hora por Alex Robles
export const formatDate = (messageDate) => {
    const date = new Date(messageDate);

    // Formatear la hora y los minutos
    let hour = date.getHours();
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12; // El '0' debe ser '12'
    let time = hour + ":" + minutes + " " + ampm;

    // Formatear la fecha
    const options = {
        month: 'long',
        day: 'numeric'
    };
    const newDate = date.toLocaleDateString('en-US', options);

    return newDate + " - " + time;
};
