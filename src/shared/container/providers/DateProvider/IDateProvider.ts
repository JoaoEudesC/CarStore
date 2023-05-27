interface IDateProvider {
    compareInHours(start_date: Date, end_date: Date): number;
    convertToUTC(date: Date): string;
    dateNow(): Date;
    compareInDays(start_date: Date, end_date: Date): number;
    addDays(days: number): Date;
    addHours(hours: number): Date;
    compareIfBefore(start_date: Date, end_date: Date): boolean;
}

export { IDateProvider };

// A gente criou a comparação em horas e agora a gente vai criar a nossa comparação em dias para facilitar então a gente vai ter os dois métodos agora.
// Porque a gente vai utilizar a comparação em dias no "devolution rental".
