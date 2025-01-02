const validatePetInputs = (data) => {
   const { name, species, age, breed, gender, status } = data;
   const errors = [];
 
   if (!name || typeof name !== 'string' || name.trim().length === 0) {
     errors.push('Name is required and must be a valid string.');
   }
   if (!species || typeof species !== 'string' || species.trim().length === 0) {
     errors.push('Species is required and must be a valid string.');
   }
   if (age === undefined || isNaN(Number(age)) || Number(age) < 0) {
     errors.push('Age is required and must be a non-negative number.');
   }
   if (!breed || typeof breed !== 'string' || breed.trim().length === 0) {
     errors.push('Breed is required and must be a valid string.');
   }
   if (!['male', 'female', 'unknown'].includes(gender?.toLowerCase())) {
     errors.push('Gender must be one of: male, female, unknown.');
   }
   if (!status || typeof status !== 'string' || status.trim().length === 0) {
     errors.push('Status is required and must be a valid string.');
   }
 
   return errors;
 };

 export default validatePetInputs;
