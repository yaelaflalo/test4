import { useEffect, useState } from "react";

import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoding] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    //עושים את הפונקציה הזאת כי אסור לשים אסיינכ ביוז אפקט
    const fetchMeal = async () => {
      const response = await fetch(
        "https://react-http-5a9cb-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Somthing went worng!"); //כי יש טריי אנד קאטצ כשקוראים לפונקציה . שזורקים ארור השורות הבאות לא ירוצו
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoding(false);
    };

    
      fetchMeal().catch((error) => {
        setIsLoding(false);
        setHttpError(error.message);
      }); //אפשר להוסיף קאצ שיתפוס את הארור שלנו בגלל שהפונקציה פאטצמיילס היא פרומיס פונקשיון

  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if(httpError){
    return <section className={classes.MealsError}>
    <p>{httpError}</p>
  </section>
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
