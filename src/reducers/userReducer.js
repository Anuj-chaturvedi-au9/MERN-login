export const initialState = {
  questions: [
    {
      questionText: "Question",
      questionType: "radio",
      options: [{ optionText: "Option 1" }],
      open: true,
      required: false,
    },
  ],
  questionType: "radio",
  doc_name: "Untitled form ",
  doc_desc: " add the description ",
};
export const reducer = (state, action) => {
  if (action.type == "USER") {
    return action.payload;
  }
  if (action.type == "CLEAR") {
    return null;
  }
  if (action.type == "UPDATE") {
    return {
      ...state,
      image: action.payload.image,
      name: action.payload.name,
    };
  }

  return state;
};
