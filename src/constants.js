export const fields = ["language", "date", "salary", "customer_id"];
export const conditions = {
    "language": ["is", "is not"],
    "date": ["is", "is not", "is before", "is after", "is not before", "is not after"],
    "salary": ["equals", "not equals", "less than", "greater than", "not less than", "not greater than"],
    "customer_id": ["equals", "not equals"]
};
export const conjunctionsArr = ["AND", "OR"];