export const api = async (number, difficulty) => {
  const endpoint = `https://opentdb.com/api.php?amount=${number}&difficulty=${difficulty}&type=multiple`;
  const request = await fetch(endpoint);
  const data = await request.json();
  //   console.log(data);
  //   console.log(data.results);
  return data.results.map((questions) => ({
    ...questions,
    answer: suffleArray([
      ...questions.incorrect_answers,
      questions.correct_answer,
    ]),
  }));
  // console.log(apidata);
};
const suffleArray = (array) => {
  const suffarray = [...array].sort(() => Math.random() - 0.5);
  return suffarray;
};
