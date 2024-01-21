export const calcAverage = (data) =>
   data.reduce((ac, restaurant) => (ac += restaurant.rating), 0) / data.length;

export const calcStandarDeviation = (average, data) => {
   const totalSquareDeviations = data.reduce(
      (ac, { rating }) => (ac += Math.pow(rating - average, 2)),
      0
   );
   return Math.sqrt(totalSquareDeviations / data.length);
};
