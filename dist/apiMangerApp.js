class ApiManager{
    
    fetchQuestions() {
        try {
            console.log($.get("/data"))
        //    return $.get("/data");
            
            
        } catch (error) {
            throw new Error("Error fetching question:", error);
        }
    }
}