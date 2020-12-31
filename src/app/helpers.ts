import { User } from "./models";


export function downloadCSV(users: User[]) {
    let csv = 'Nombre,Apellido,País,Edad,Teléfono,Email\n';

    users.forEach(user =>{
        csv += `${user.name.first},${user.name.last},${user.nat},${user.dob.age},${user.phone},${user.email}\n`;
    });
    const hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'randomUsers.csv';
    hiddenElement.click();
}