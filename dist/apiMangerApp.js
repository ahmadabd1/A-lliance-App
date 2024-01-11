class WeatherManager {
    constructor() {
        this.data = []
    }


    async getAllCitiesData() {
        try {
            const weatherData = await $.get(`/weather`)
            this.data = weatherData
            return weatherData
        }
        catch (error) {
            console.error(error);
        }
    }

    async getWeatherByCity(cityName) {
        const weatherByCityName = await $.get(`/weather/${cityName}`)
        this.data.push(weatherByCityName)
        return weatherByCityName
    }
    // city => object
    saveCityWeatherData(city) {
        return $.post(`/weather`, city)
    }


    deleteWeatherByCity(cityName) {
        return $.ajax({
            url: `/weather/${cityName}`,
            type: 'DELETE',
            success: function (result) {
                const index = this.data.findIndex(c => c.cityName === cityName)
                if (index !== -1) {
                    this.data.splice(index, 1)
                }
            }
        });
    }
}