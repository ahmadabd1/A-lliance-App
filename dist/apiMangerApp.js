class ApiManager{
    
    fetchQuestions() {
        try {
            
        //    return $.get("/data");
            
            
        } catch (error) {
            throw new Error("Error fetching question:", error);
        }
    }
}