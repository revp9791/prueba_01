// Arrays para almacenar los ingresos y los gastos
let incomes = [];
let expenses = [];

// Función para actualizar la interfaz de usuario
function updateUI() {
    // Calcula el ingreso total
    const totalIncome = incomes.reduce((acc, curr) => acc + curr.amount, 0);
    // Calcula el gasto total
    const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    // Calcula el balance total
    const balance = totalIncome - totalExpense;

    // Función para añadir un signo positivo a cantidades positivas
    const positiveSign = (amount) => amount > 0 ? `+${amount.toFixed(2)}` : amount.toFixed(2);

    // Actualiza el total de ingresos en la UI
    document.getElementById('totalIncome').innerHTML = `<b>Ingresos: ${positiveSign(totalIncome)}</b>`;
    // Actualiza el total de gastos en la UI
    document.getElementById('totalExpense').innerHTML = `<b>Egresos: ${(-Math.abs(totalExpense)).toFixed(2)}</b>`;
    // Actualiza el balance total en la UI
    document.getElementById('totalBalance').innerHTML = `<b> ${positiveSign(balance)}</b>`;

    // Calcula y muestra el porcentaje total de gastos
    const percentage = totalIncome === 0 ? 0 : (totalExpense * 100) / totalIncome;
    document.getElementById('totalPercentage').innerText = `Porcentaje de Gastos: ${percentage.toFixed(2)}%`;

    // Actualiza la pestaña de ingresos en la UI
    const incomeTab = document.getElementById('incomeTab');
    incomeTab.innerHTML = incomes.map(item => `<div>${item.description}: ${positiveSign(item.amount)}</div>`).join('');

    // Actualiza la pestaña de gastos en la UI
    const expenseTab = document.getElementById('expenseTab');
    expenseTab.innerHTML = expenses.map(item => {
        // Calcula el porcentaje del gasto individual respecto al ingreso total
        const itemPercentage = (item.amount * 100) / totalIncome;
        return `<div>${item.description}: ${(-Math.abs(item.amount)).toFixed(2)} (${itemPercentage.toFixed(2)}%)</div>`; // Símbolo de dólar eliminado
    }).join('');
}


// Función para añadir una nueva transacción (ingreso o egreso)
function addTransaction() {
    // Obtiene el tipo de transacción del formulario (ingreso o egreso)
    const type = document.getElementById('transactionType').value;
    // Obtiene la descripción de la transacción del formulario
    const description = document.getElementById('description').value;
    // Obtiene el monto de la transacción del formulario y lo convierte a un número decimal
    const amount = parseFloat(document.getElementById('amount').value);

    // Verifica si se han llenado tanto la descripción como el monto
    if (description && amount) {
        // Si la transacción es un ingreso, añade a la lista de ingresos
        if (type === 'income') {
            incomes.push({ description, amount });
        } else {
            expenses.push({ description, amount });
        }
        // Actualiza la interfaz de usuario para reflejar los cambios
        updateUI();

        // Limpia los campos del formulario para la próxima entrada
        document.getElementById('description').value = '';
        document.getElementById('amount').value = '';// Si no se han llenado todos los campos, muestra una alerta
    } else {
        alert('Por favor, complete todos los campos.');
    }
}

// Obtiene la fecha actual
const currentDate = new Date();
// Array con los nombres de los meses en español
const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
// Actualiza el título en la interfaz de usuario para mostrar el mes y año actuales
document.getElementById('monthYear').innerHTML = `<b>Presupuesto de </br>${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}</b>`;
