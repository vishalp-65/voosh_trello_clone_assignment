export const handleError = (error: any) => {
    console.error(error);
    alert(error.message || "Something went wrong");
};
