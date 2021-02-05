class Helper {
   static makeNameString = (string) => {
        let stringLower = string.toLowerCase()
        let nameString = Helper.capitalizeFirstLetter(stringLower)
       return nameString
    }

   static capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
}