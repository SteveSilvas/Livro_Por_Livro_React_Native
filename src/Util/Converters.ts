const GetDateString = (date: Date) => {
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // O método getUTCMonth retorna um número de 0 a 11, então é necessário adicionar 1 para obter o mês correto
    const year = date.getUTCFullYear();

    return `${day.toString().padStart(2, "0")}
    /${month.toString().padStart(2, "0")}
    /${year.toString()}`;
};

export default { GetDateString };
